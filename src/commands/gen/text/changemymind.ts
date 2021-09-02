import { VoltareClient } from 'voltare';
import { TextCommand } from '../../../util/abstracts';

export default class CMMCommand extends TextCommand {
  endpoint = 'changemymind';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'changemymind',
      description: 'Convince me.',
      aliases: ['crowder', 'cmm']
    });

    this.filePath = __filename;
  }
}
