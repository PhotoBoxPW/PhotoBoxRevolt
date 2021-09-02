import { VoltareClient } from 'voltare';
import { TextLadderCommand } from '../../../../util/abstracts';

export default class BrainCommand extends TextLadderCommand {
  endpoint = 'brain';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'brain',
      description: 'Big brain moment.',
      aliases: ['🧠', ':brain:'],
      metadata: {
        credit: 'ks'
      }
    });

    this.filePath = __filename;
  }
}
