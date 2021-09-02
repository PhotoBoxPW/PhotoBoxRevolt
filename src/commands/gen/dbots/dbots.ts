import { oneLine } from 'common-tags';
import { VoltareClient, CommandContext } from 'voltare';
import { DbotsPayload } from '../../../modules/imgsrv/payload';
import { readFlags } from '../../../util';
import { GenerateCommand } from '../../../util/abstracts';

export default class DBotsCommand extends GenerateCommand {
  endpoint = 'dbots';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'dbots',
      description: 'Make a banner.',
      category: 'Image Generation - Image Template',
      // userPermissions: ['discord.attachfiles', 'guild.dbots'],
      userPermissions: ['server.dbots'],
      metadata: {
        usage: '[media]',
        details: oneLine`
          You can remove the overlay (for resizing and fitting) with \`--nooverlay (o)\`
        `,
        specialArgs: true,
        imageType: 'image'
      },
      throttling: {
        usages: 1,
        duration: 20
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    const { result, args } = readFlags([{ name: 'nooverlay', shortFlag: 'o' }], ctx);

    let mult: number | null = typeof result.radius === 'string' ? parseInt(result.radius) : null;
    if (mult !== null && isNaN(mult)) mult = null;

    const media = await this.mediaModule.find(ctx.message, args[0]);
    const payload: DbotsPayload = { image: media.url };

    if (result.nooverlay) payload.no_overlay = true;
    await this.generate(ctx, payload);
  }
}
