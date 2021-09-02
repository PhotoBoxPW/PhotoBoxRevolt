import { VoltareClient } from 'voltare';
import { DoubleUserCommand } from '../../../../util/abstracts';

export default class TinderCommand extends DoubleUserCommand {
  endpoint = 'tinder';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'tinder',
      description: 'Hot date!',
      aliases: ['🔥', ':fire:']
    });

    this.filePath = __filename;
  }
}
