import { stripIndents, oneLine } from 'common-tags';
import { CommandContext, VoltareClient } from 'voltare';
import { GeneralCommand } from '../util/abstracts';
import ImgSrvModule from '../modules/imgsrv';

export default class PingCommand extends GeneralCommand {
  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'ping',
      aliases: ['🏓', ':ping_pong:'],
      description: "Checks the bot's ping and latency.",
      category: 'General',
      metadata: {
        examples: ['ping']
      },
      throttling: {
        usages: 5,
        duration: 10,
        bypass: ['voltare.elevated']
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    const timeBeforeMessage = Date.now();
    const pingMsg = await ctx.reply(':ping_pong: Pinging...');
    const timeAfterMessage = Date.now();
    const imgsrvPing = await this.pingImgSrv();
    await pingMsg.edit({
      content: stripIndents`
        :ping_pong: Pong!
        :envelope: The message took \`${(
          timeAfterMessage - timeBeforeMessage
        ).toLocaleString()}ms\` to be created.
        :clipboard: ${
          imgsrvPing
            ? oneLine`
                The image server took \`${Math.round(imgsrvPing[0])}ms\` to recieve the ping and
                \`${Math.round(imgsrvPing[1])}ms\` for PhotoBox get a response.`
            : 'The image server failed to be pinged!'
        }
      `
    });
  }

  async pingImgSrv() {
    const imgsrv = this.client.modules.get('imgsrv')! as ImgSrvModule;
    const timeBefore = Date.now();
    try {
      const response = await imgsrv.ping();
      const timeAfter = Date.now();
      const timeRecv = response.body.time * 1000;
      return [timeRecv - timeBefore, timeAfter - timeRecv];
    } catch (e) {
      return null;
    }
  }
}
