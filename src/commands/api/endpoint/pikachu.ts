import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class PikachuCommand extends PictureEndpointCommand {
  url = 'https://some-random-api.ml/img/pikachu';
  credit = 'some-random-api.ml';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'pikachu',
      description: 'Get a random picture of the pokémon Pikachu.'
    });

    this.filePath = __filename;
  }
}
