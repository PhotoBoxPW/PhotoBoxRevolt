import { CommandContext, VoltareClient } from 'voltare';
import { oneLine, stripIndents } from 'common-tags';
import { GenerateCommand } from '../../../../util/abstracts';
import { JPEGPayload } from '../../../../modules/imgsrv/payload';
import { readFlags } from '../../../../util';

export default class JPEGCommand extends GenerateCommand {
  endpoint = 'jpeg';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'jpeg',
      description: "I don't know what a JPEG is.",
      category: 'Image Generation - Filters',
      aliases: ['needsmorejpeg', 'morejpeg', 'jpg'],
      metadata: {
        usage: '[media]',
        details: stripIndents`
          ${oneLine`
            To set the quality, use the \`--quality (q)\` flag along
            with the quality you want to use.
          `}
          > Example: \`pbox jpeg --quality 5\`

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
        { name: 'quality', shortFlag: 'q', getsString: true },
        { name: 'gif', shortFlag: 'g' }
      ],
      ctx
    );

    let quality: number | null = typeof result.quality === 'string' ? parseInt(result.quality) : null;
    if (quality !== null && isNaN(quality)) quality = null;

    const media = await this.mediaModule.find(ctx.message, args[0]);
    const payload: JPEGPayload = { image: media.url };

    if (quality) payload.quality = quality;
    if (result.gif) payload.allow_gif = true;

    await this.generate(ctx, payload);
  }
}
