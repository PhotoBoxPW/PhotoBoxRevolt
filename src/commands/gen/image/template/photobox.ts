import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class PBoxCommand extends ImageCommand {
  endpoint = 'photobox';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'photobox',
      description: 'Now this is meta.',
      category: 'Image Generation - Image Template',
      aliases: ['pbox', 'pbx', '📷', '📸', ':camera:', ':camera_flash:']
    });

    this.filePath = __filename;
  }
}
