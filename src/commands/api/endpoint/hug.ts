import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class HugCommand extends PictureEndpointCommand {
  url = 'https://some-random-api.ml/animu/hug';
  credit = 'some-random-api.ml';
  katex = {
    emoji: '🤗',
    text: '*hug*',
    textColor: '#ffffff',
    bgColor: '#353b48'
  };

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'hug',
      description: '*hug*',
      aliases: ['🤗', '🫂', ':hugs:', ':people_hugging:']
    });

    this.filePath = __filename;
  }
}
