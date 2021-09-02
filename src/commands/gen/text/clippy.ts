import { VoltareClient } from 'voltare';
import { TextCommand } from '../../../util/abstracts';

export default class ClippyCommand extends TextCommand {
  endpoint = 'clippy';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'clippy',
      description: 'Need any help?',
      aliases: ['paperclip', 'clippit'],
      metadata: {
        credit: 'blargbot'
      }
    });

    this.filePath = __filename;
  }
}
