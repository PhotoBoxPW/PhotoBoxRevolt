import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class LinusCommand extends ImageCommand {
  endpoint = 'linus';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'linus',
      description: "Here's a tech tip.",
      category: 'Image Generation - Image Template'
    });

    this.filePath = __filename;
  }
}
