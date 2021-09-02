import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class ScreamingBabyCommand extends ImageCommand {
  endpoint = 'screamingbaby';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'screamingbaby',
      description: 'Stop feeding the rabbit!',
      category: 'Image Generation - Image Template',
      aliases: ['wreckitralph', 'wir']
    });

    this.filePath = __filename;
  }
}
