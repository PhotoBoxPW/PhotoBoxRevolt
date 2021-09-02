import { VoltareClient } from 'voltare';
import { TextCommand } from '../../../util/abstracts';

export default class BonziBuddyCommand extends TextCommand {
  endpoint = 'bonzibuddy';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'bonzibuddy',
      description: 'Lets surf the internet together!',
      aliases: ['bonzi', 'bb']
    });

    this.filePath = __filename;
  }
}
