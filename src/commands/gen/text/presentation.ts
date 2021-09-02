import { VoltareClient } from 'voltare';
import { TextCommand } from '../../../util/abstracts';

export default class PresentationCommand extends TextCommand {
  endpoint = 'presentation';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'presentation',
      description: 'Presenting an opinion.',
      metadata: {
        credit: 'dankmemer'
      }
    });

    this.filePath = __filename;
  }
}
