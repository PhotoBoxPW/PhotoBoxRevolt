import { VoltareModule, VoltareClient } from 'voltare';
import needle, { BodyData, NeedleOptions, NeedleResponse } from 'needle';
import { PhotoBoxConfig } from '../../bot';
import { ImgSrvPayload } from './payload';

export enum ErrorCodes {
  SERVER_ERROR = -1,
  BAD_REQUEST = 0,
  MISSING_PARAMETER = 1,
  INVALID_IMAGE = 2,
  INVALID_COLOR = 3
}

export interface ImageCacheObject {
  createdAt: number;
  bumps: number;
  extension: string;
  buffer: Buffer;
}

export interface ImgSrvErrorResponse {
  code: ErrorCodes;
  error: string;
  status: number;
  param?: string;
}

export const DEFAULT_MESSAGES: {
  [code: number]: (mod: ImgSrvModule, response: ImgSrvErrorResponse) => string;
} = {
  [ErrorCodes.SERVER_ERROR]: (mod, response) => {
    mod.logger.error('Error while generating [SERVER_ERROR]:', response.error);
    return 'An error happened while generating the image!';
  },
  [ErrorCodes.BAD_REQUEST]: (mod, response) => {
    mod.logger.error('Error while generating [BAD_REQUEST]:', response.error);
    return 'An error happened while generating the image!';
  },
  [ErrorCodes.MISSING_PARAMETER]: (mod, response) => {
    mod.logger.error('A crucial parameter is missing! [MISSING_PARAMETER]:', response.error);
    return 'An error happened while generating the image!';
  },
  [ErrorCodes.INVALID_IMAGE]: (mod, response) => {
    return 'An error happened when using an image: ' + response.error;
  },
  [ErrorCodes.INVALID_COLOR]: (mod, response) => {
    return response.error;
  }
};

export class ImgSrvError extends Error {
  constructor(mod: ImgSrvModule, response: ImgSrvErrorResponse) {
    let message: string;
    try {
      message = DEFAULT_MESSAGES[response.code](mod, response);
    } catch (e) {
      message = DEFAULT_MESSAGES[ErrorCodes.SERVER_ERROR](mod, response);
    }
    super(message);
  }
}

export class ImgSrvNeedleError extends Error {
  error?: Error;
  constructor(mod: ImgSrvModule, error?: Error) {
    super('An error happened while requesting to the image server!');
    this.error = error;
  }
}

export interface StatsResponse {
  [key: string]: {
    hits: number;
    avg_gen_time: number;
  };
}

export default class ImgSrvModule<
  T extends VoltareClient<PhotoBoxConfig> = VoltareClient<PhotoBoxConfig>
