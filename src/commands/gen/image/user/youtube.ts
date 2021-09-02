import { VoltareClient } from 'voltare';
import { UserCommand } from '../../../../util/abstracts';

export default class YouTubeCommand extends UserCommand {
  endpoint = 'youtube';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'youtube',
      description: 'Lovely YouTube comment section.',
      aliases: ['yt'],
      metadata: {
        credit: 'dankmemer'
      }
    });

    this.filePath = __filename;
  }
}
