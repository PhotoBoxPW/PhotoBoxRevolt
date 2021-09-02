import { CommandContext, VoltareClient } from 'voltare';
import { GeneralCommand } from '../../util/abstracts';
import { USER_REGEX } from '../../modules/media';
import { stripIndents } from 'common-tags';

export default class AvatarCommand extends GeneralCommand {
  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'avatar',
      description: 'Gets the avatar of a user.',
      category: 'General',
      aliases: ['avy', 'av', '🖼️', ':frame_photo:'],
      metadata: {
        examples: ['avatar', 'avatar @mention'],
        usage: '[@mention]'
      },
      throttling: {
        usages: 5,
        duration: 10,
        bypass: ['voltare.elevated']
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    let user = ctx.author;
    if (ctx.args[0] && USER_REGEX.test(ctx.args[0]) && ctx.message.mentions) {
      const id = ctx.args[0].match(USER_REGEX)![1];
      const mention = ctx.message.mentions.find((user) => user && user._id === id);
      if (mention) user = mention;
    }

    return stripIndents`
      ## ${user.username}'s Avatar
      [Image Link](${user.generateAvatarURL(undefined, true)})
    `;
  }
}
