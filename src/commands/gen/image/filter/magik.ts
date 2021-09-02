import { CommandContext, VoltareClient } from 'voltare';
import { GenerateCommand } from '../../../../util/abstracts';
import { MagikPayload } from '../../../../modules/imgsrv/payload';
import { readFlags } from '../../../../util';
import { oneLine, stripIndents } from 'common-tags';

export default class MagikCommand extends GenerateCommand {
  endpoint = 'magik';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'magik',
      description: 'Better than art.',
      category: 'Image Generation - Filters',
      aliases: ['liquidrescale'],
      metadata: {
        usage: '[media]',
        details: stripIndents`
          ${oneLine`
            To set the multiplier, use the \`--mult (m)\` flag along
            with the amount you want to multiply.
          `}
          > Example: \`pbox magik --mult 5\`
        `,
        specialArgs: true,
        imageType: 'filter'
      },
      throttling: {
        usages: 1,
        duration: 20
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    const { result, args } = readFlags([{ name: 'mult', shortFlag: 'm', getsString: true }], ctx);

    let mult: number | null = typeof result.radius === 'string' ? parseInt(result.radius) : null;
    if (mult !== null && isNaN(mult)) mult = null;

    const media = await this.mediaModule.find(ctx.message, args[0]);
    const payload: MagikPayload = { image: media.url };

    if (mult) payload.mult = mult;
    await this.generate(ctx, payload);
  }
}
