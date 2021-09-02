import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class LucarioCommand extends PictureEndpointCommand {
  url = 'http://pics.floofybot.moe/image?token=lucario&category=sfw';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'lucario',
      description: 'Get a random picture of the pokémon Lucario.'
    });

    this.filePath = __filename;
  }
}
