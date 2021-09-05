import { VoltareClient } from 'voltare';
import { GeneralCommand } from '../util/abstracts';

export default class SourceCommand extends GeneralCommand {
  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'source',
      description: 'Gets the GitHub repository link to this bot.',
      category: 'General',
      aliases: ['github', 'gh', 'repo'],
      metadata: {
        examples: ['source']
      }
    });

    this.filePath = __filename;
  }

  async run() {
    return '[$\\colorbox{#333333}{\\color{#ffffff}\\textsf{📒 GitHub Repository}}$](https://github.com/PhotoBoxPW/PhotoBoxRevolt)';
  }
}
