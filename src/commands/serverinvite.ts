import { VoltareClient } from 'voltare';
import { GeneralCommand } from '../util/abstracts';

export default class ServerInviteCommand extends GeneralCommand {
  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'serverinvite',
      description: 'Gets the server invite link.',
      category: 'General',
      aliases: ['sinvite', 'botserver'],
      metadata: {
        examples: ['serverinvite']
      }
    });

    this.filePath = __filename;
  }

  async run() {
    return "[$\\colorbox{#fc2929}{\\color{#ffffff}\\textsf{Join Snazzah's Hangout}}$](https://app.revolt.chat/invite/Pb3PJXH2)";
  }
}
