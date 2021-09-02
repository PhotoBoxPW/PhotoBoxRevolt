import { VoltareClient } from 'voltare';
import { TextCommand } from '../../../util/abstracts';

export default class FactsCommand extends TextCommand {
  endpoint = 'facts';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'facts',
      description: 'OnlyFacts.',
      metadata: {
        credit: 'dankmemer'
      }
    });

    this.filePath = __filename;
  }
}
