import { oneLine, stripIndents } from 'common-tags';
import { CommandContext, CommandOptions, VoltareClient, VoltareCommand } from 'voltare';
import { Message } from 'revolt.js/dist/maps/Messages';
import { User } from 'revolt.js/dist/maps/Users';
import { defaultsDeep } from 'lodash';
import needle, { NeedleResponse } from 'needle';
import prettyMilliseconds from 'pretty-ms';
import { readFlags } from '.';
import ImgSrvModule from '../modules/imgsrv';
import {
  DoubleImagePayload,
  GifImagePayload,
  ImagePayload,
  ImgSrvPayload,
  MirrorPayload,
  TextLadderPayload,
  TextPayload,
  UserPayload,
  WantedPayload
} from '../modules/imgsrv/payload';
import MediaModule, { USER_REGEX, CHANNEL_REGEX } from '../modules/media';

export abstract class GeneralCommand extends VoltareCommand {
  get mediaModule() {
    return this.client.modules.get('media')! as MediaModule;
  }

  cleanContent(content: string, message: Message) {
    return content
      .replace(USER_REGEX, (matched, id) => {
        // TODO fetch users instead
        if (!message.mentions) return matched;
        const user = message.mentions.find((m) => m && m._id === id);
        return user ? `@${user.username}` : matched;
      })
      .replace(CHANNEL_REGEX, (matched, id) => {
        if (!message.channel?.server) return matched;
        const channel = message.channel.server.channels.find((r) => r && r._id === id);
        return channel ? `#${channel.name}` : matched;
      });
  }

  finalize(response: any, ctx: CommandContext) {
    if (
      typeof response === 'string' ||
      (response && response.constructor && response.constructor.name === 'Object')
    )
      return ctx.reply(response);
  }
}

export abstract class GenerateCommand extends GeneralCommand {
  endpoint = '';

  constructor(client: VoltareClient<any>, opts: CommandOptions) {
    super(
      client,
      defaultsDeep(opts, {
        category: 'Image Generation',
        userPermissions: ['revolt.channel.uploadfiles'],
        throttling: {
          usages: 1,
          duration: 5,
          bypass: ['voltare.elevated']
        }
      })
    );
  }

  get imgSrvModule() {
    return this.client.modules.get('imgsrv')! as ImgSrvModule;
  }

  async generate(ctx: CommandContext, payload: ImgSrvPayload) {
    if (!this.endpoint) return ctx.reply('No endpoint was defined for this command.');

    try {
      this.client.emit('logger', 'info', 'gen', [
        oneLine`
          Generating '${this.endpoint}' for
          ${ctx.author.username} (${ctx.author._id})
        `
      ]);
      ctx.channel.startTyping();
      const before = Date.now();
      const image = await this.imgSrvModule.generate(this.endpoint, payload);
      const after = Date.now();
      this.client.emit('logger', 'info', 'gen', [
        oneLine`
          '${this.endpoint}' for
          ${ctx.author.username} (${ctx.author._id})
          took ${prettyMilliseconds(after - before)}
        `
      ]);
      ctx.channel.stopTyping();
      const attachment = await this.client.upload({
        file: image.buffer,
        name: `${this.endpoint}.${image.extension}`
      });
      return ctx.reply({
        content: `##### Took ${prettyMilliseconds(after - before)}.`,
        attachments: [attachment]
      });
    } catch (err) {
      this.client.emit('logger', 'error', 'gen', [
        oneLine`
          '${this.endpoint}' for
          ${ctx.author.username} (${ctx.author._id})
          errored
        `,
        err
      ]);
      ctx.channel.stopTyping();
      return ctx.reply((err as Error).message);
    }
  }

  async onError(err: Error, ctx: CommandContext) {
    this.client.emit('logger', 'error', 'gen', [
      oneLine`
        Command error '${this.name}' for
        ${ctx.author.username} (${ctx.author._id})
      `,
      err
    ]);
    return ctx.reply(`An error occurred while running the \`${this.name}\` command.`);
  }
}

