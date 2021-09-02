import { VoltareClient } from 'voltare';
import { TextCommand } from '../../../util/abstracts';

export default class PACommand extends TextCommand {
  endpoint = 'presidentialalert';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'presidentialalert',
      description: 'You thought it was an AMBER alert.',
      aliases: ['prezalert', 'president', 'pa'],
      metadata: {
        credit: 'switchblade'
      }
    });

    this.filePath = __filename;
  }
}
