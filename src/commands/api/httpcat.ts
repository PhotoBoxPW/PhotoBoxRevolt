import { CommandContext, VoltareClient } from 'voltare';
import { GeneralCommand } from '../../util/abstracts';

export default class HTTPCatCommand extends GeneralCommand {
  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'httpcat',
      description: 'Get a cat based on an HTTP status code.',
      category: 'Image API',
      userPermissions: ['revolt.channel.embedlinks'],
      metadata: {
        usage: '[status]'
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    const code = ctx.args[0] || 404;
    return `https://http.cat/${code}.jpg`;
  }
}
