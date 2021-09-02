import { CommandContext, VoltareClient } from 'voltare';
import { ColorPayload } from '../../modules/imgsrv/payload';
import { randint } from '../../util';
import { GenerateCommand } from '../../util/abstracts';

export default class ColorCommand extends GenerateCommand {
  endpoint = 'color';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'color',
      description: 'Display a color.',
      category: 'Image Generation - Other',
      aliases: ['colour'],
      metadata: {
        usage: '<color>'
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    let color = this.cleanContent(ctx.args.join(' ').trim(), ctx.message);
    if (!color) return "Define a color you want to show, or use 'random'!";
    if (color === 'random' || color === 'r') color = '#' + randint(0, 16777215).toString(16).padEnd(6, '0');
    const payload: ColorPayload = { color };
    await this.generate(ctx, payload);
  }
}
