import { CommandContext, VoltareClient } from 'voltare';
import { GenerateCommand } from '../../../util/abstracts';
import { AchievementPayload } from '../../../modules/imgsrv/payload';
import { readFlags } from '../../../util';
import { oneLine, stripIndents } from 'common-tags';

// TODO set block ID

export default class AchievementCommand extends GenerateCommand {
  endpoint = 'achievement';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'achievement',
      description: 'Achievement get!',
      aliases: ['ach', 'challenge'],
      category: 'Image Generation - Text Template',
      metadata: {
        usage: '<text>',
        details: stripIndents`
          ${oneLine`
            Set the header text with the \`--header (h)\` flag along
            with the text you want to use.
          `}
          > Example: \`pbox achievement --header "Nice one!" Achievement text\`

          To use the challenge format, use \`--challenge (c)\`.
        `,
        specialArgs: true
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    const { result, args } = readFlags(
      [
        { name: 'header', shortFlag: 'h', getsString: true },
        { name: 'challenge', shortFlag: 'c' }
      ],
      ctx
    );

    const header: string | null = typeof result.header === 'string' ? result.header : null;
    const text = this.cleanContent(args.join(' ').trim(), ctx.message);
    if (!text) return 'This command requires some text!';

    const payload: AchievementPayload = { text };
    if (header) payload.header = header;
    if (result.challenge) payload.challenge = true;
    await this.generate(ctx, payload);
  }
}
