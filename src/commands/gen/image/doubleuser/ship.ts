import { VoltareClient, CommandContext } from 'voltare';
import { User } from 'revolt.js/dist/maps/Users';
import { GenerateCommand } from '../../../../util/abstracts';
import { USER_REGEX } from '../../../../modules/media';
import { HeartPayload } from '../../../../modules/imgsrv/payload';
import { readFlags } from '../../../../util';
import { oneLine, stripIndents } from 'common-tags';

export default class ShipCommand extends GenerateCommand {
  endpoint = 'ship';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'ship',
      description: 'Aww...',
      aliases: [
        'โค',
        'love',
        '๐',
        '๐',
        '๐',
        '๐',
        '๐',
        '๐',
        '๐',
        '๐',
        '๐',
        '๐',
        '๐',
        '๐ค',
        '๐ค',
        '๐',
        '๐งก',
        '๐ค',
        ':heart:',
        ':broken_heart:',
        ':cupid:',
        ':heartbeat:',
        ':heartpulse:',
        ':gift_heart:',
        ':revolving_hearts:',
        ':two_hearts:',
        ':heart_decoration:',
        ':green_heart:',
        ':purple_heart:',
        ':blue_heart:',
        ':brown_heart:',
        ':white_heart:',
        ':yellow_heart:',
        ':orange_heart:',
        ':black_heart:'
      ],
      category: 'Image Generation - Multi-user',
      metadata: {
        usage: '<@mention> [@mention]',
        details: stripIndents`
          ${oneLine`
            To set the heart, use the \`--heart (h)\` flag along
            with the type of heart. You can also use the command aliases
            to set the type of heart you want.
          `}
          > Example: \`pbox ship --heart orange\`
        `,
        specialArgs: true,
        imageType: 'multiuser'
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    const { result, args } = readFlags([{ name: 'heart', shortFlag: 'h', getsString: true }], ctx);

    let heartType = 'red';
    const prefix = ctx.prefix + (ctx.event.get('commands/spacedPrefix') ? ' ' : '');
    const alias = (ctx.message.content as string).slice(prefix.length).split(' ')[0];

    if (alias) {
      const newType = this.parseHeartType(alias);
      if (newType) heartType = newType;
    }

    const users: User[] = [];

    if (args[0] && USER_REGEX.test(args[0])) {
      const id = args[0].match(USER_REGEX)![1];
      const mention = await this.client.bot.users.fetch(id);
      if (mention) users.push(mention);
    }

    if (args[1] && USER_REGEX.test(args[1])) {
      const id = args[1].match(USER_REGEX)![1];
      const mention = await this.client.bot.users.fetch(id);
      if (mention) users.push(mention);
    } else users.unshift(ctx.author);

    if (users.length < 2) return 'Please mention a user!';

    if (typeof result.heart === 'string') {
      const newType = this.parseHeartType(result.heart);
      if (newType) heartType = newType;
    }

    const payload: HeartPayload = {
      avatar1: users[0].generateAvatarURL(undefined, true),
      avatar2: users[1].generateAvatarURL(undefined, true),
      heart: heartType
    };

    await this.generate(ctx, payload);
  }

  parseHeartType(heartType: string) {
    const types: { [type: string]: string[] } = {
      broken: ['๐', 'split'],
      arrow: ['๐', 'cupid'],
      beating: ['๐', 'heartbeat', 'beat'],
      growing: ['๐', 'grow', 'heartpulse', 'pulse'],
      ribbon: ['๐', 'wrap', 'gift'],
      revolving: ['๐', 'revolve', 'moving'],
      two: ['๐', 'double', '2'],
      decoration: ['๐', 'deco'],
      red: ['โค', 'โฅ๏ธ'],
      green: ['๐'],
      purple: ['๐'],
      blue: ['๐'],
      brown: ['๐ค'],
      white: ['๐ค', 'light'],
      yellow: ['๐'],
      orange: ['๐งก'],
      black: ['๐ค', 'dark']
    };

    for (const type in types) {
      if (type === heartType.toLowerCase() || types[type].includes(heartType.toLowerCase())) return type;
    }
  }
}
