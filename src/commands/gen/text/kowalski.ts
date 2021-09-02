import { VoltareClient } from 'voltare';
import { TextCommand } from '../../../util/abstracts';

export default class KowalskiCommand extends TextCommand {
  endpoint = 'kowalski';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'kowalski',
      description: 'Smile and wave.',
      metadata: {
        credit: 'dankmemer'
      }
    });

    this.filePath = __filename;
  }
}
