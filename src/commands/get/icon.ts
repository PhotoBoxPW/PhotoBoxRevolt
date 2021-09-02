import { stripIndents } from 'common-tags';
import { CommandContext, VoltareClient } from 'voltare';
import { GeneralCommand } from '../../util/abstracts';

export default class IconCommand extends GeneralCommand {
  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'icon',
      description: 'Gets the icon of the server.',
      category: 'General',
      aliases: ['icn', 'ico', 'server', 'servericon', 'guild', 'guildicon', '🛡️'],
      metadata: {
        examples: ['icon']
      },
      userPermissions: ['voltare.inserver']
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    if (!ctx.server!.icon) return 'This server has no icon set.';

    return stripIndents`
      ## ${ctx.server!.name}'s Icon
      [Image Link](${ctx.server!.generateIconURL(undefined, true)})
    `;
  }
}
