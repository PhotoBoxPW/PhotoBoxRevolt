import { CommandContext, VoltareClient } from 'voltare';
import needle from 'needle';
import { GeneralCommand } from '../../util/abstracts';

export default class IOTDCommand extends GeneralCommand {
  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'imageoftheday',
      description: "Get Bing's Image of the Day.",
      aliases: ['iotd'],
      category: 'Image API',
      userPermissions: ['revolt.channel.embedlinks']
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    try {
      ctx.channel.startTyping();
      const res = await needle(
        'get',
        'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US',
        { timeout: 5000 }
      );
      ctx.channel.stopTyping();
      if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
        const image = res.body.images[0];
        return `[Image Link](https://bing.com${image.url}) - [${image.copyright}](${image.copyrightlink})`;
      } else return `The service gave us a ${res.statusCode || 'bad error'}! Try again later!`;
    } catch (e) {
      ctx.channel.stopTyping();
      return "Seems like the URL doesn't exist! Contact support!";
    }
  }
}
