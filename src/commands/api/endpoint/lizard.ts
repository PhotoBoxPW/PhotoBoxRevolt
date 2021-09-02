import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class LizardCommand extends PictureEndpointCommand {
  url = 'https://nekos.life/api/v2/img/lizard';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'lizard',
      description: 'Get a random lizard.',
      aliases: ['🦎', ':lizard:']
    });

    this.filePath = __filename;
  }
}
