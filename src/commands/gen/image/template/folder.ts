import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class FolderCommand extends ImageCommand {
  endpoint = 'folder';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'folder',
      description: 'Whats in the folder?',
      category: 'Image Generation - Image Template',
      aliases: ['📁', '📂', ':file_folder:', ':open_file_folder:'],
      metadata: {
        credit: 'shitpost'
      }
    });

    this.filePath = __filename;
  }
}
