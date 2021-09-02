import { VoltareClient } from 'voltare';
import { TextLadderCommand } from '../../../../util/abstracts';

export default class WWECommand extends TextLadderCommand {
  endpoint = 'wwe';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'wwe',
      description: 'Vince McMahon is amazing.',
      aliases: ['expandingwwe'],
      metadata: {
        credit: 'dankmemer'
      }
    });

    this.filePath = __filename;
  }
}
