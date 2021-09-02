import { VoltareClient } from 'voltare';
import { TextCommand } from '../../../util/abstracts';

export default class AbandonCommand extends TextCommand {
  endpoint = 'abandon';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'abandon',
      description: 'Oh no.',
      metadata: {
        credit: 'dankmemer'
      }
    });

    this.filePath = __filename;
  }
}