export abstract class ImageCommand extends GenerateCommand {
  constructor(client: VoltareClient<any>, opts: CommandOptions) {
    super(
      client,
      defaultsDeep(opts, {
        metadata: {
          usage: '[media]'
        }
      })
    );
  }

  async run(ctx: CommandContext) {
    const media = await this.mediaModule.find(ctx.message, ctx.args[0]);
    const payload: ImagePayload = { image: media.url };

    await this.generate(ctx, payload);
  }
}

export abstract class MirrorImageCommand extends GenerateCommand {
  constructor(client: VoltareClient<any>, opts: CommandOptions) {
    super(
      client,
      defaultsDeep(opts, {
        metadata: {
          usage: '[media]',
          details: stripIndents`
            To use the last half of the image, use \`--lasthalf (l)\`.
            This command supports GIFs, enable with \`--gif (g)\`.
          `,
          imageType: 'filter'
        }
      })
    );
  }

  async run(ctx: CommandContext) {
    const { result, args } = readFlags(
      [
        { name: 'gif', shortFlag: 'g' },
        { name: 'lasthalf', shortFlag: 'l' }
      ],
      ctx
    );

    const media = await this.mediaModule.find(ctx.message, args[0]);
    const payload: MirrorPayload = { image: media.url };
    if (result.lasthalf) payload.last_half = true;
    if (result.gif) payload.allow_gif = true;

    await this.generate(ctx, payload);
  }
}

export abstract class GIFImageCommand extends GenerateCommand {
  constructor(client: VoltareClient<any>, opts: CommandOptions) {
    super(
      client,
      defaultsDeep(opts, {
        metadata: {
          usage: '[media]',
          details: 'This command supports GIFs, enable with `--gif (g)`.',
          imageType: 'gifimage'
        }
      })
    );
  }

  async run(ctx: CommandContext) {
    const { result, args } = readFlags([{ name: 'gif', shortFlag: 'g' }], ctx);

    const media = await this.mediaModule.find(ctx.message, args[0]);
    const payload: GifImagePayload = { image: media.url };
    if (result.gif) payload.allow_gif = true;

    await this.generate(ctx, payload);
  }
}

export abstract class TextCommand extends GenerateCommand {
  constructor(client: VoltareClient<any>, opts: CommandOptions) {
    super(
      client,
      defaultsDeep(opts, {
        category: 'Image Generation - Text Template',
        metadata: {
          usage: '<text>',
          imageType: 'text'
        }
      })
    );
  }

  async run(ctx: CommandContext) {
    const text = this.cleanContent(ctx.args.join(' ').trim(), ctx.message);
    if (!text) return 'This command requires some text!';
    const payload: TextPayload = { text };
    await this.generate(ctx, payload);
  }
}

export abstract class TextLadderCommand extends GenerateCommand {
  constructor(client: VoltareClient<any>, opts: CommandOptions) {
    super(
      client,
      defaultsDeep(opts, {
        category: 'Image Generation - Text Template',
        metadata: {
          usage: '"<text>" "[text]" ...',
          imageType: 'text'
        }
      })
    );
  }

  async run(ctx: CommandContext) {
    const texts = ctx.args.map((t) => this.cleanContent(t.trim(), ctx.message));
    if (texts.length < 2)
      return stripIndents`
        This command requires at least two messages!
        Example: \`${ctx.prefix}${this.name} "text one" "text two" ...\`
      `;
    const payload: TextLadderPayload = { texts };
    await this.generate(ctx, payload);
  }
}

export abstract class UserCommand extends GenerateCommand {
  usingText: boolean;

  constructor(client: VoltareClient<any>, opts: CommandOptions, usingText = true) {
    super(
      client,
      defaultsDeep(opts, {
        category: 'Image Generation - User',
        metadata: usingText
          ? {
              usage: '<text>',
              details: oneLine`
                Set the user with the \`--user (u)\` flag
                along with the user you want to use.
              `,
              imageType: 'user'
            }
          : {
              usage: '[@mention]',
              imageType: 'user'
            }
      })
    );

    this.usingText = usingText;
  }

