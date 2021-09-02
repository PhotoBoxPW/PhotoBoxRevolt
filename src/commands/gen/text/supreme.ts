import { VoltareClient } from 'voltare';
import { TextCommand } from '../../../util/abstracts';

export default class SupremeCommand extends TextCommand {
  endpoint = 'supreme';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'supreme',
      description: 'This has already been sold out.'
    });

    this.filePath = __filename;
  }
}
