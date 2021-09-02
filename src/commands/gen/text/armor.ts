import { VoltareClient } from 'voltare';
import { TextCommand } from '../../../util/abstracts';

export default class ArmorCommand extends TextCommand {
  endpoint = 'armor';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'armor',
      description: 'He had no emotional armor.',
      metadata: {
        credit: 'dankmemer'
      }
    });

    this.filePath = __filename;
  }
}
