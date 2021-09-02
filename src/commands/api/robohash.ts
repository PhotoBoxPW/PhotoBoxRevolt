import { stripIndents } from 'common-tags';
import { CommandContext, VoltareClient } from 'voltare';
import { USER_REGEX, CHANNEL_REGEX } from '../../modules/media';
import { readFlags } from '../../util';
import { GeneralCommand } from '../../util/abstracts';

export default class RoboHashCommand extends GeneralCommand {
  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'robohash',
      description: 'Get a robot based on something.',
      aliases: ['rh', '🤖', ':robot:'],
      category: 'Image API',
      userPermissions: ['revolt.channel.embedlinks'],
      metadata: {
        usage: '[anything]',
        details: stripIndents`
          To set the picture set, use \`--set (s)\`.

          Set 1: Robots (default)
          Set 2: Monsters
          Set 3: Disembodied Robot Heads
          Set 4: Kittens
          Set 5: Humans
        `,
        specialArgs: true
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    const { result, args } = readFlags([{ name: 'set', shortFlag: 's', getsString: true }], ctx);

    const value =
      (args[0] && USER_REGEX.test(args[0]) ? args[0].match(USER_REGEX)![1] : null) ||
      (args[0] && CHANNEL_REGEX.test(args[0]) ? args[0].match(CHANNEL_REGEX)![1] : null) ||
      args[0] ||
      ctx.author._id;

    let set: number | null = typeof result.set === 'string' ? parseInt(result.set) : null;
    if (set !== null && isNaN(set)) set = null;
    set = set ? Math.min(5, Math.max(1, set)) : 1;

    return `https://robohash.org/${encodeURIComponent(value)}.png?set=set${set}#${Date.now()}`;
  }
}
