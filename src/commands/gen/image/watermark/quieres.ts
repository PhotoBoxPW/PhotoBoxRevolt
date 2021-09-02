import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class QuieresCommand extends ImageCommand {
  endpoint = 'quieres';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'quieres',
      description: 'Quieres?',
      category: 'Image Generation - Watermark',
      aliases: ['bufa']
    });

    this.filePath = __filename;
  }
}
