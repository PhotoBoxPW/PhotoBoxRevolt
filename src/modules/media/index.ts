import { VoltareModule, VoltareClient, VoltareCommand } from 'voltare';
import emojilib from 'emojilib';
import path from 'path';
import { Message } from 'revolt.js/dist/maps/Messages';
import { PhotoBoxConfig } from '../../bot';
import Extractor from './extractor';
import GetMediaCommand from './commands/getmedia';
import { iterateFolder } from 'voltare/lib/util';

export const USER_REGEX = /<@([A-Z\d]+)>/;
export const ID_REGEX = /[A-Z\d]{26}/;
export const URL_REGEX = /https?:\/\/[^\s<|]+[^<.,:;"')\]\s>|*_~`]/i;

export interface FindMediaResult {
  url: string;
  from: string;
  past?: boolean;
  experimental?: boolean;
}

export default class MediaModule<
  T extends VoltareClient<PhotoBoxConfig> = VoltareClient<PhotoBoxConfig>
> extends VoltareModule<T> {
  extractors: Extractor[] = [];
  getMediaCommand?: VoltareCommand;

  constructor(client: T) {
    super(client, {
      name: 'media',
      requires: ['commands'],
      description: 'Media fetching for commands'
    });
  }

  async load() {
    await this.loadExtractors();
    this.getMediaCommand = this.client.commands.register(GetMediaCommand);
  }

  unload() {
    this.extractors = [];
    if (this.getMediaCommand) this.client.commands.unregister(this.getMediaCommand);
  }

  async loadExtractors() {
    const extractors = await iterateFolder(path.join(__dirname, 'extractors'), (file) => {
      let extractor = require(file);
      if (typeof extractor === 'function') extractor = new extractor(this.client);
      else if (typeof extractor.default === 'function') extractor = new extractor.default(this.client);
      if (extractor.regex && extractor.extract) return extractor;
      return null;
    });

    this.extractors = extractors.filter((e: any) => !!e);
  }

  toCodePoint(unicodeSurrogates: string, sep = '-') {
    var r = [],
      c = 0,
      p = 0,
      i = 0;
    while (i < unicodeSurrogates.length) {
      c = unicodeSurrogates.charCodeAt(i++);
      if (p) {
        r.push((0x10000 + ((p - 0xd800) << 10) + (c - 0xdc00)).toString(16));
        p = 0;
      } else if ((0xd800 <= c && c <= 0xdbff) || (0xfe00 <= c && c <= 0xfe0f)) {
        p = c;
      } else {
        r.push(c.toString(16));
      }
    }
    return r.join(sep);
  }

  async parseURL(url: string) {
    if (!url) return null;
    if (!this.extractors.length) await this.loadExtractors();
    for (const extractor of this.extractors) {
      const match = url.match(extractor.regex!);
      if (match) {
        try {
          const result = await extractor.extract(match, url);
          if (result) return result;
        } catch (e) {}
      }
    }

    return null;
  }

  clearCache() {
    if (!this.extractors.length) return;
    for (const extractor of this.extractors) extractor.clearCache();
  }

  async find(message: Message, context?: string, { originalMessage = true } = {}): Promise<FindMediaResult> {
    // Attachment
    if (message.attachments?.length)
      return {
        url: this.client.bot.generateFileURL(message.attachments[0])!,
        from: 'attachment'
      };

    // Embed
    if (message.embeds?.length) {
      let targetURL: string | null = null;
      switch (message.embeds[0].type) {
        case 'Image':
          targetURL = message.embeds[0].url;
          break;
        case 'Website':
          targetURL = await this.parseURL(message.embeds[0].url!);
          break;
      }
      if (targetURL)
        return {
          url: targetURL,
          from: 'embed'
        };
    }

    // URL detection in content
    if (
      !context &&
      message.asSystemMessage.type === 'text' &&
      URL_REGEX.test(message.asSystemMessage.content!)
    ) {
      const targetURL = message.asSystemMessage.content!.match(URL_REGEX)![1];
      const convertedURL = targetURL ? (await this.parseURL(targetURL)) || targetURL : targetURL;
      if (targetURL)
        return {
          url: convertedURL,
          from: 'url'
        };
    }

    // Reply
    if (originalMessage && message.reply_ids?.length && message.channel) {
      try {
        const repliedMessage = await message.channel.fetchMessage(message.reply_ids[0]);
        const result = await this.find(repliedMessage, undefined, {
          originalMessage: false
        });
        if (result) {
          result.past = true;
          return result;
        }
      } catch (e) {}
    }

    if (context) {
      // Server Icon
      if (
        ['[icon]', '[i]', '[server]', '[s]'].includes(context) &&
        message.channel &&
        message.channel.server &&
        message.channel.server.icon
      ) {
        const url = message.channel.server.generateIconURL(undefined, true);
        if (url) return { url, from: 'server-icon' };
      }

      // Server Banner
      if (
        ['[banner]', '[bnr]', '[b]'].includes(context) &&
        message.channel &&
        message.channel.server &&
        message.channel.server.banner
      ) {
        const url = message.channel.server.generateBannerURL(undefined, true);
        if (url) return { url, from: 'server-banner' };
      }

      // Avatar
      if (['[avatar]', '[avy]', '[a]'].includes(context) && message.author) {
        const url = message.author.generateAvatarURL(undefined, true);
        if (url) return { url, from: 'avatar' };
      }

      // Mentioned User's Avatar
      if (USER_REGEX.test(context) && message.mentions) {
        const id = context.match(USER_REGEX)![1];
        const mention = message.mentions.find((user) => user && user._id === id);
        if (mention) {
          const url = mention.generateAvatarURL(undefined, true);
          if (url) return { url, from: 'mention' };
        }
      }

      // URL in context
      if (URL_REGEX.test(context)) {
        const targetURL = context.match(URL_REGEX)![1];
        const convertedURL = (await this.parseURL(targetURL)) || targetURL;
        if (targetURL)
          return {
            url: convertedURL,
            from: 'url'
          };
      }

      // Emoji (Longer length emojis get priority)
      const emojiMatches = Object.keys(emojilib)
        .filter(
          (emoji) =>
            context.startsWith(emoji) ||
            (emojilib[emoji as keyof typeof emojilib] as string[]).map((n) => `:${n}:`).includes(context)
        )
        .sort((a, b) => a.length - b.length)
        .reverse();
      if (emojiMatches.length)
        return {
          url: `https://twemoji.maxcdn.com/v/latest/svg/${this.toCodePoint(emojiMatches[0])}.svg`,
          from: 'emoji'
        };
    }

    // Past Messages
    if (originalMessage)
      try {
        const pastMessages = await message.channel?.fetchMessages({
          limit: this.client.config.media.lookBackLimit,
          before: message._id
        });
        if (pastMessages) {
          const filteredMessages = await Promise.all(
            pastMessages.map((pastMessage) => this.find(pastMessage, undefined, { originalMessage: false }))
          );
          const lastURL = filteredMessages.filter((result) => result.from !== 'fallback')[0];
          if (lastURL) {
            lastURL.past = true;
            return lastURL;
          }
        }
      } catch (e) {}

    return {
      url: message.author!.generateAvatarURL(undefined, true),
      from: 'fallback'
    };
  }
}
