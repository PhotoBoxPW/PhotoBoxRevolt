import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class PetPetCommand extends ImageCommand {
  endpoint = 'petpet';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'petpet',
      description: 'Pet a pet.',
      category: 'Image Generation - GIFs'
    });

    this.filePath = __filename;
  }
}
