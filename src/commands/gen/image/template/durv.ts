import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class DurvCommand extends ImageCommand {
  endpoint = 'durv';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'durv',
      description: 'Wanna join my free giftcard giveaway?',
      category: 'Image Generation - Image Template'
    });

    this.filePath = __filename;
  }
}
