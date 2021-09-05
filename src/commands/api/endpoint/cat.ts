import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class CatCommand extends PictureEndpointCommand {
  url = 'https://aws.random.cat/meow';
  credit = 'random.cat';
  katex = {
    emoji: '🐈',
    text: 'Cat!',
    textColor: '#ffffff',
    bgColor: '#cd6133'
  };

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'cat',
      description: 'Get a random cat.',
      aliases: [
        '🐱',
        '😿',
        '😻',
        '😹',
        '😽',
        '😾',
        '🙀',
        '😸',
        '😺',
        '😼',
        '🐈',
        '🐈‍⬛',
        ':cat:',
        ':crying_cat_face:',
        ':heart_eyes_cat:',
        ':joy_cat:',
        ':kissing_cat:',
        ':pouting_cat:',
        ':scream_cat:',
        ':smile_cat:',
        ':smiley_cat:',
        ':smirk_cat:',
        ':cat2:',
        ':black_cat:'
      ]
    });

    this.filePath = __filename;
  }
}
