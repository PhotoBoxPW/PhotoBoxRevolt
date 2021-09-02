import { VoltareClient } from 'voltare';
import { UserCommand } from '../../../../util/abstracts';

export default class TTTCommand extends UserCommand {
  endpoint = 'ttt';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'ttt',
      description: 'There is a traitor amongst us.',
      aliases: ['traitor']
    });

    this.filePath = __filename;
  }
}
