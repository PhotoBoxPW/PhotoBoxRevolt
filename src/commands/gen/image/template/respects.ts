import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class RespectsCommand extends ImageCommand {
  endpoint = 'respects';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'respects',
      description: 'Press F to Pay Respects',
      category: 'Image Generation - Image Template',
      aliases: ['f', 'respect', '🇫']
    });

    this.filePath = __filename;
  }
}
