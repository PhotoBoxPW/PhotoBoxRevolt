import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class WinkCommand extends PictureEndpointCommand {
  url = 'https://some-random-api.ml/animu/wink';
  credit = 'some-random-api.ml';
  katex = {
    emoji: '😉',
    text: '*wink*',
    textColor: '#ffffff',
    bgColor: '#353b48'
  };

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'wink',
      description: '*wink*',
      aliases: ['😉', '😜', ':wink:', ':stuck_out_tongue_winking_eye:']
    });

    this.filePath = __filename;
  }
}
