import { CommandContext, VoltareClient } from 'voltare';
import { GenerateCommand } from '../../../util/abstracts';
import { EliminatedPayload } from '../../../modules/imgsrv/payload';
import { readFlags } from '../../../util';
import { stripIndents } from 'common-tags';

export default class EliminatedCommand extends GenerateCommand {
  endpoint = 'eliminated';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'eliminated',
      description: 'dont main bastion',
      aliases: ['overwatch', 'ow', 'elim'],
      category: 'Image Generation - Text Template',
      metadata: {
        usage: '<text>',
        details: stripIndents`
          To use the 'eliminated by' format, use \`--elimby (e)\`.
          To remove the shadow, use \`--noshadow (s)\`.
        `,
        specialArgs: true
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    const { result, args } = readFlags(
      [
        { name: 'elimby', shortFlag: 'e' },
        { name: 'noshadow', shortFlag: 'n' }
      ],
      ctx
    );

    const text = this.cleanContent(args.join(' ').trim(), ctx.message);
    if (!text) return 'This command requires some text!';

    const payload: EliminatedPayload = { text };
    if (result.elimby) payload.elim_by = true;
    if (result.noshadow) payload.no_shadow = true;
    await this.generate(ctx, payload);
  }
}