> extends VoltareModule<T> {
  readonly imageCache = new Map<string, ImageCacheObject>();
  private cacheInterval?: NodeJS.Timeout;

  constructor(client: T) {
    super(client, {
      name: 'imgsrv',
      description: 'A module for handling the image server'
    });

    this.filePath = __filename;
  }

  async load() {
    this.cacheInterval = setInterval(this._interval.bind(this), this.client.config.imgsrv.interval);
    try {
      await this.ping();
    } catch (e) {}
  }

  unload() {
    clearInterval(this.cacheInterval!);
  }

  /** Pings the image server. */
  ping() {
    return this._get('/ping');
  }

  /** Gets the stats of the image server. */
  async stats() {
    return (await this._get('/stats')).body as StatsResponse;
  }

  /**
   * Generate something.
   * @param endpoint The endpoint to generate
   * @param payload The payload to use
   */
  async generate(endpoint: string, payload: ImgSrvPayload) {
    const key = this._genKey(endpoint, payload);
    if (this.imageCache.has(key)) {
      this.bumpCache(key);
      return this.imageCache.get(key)!;
    }

    let image: NeedleResponse;
    try {
      image = await this.gen(endpoint, payload);
    } catch (e) {
      this.logger.error('Error while requesting to image server:', e);
      throw new ImgSrvNeedleError(this, e as Error);
    }

    if (image.statusCode !== 200) throw new ImgSrvError(this, image.body);
    const extension = image.headers['content-type']!.split('/')[1];
    return this.storeCache(key, extension, image.raw);
  }

  /**
   * Request a generating endpoint.
   * @param endpoint The endpoint to generate
   * @param payload The payload to use
   */
  gen(endpoint: string, payload: ImgSrvPayload) {
    return this._post(`/gen/${endpoint}`, payload, {
      headers: {
        Authorization: this.client.config.imgsrv.key,
        ...('allow_gif' in payload && payload.allow_gif
          ? {}
          : {
              'X-Prefer-PNG': '1'
            })
      },
      json: true
    });
  }

  private bumpCache(key: string) {
    if (this.imageCache.has(key)) {
      const image = this.imageCache.get(key)!;
      image.createdAt = Date.now();
      image.bumps++;
      this.imageCache.set(key, image);
    }
  }

  private storeCache(key: string, extension: string, buffer: Buffer) {
    if (this.imageCache.size >= this.client.config.imgsrv.limit) {
      const lastImage = Array.from(this.imageCache.entries()).sort(
        ([, a], [, b]) => b.createdAt - a.createdAt
      )[0];
      this.imageCache.delete(lastImage[0]);
    }

    const imageObject: ImageCacheObject = {
      createdAt: Date.now(),
      bumps: 0,
      extension,
      buffer
    };
    this.imageCache.set(key, imageObject);
    return imageObject;
  }

  private _interval() {
    let deleted = 0;
    for (const key in this.imageCache) {
      const image = this.imageCache.get(key)!;
      if (image.createdAt + this.client.config.imgsrv.cacheTimeout < Date.now()) {
        deleted++;
        this.imageCache.delete(key);
      }
    }

    if (deleted) this.logger.log(`Cleared ${deleted.toLocaleString()} entries.`);
  }

  /** Generate keys in a nightmarish way. */
  private _genKey(endpoint: string, payload: ImgSrvPayload) {
    let result = `[${endpoint}]`;
    const keyMap: { [key: string]: string } = {
      text: 't',
      texts: 'ts',
      challenge: 'c',
      header: 'h',
      footer: 'f',
      elim_by: 'eb',
      no_shadow: 'ns',
      username: 'u',
      avatar: 'a',
      image: 'i',
      allow_gif: 'ag',
      quality: 'l',
      mult: 'm',
      last_half: 'lh',
      avatar1: 'a1',
      avatar2: 'a2'
    };

    const DISCORD_ASSET_REGEX =
      /^https:\/\/cdn\.discordapp\.com\/([\w-]+)\/(\d+)\/([a-f0-9]{32})\.([a-z]{0,4})/;
    const DISCORD_ATTACHMENT_REGEX = /^https:\/\/cdn\.discordapp\.com\/attachments\/(\d+)\/(\d+)\/(\w+\.\w+)/;
    const DISCORD_EMOJI_REGEX = /^https:\/\/cdn\.discordapp\.com\/emojis\/(\d+)\.(png|gif)/;
    const TWEMOJI_REGEX = /^https:\/\/twemoji\.maxcdn\.com\/v\/latest\/svg\/(\w+)\.svg/;

    for (const initKey in payload) {
      const key = initKey as keyof ImgSrvPayload;
      result += key in keyMap ? keyMap[key] : key;
      result += '|';
      const value: any = payload[key];
      if (typeof value === 'boolean') result += value ? '1' : '0';
      if (typeof value === 'number') result += value.toString(36);
      if (typeof value === 'string') {
        if (DISCORD_ASSET_REGEX.test(value)) {
          const match = value.match(DISCORD_ASSET_REGEX)!;
          result += `d/${match[1][0]}/${BigInt(match[2]).toString(36)}/${BigInt('0x' + match[3]).toString(
            36
          )}/${match[4][0]}`;
        } else if (DISCORD_ATTACHMENT_REGEX.test(value)) {
          const match = value.match(DISCORD_ATTACHMENT_REGEX)!;
          result += `da/${BigInt(match[1]).toString(36)}/${BigInt(match[2]).toString(36)}/${match[3]}`;
        } else if (DISCORD_EMOJI_REGEX.test(value)) {
          const match = value.match(DISCORD_EMOJI_REGEX)!;
          result += `de/${BigInt(match[1]).toString(36)}/${match[2][0]}`;
        } else if (TWEMOJI_REGEX.test(value)) {
          const match = value.match(TWEMOJI_REGEX)!;
          result += `t/${match[1]}`;
        } else result += value;
      } else result += value.toString();
      result += '!';
    }

    return result;
  }

  private _get(endpoint: string, options?: NeedleOptions) {
    return needle('get', this.client.config.imgsrv.url + endpoint, options);
  }

  private _post(endpoint: string, body: BodyData, options?: NeedleOptions) {
    return needle('post', this.client.config.imgsrv.url + endpoint, body, options);
  }
}
