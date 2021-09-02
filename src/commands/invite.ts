import { VoltareClient } from 'voltare';
import { GeneralCommand } from '../util/abstracts';

export default class InviteCommand extends GeneralCommand {
  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'invite',
      description: 'Gets the bot invite link.',
      category: 'General',
      aliases: ['✉', '✉️', ':envelope:'],
      metadata: {
        examples: ['invite']
      }
    });

    this.filePath = __filename;
  }

  async run() {
    return '[$\\color{00a99d}\\fbox{\\textbf{\\textsf{+ Add PhotoBox}}}$](https://app.revolt.chat/bot/01FE6KMPV60ZYTSE7TTQJ4TCCQ)';
  }
}
