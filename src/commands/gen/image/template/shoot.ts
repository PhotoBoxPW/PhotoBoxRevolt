import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class ShootCommand extends ImageCommand {
  endpoint = 'shoot';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'shoot',
      description: 'Take the shot.',
      category: 'Image Generation - Image Template',
      aliases: ['🔫', ':gun:']
    });

    this.filePath = __filename;
  }
}
