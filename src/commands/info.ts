import { stripIndents } from 'common-tags';
import { CommandContext, VoltareClient } from 'voltare';
import prettyMilliseconds from 'pretty-ms';
import { GeneralCommand } from '../util/abstracts';

export default class InfoCommand extends GeneralCommand {
  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'info',
      description: 'Gets general info about the bot.',
      category: 'General',
      aliases: ['ℹ', ':information_source:'],
      metadata: {
        examples: ['info']
      },
      throttling: {
        usages: 1,
        duration: 1,
        bypass: ['voltare.elevated']
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    await ctx.reply(stripIndents`
      ## \`📷\` [**PhotoBox**](https://github.com/PhotoBoxPW/PhotoBoxRevolt) - A Revolt bot that makes and sends images.
      **${this.client.bot.servers.size.toLocaleString()}** servers
      **${prettyMilliseconds(Math.round(process.uptime()) * 1000)}** uptime
    `);
  }
}
