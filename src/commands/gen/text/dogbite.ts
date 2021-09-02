import { VoltareClient } from 'voltare';
import { TextCommand } from '../../../util/abstracts';

export default class DogBiteCommand extends TextCommand {
  endpoint = 'dogbite';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'dogbite',
      description: 'He hurts in other ways.'
    });

    this.filePath = __filename;
  }
}
