import { VoltareClient } from 'voltare';
import { TextCommand } from '../../../util/abstracts';

export default class FirstWordsCommand extends TextCommand {
  endpoint = 'firstwords';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'firstwords',
      description: "He's about to say his first words!",
      aliases: ['fw']
    });

    this.filePath = __filename;
  }
}
