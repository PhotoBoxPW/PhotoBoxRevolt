import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class BolsonaroCommand extends ImageCommand {
  endpoint = 'bolsonaro';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'bolsonaro',
      description: 'Jair Messias Bolsonaro is watching something...',
      category: 'Image Generation - Image Template',
      aliases: ['bonoro']
    });

    this.filePath = __filename;
  }
}