  async run(ctx: CommandContext) {
    let user = ctx.author;

    if (this.usingText) {
      const { result, args } = readFlags([{ name: 'user', shortFlag: 'u', getsString: true }], ctx);

      if (typeof result.user === 'string' && USER_REGEX.test(result.user)) {
        const id = result.user.match(USER_REGEX)![1];
        const mention = await this.client.bot.users.fetch(id);
        if (mention) user = mention;
      }

      const text = this.cleanContent(args.join(' ').trim(), ctx.message);
      if (!text) return 'This command requires some text!';

      const payload: UserPayload = {
        username: user.username,
        avatar: ctx.message.author!.generateAvatarURL(undefined, true),
        text
      };

      await this.generate(ctx, payload);
    } else {
      if (ctx.args[0] && USER_REGEX.test(ctx.args[0])) {
        const id = ctx.args[0].match(USER_REGEX)![1];
        const mention = await this.client.bot.users.fetch(id);
        if (mention) user = mention;
      }

      const payload: WantedPayload = {
        username: user.username,
        image: ctx.message.author!.generateAvatarURL(undefined, true)
      };

      await this.generate(ctx, payload);
    }
  }
}

export abstract class DoubleUserCommand extends GenerateCommand {
  constructor(client: VoltareClient<any>, opts: CommandOptions) {
    super(
      client,
      defaultsDeep(opts, {
        category: 'Image Generation - Multi-user',
        metadata: {
          usage: '<@mention> [@mention]',
          imageType: 'multiuser'
        }
      })
    );
  }

  async run(ctx: CommandContext) {
    const users: User[] = [];

    if (ctx.args[0] && USER_REGEX.test(ctx.args[0])) {
      const id = ctx.args[0].match(USER_REGEX)![1];
      const mention = await this.client.bot.users.fetch(id);
      if (mention) users.push(mention);
    }

    if (ctx.args[1] && USER_REGEX.test(ctx.args[1])) {
      const id = ctx.args[1].match(USER_REGEX)![1];
      const mention = await this.client.bot.users.fetch(id);
      if (mention) users.push(mention);
    } else users.unshift(ctx.author);

    if (users.length < 2) return 'Please mention a user!';

    const payload: DoubleImagePayload = {
      avatar1: users[0].generateAvatarURL(undefined, true),
      avatar2: users[1].generateAvatarURL(undefined, true)
    };

    await this.generate(ctx, payload);
  }
}

export interface PictureEndpointKatex {
  emoji?: string;
  bgColor: string;
  textColor: string;
  text: string;
}

export abstract class PictureEndpointCommand extends GeneralCommand {
  url = '';
  credit = '';
  headers = {};
  katex: PictureEndpointKatex = {
    bgColor: 'transparent',
    textColor: 'default',
    text: 'Image Link'
  };

  constructor(client: VoltareClient<any>, opts: CommandOptions) {
    super(
      client,
      defaultsDeep(opts, {
        category: 'Image API',
        userPermissions: ['revolt.channel.embedlinks'],
        throttling: {
          usages: 1,
          duration: 2,
          bypass: ['voltare.elevated']
        }
      })
    );
  }

  toImage(res: NeedleResponse) {
    return res.body.url || res.body.file || res.body.image || res.body.link || res.body.text || res.body[0];
  }

  async run(ctx: CommandContext) {
    try {
      ctx.channel.startTyping();
      const res = await needle('get', this.url, { headers: this.headers, timeout: 5000, follow: 3 });
      ctx.channel.stopTyping();
      if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
        return stripIndents`
          [$\\large\\colorbox{${this.katex.bgColor}}{${this.katex.emoji || ''}\\color{${
          this.katex.textColor
        }}\\textsf{${this.katex.emoji ? ' ' : ''}${this.katex.text}}}$](${this.toImage(res)} "Image Link")
          ${
            this.credit
              ? `$\\colorbox{#333333}{\\color{#ffffff}\\textsf{Powered by \\textbf{${this.credit}}}}$`
              : ''
          }
        `;
      } else return `The service gave us a ${res.statusCode || 'bad error'}! Try again later!`;
    } catch (e) {
      ctx.channel.stopTyping();
      return "Seems like the URL doesn't exist! Contact support!";
    }
  }
}
