import { oneLine } from 'common-tags';
import { CommandContext, VoltareClient, VoltareCommand } from 'voltare';
import util from 'util';
import MediaModule from '..';

export default class GetMediaCommand extends VoltareCommand {
  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'getmedia',
      description: 'Gets media to use for image generation.',
      category: 'Debug',
      metadata: {
        examples: [
          'getmedia',
          'getmedia @mention',
          'getmedia "[avatar]"',
          'getmedia "[icon]"',
          'getmedia "[banner]"'
        ],
        usage: '[media]',
        details: oneLine`
          This is useful to know how PhotoBox gets media to use
          later in commands.
        `,
        hidden: true
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
    const media = await (this.client.modules.get('media') as MediaModule).find(ctx.message, ctx.args[0]);
    return `\`\`\`js\n${util.inspect(media)}\n\`\`\``;
  }
}
