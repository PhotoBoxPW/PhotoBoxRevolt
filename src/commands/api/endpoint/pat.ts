import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class PatCommand extends PictureEndpointCommand {
  url = 'https://some-random-api.ml/animu/pat';
  credit = 'some-random-api.ml';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'pat',
      description: '*pat*'
    });

    this.filePath = __filename;
  }
}
