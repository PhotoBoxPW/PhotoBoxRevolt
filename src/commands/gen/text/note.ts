import { VoltareClient } from 'voltare';
import { TextCommand } from '../../../util/abstracts';

export default class NoteCommand extends TextCommand {
  endpoint = 'note';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'note',
      description: 'Passing notes in class.',
      aliases: ['📄', ':page_facing_up:'],
      metadata: {
        credit: 'dankmemer'
      }
    });

    this.filePath = __filename;
  }
}
