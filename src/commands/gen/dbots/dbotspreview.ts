import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../util/abstracts';

export default class DBotsPreviewCommand extends ImageCommand {
  endpoint = 'dbotspreview';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'dbotspreview',
      description: 'Preview a banner.',
      category: 'Image Generation - Image Template',
      // userPermissions: ['discord.attachfiles', 'guild.dbots'],
      userPermissions: ['server.dbots']
    });

    this.filePath = __filename;
  }
}
