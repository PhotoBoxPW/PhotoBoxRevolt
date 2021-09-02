import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class WhoDidThisCommand extends ImageCommand {
  endpoint = 'whodidthis';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'whodidthis',
      description: 'instagram memes',
      category: 'Image Generation - Image Template',
      aliases: ['wdt', '😂', ':joy:'],
      metadata: {
        credit: 'dankmemer'
      }
    });

    this.filePath = __filename;
  }
}
