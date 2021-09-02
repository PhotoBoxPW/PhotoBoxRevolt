import { CommandContext, VoltareClient } from 'voltare';
import { GenerateCommand } from '../../../util/abstracts';
import { CitationPayload } from '../../../modules/imgsrv/payload';
import { readFlags } from '../../../util';
import { oneLine, stripIndents } from 'common-tags';

export default class CitationCommand extends GenerateCommand {
  endpoint = 'citation';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'citation',
      description: 'I love a good Papers Please reference.',
      aliases: ['papersplease'],
      category: 'Image Generation - Text Template',
      metadata: {
        usage: '<text>',
        details: stripIndents`
          ${oneLine`
            Set the header and footer text with the \`--header (h)\` flag
            and \`--footer (f)\` flag respectively along
            with the text you want to use.
          `}
          > Example: \`pbox citation --header "CITATION" --footer "PENALTY" Citation text\`
        `,
        credit: 'dankmemer',
        specialArgs: true
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    const { result, args } = readFlags(
      [
        { name: 'header', shortFlag: 'h', getsString: true },
        { name: 'footer', shortFlag: 'f', getsString: true }
      ],
      ctx
    );

    const header: string | null = typeof result.header === 'string' ? result.header : null;
    const footer: string | null = typeof result.footer === 'string' ? result.footer : null;
    const text = this.cleanContent(args.join(' ').trim(), ctx.message);
    if (!text) return 'This command requires some text!';

    const payload: CitationPayload = { text };
    if (header) payload.header = header;
    if (footer) payload.footer = footer;
    await this.generate(ctx, payload);
  }
}
