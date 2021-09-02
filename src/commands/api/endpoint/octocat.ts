import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class OctocatCommand extends PictureEndpointCommand {
  url = 'https://hi.snaz.in/api/v1/octodex/random.json';
  credit = 'hi.snaz.in & octodex.github.com';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'octocat',
      description: 'Get a random GitHub octocat.'
    });

    this.filePath = __filename;
  }
}
