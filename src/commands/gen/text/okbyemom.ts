import { VoltareClient } from 'voltare';
import { TextCommand } from '../../../util/abstracts';

export default class OkByeMomCommand extends TextCommand {
  endpoint = 'okbyemom';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'okbyemom',
      description: "She's just going to the store for a bit.",
      aliases: ['obm'],
      metadata: {
        credit: 'dankmemer'
      }
    });

    this.filePath = __filename;
  }
}
