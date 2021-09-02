import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class StudyingCommand extends ImageCommand {
  endpoint = 'studying';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'studying',
      description: "Yeah mom, I'm studying.",
      category: 'Image Generation - Image Template',
      aliases: ['study', 'yeahmom'],
      metadata: {
        credit: 'shitpost'
      }
    });

    this.filePath = __filename;
  }
}
