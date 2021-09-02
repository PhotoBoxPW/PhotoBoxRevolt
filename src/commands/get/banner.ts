import { CommandContext, VoltareClient } from 'voltare';
import { GeneralCommand } from '../../util/abstracts';
import { stripIndents } from 'common-tags';

export default class BannerCommand extends GeneralCommand {
  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'banner',
      description: 'Gets the banner of the server.',
      category: 'General',
      aliases: ['bnr', 'serverbanner', 'guildbanner'],
      metadata: {
        examples: ['banner']
      },
      userPermissions: ['voltare.inserver']
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    if (!ctx.server!.banner) return 'This server has no banner set.';

    return stripIndents`
      ## ${ctx.server!.name}'s Banner
      [Image Link](${ctx.server!.generateBannerURL(undefined, true)})
    `;
  }
}
