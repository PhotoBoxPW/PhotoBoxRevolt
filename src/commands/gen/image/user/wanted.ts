import { VoltareClient } from 'voltare';
import { UserCommand } from '../../../../util/abstracts';

export default class WantedCommand extends UserCommand {
  endpoint = 'wanted';

  constructor(client: VoltareClient<any>) {
    super(
      client,
      {
        name: 'wanted',
        description: 'On the run.',
        aliases: ['wantedposter']
      },
      false
    );

    this.filePath = __filename;
  }
}
