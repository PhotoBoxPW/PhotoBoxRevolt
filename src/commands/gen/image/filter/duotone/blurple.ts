import { stripIndents } from 'common-tags';
import { CommandContext, VoltareClient } from 'voltare';
import { BlurplePayload } from '../../../../../modules/imgsrv/payload';
import { readFlags } from '../../../../../util';
import { GenerateCommand } from '../../../../../util/abstracts';

export default class BlurpleCommand extends GenerateCommand {
  endpoint = 'blurple';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'blurple',
      description: 'Blurpify things!',
      category: 'Image Generation - Duotone Filters',
      aliases: ['blurpify'],
      metadata: {
        usage: '[media]',
        details: stripIndents`
          This command supports GIFs, enable with \`--gif (g)\`.
          Use \`--new (n)\` to use the new blurple color.
        `,
        imageType: 'filter'
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    const { result, args } = readFlags(
      [
        { name: 'gif', shortFlag: 'g' },
        { name: 'new', shortFlag: 'n' }
      ],
      ctx
    );

    const media = await this.mediaModule.find(ctx.message, args[0]);
    const payload: BlurplePayload = { image: media.url };

    if (result.new) payload.new_color = true;
    if (result.gif) payload.allow_gif = true;

    await this.generate(ctx, payload);
  }
}
