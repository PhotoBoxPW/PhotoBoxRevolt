import { CommandContext, VoltareClient } from 'voltare';
import { oneLine, stripIndents } from 'common-tags';
import { GenerateCommand } from '../../../../util/abstracts';
import { BlurPayload } from '../../../../modules/imgsrv/payload';
import { readFlags } from '../../../../util';

export default class BlurCommand extends GenerateCommand {
  endpoint = 'blur';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'blur',
      description: 'Blur an image.',
      category: 'Image Generation - Filters',
      metadata: {
        usage: '[media]',
        details: stripIndents`
          ${oneLine`
            To set the blur radius, use the \`--blur (b)\` flag along
            with the amount you want to use.
          `}
          > Example: \`pbox blur --radius 5\`

          This command supports GIFs, enable with \`--gif (g)\`.
        `,
        specialArgs: true,
        imageType: 'filter'
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    const { result, args } = readFlags(
      [
        { name: 'radius', shortFlag: 'r', getsString: true },
        { name: 'gif', shortFlag: 'g' }
      ],
      ctx
    );

    let radius: number | null = typeof result.radius === 'string' ? parseInt(result.radius) : null;
    if (radius !== null && isNaN(radius)) radius = null;

    const media = await this.mediaModule.find(ctx.message, args[0]);
    const payload: BlurPayload = { image: media.url };

    if (radius) payload.radius = radius;
    if (result.gif) payload.allow_gif = true;

    await this.generate(ctx, payload);
  }
}
