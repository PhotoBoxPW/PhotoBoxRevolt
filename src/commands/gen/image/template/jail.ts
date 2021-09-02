import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class JailCommand extends ImageCommand {
  endpoint = 'jail';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'jail',
      description: 'Put something in jail.',
      category: 'Image Generation - Image Template',
      metadata: {
        credit: 'dankmemer'
      }
    });

    this.filePath = __filename;
  }
}
