import { VoltareClient } from 'voltare';
import { NeedleResponse } from 'needle';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class IQCommand extends PictureEndpointCommand {
  url = 'https://inspirobot.me/api?generate=true';
  credit = 'inspirobot.me';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'inspirationalquote',
      description: 'Get a random inspirational quote.',
      aliases: ['inspire', 'inspiro']
    });

    this.filePath = __filename;
  }

  toImage(res: NeedleResponse) {
    return res.body;
  }
}
