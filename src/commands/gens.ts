import { stripIndents, oneLine } from 'common-tags';
import { CommandContext, VoltareClient, Util } from 'voltare';
import { GeneralCommand } from '../util/abstracts';

export default class GensCommand extends GeneralCommand {
  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'gens',
      description: 'Displays a list of image command categories.',
      category: 'General',
      metadata: {
        examples: ['gens', 'gens Watermark'],
        usage: '[category]',
        details: oneLine`
          The category may be a whole category name.
          If it isn't specified, all available image command categories will be listed.
        `
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    const prefix = ctx.prefix + (ctx.event.get('commands/spacedPrefix') ? ' ' : '');

    // Populate categories
    const categories: { [cat: string]: string[] } = {};
    const imageGenCats: [string, string[]][] = [];
    this.client.commands.commands.forEach((command) => {
      if (!command.category || !command.category.startsWith('Image Generation - ')) return;
      if (typeof command.hasPermission(ctx, ctx.event) === 'string') return;
      const commandName = command.name;
      if (categories[command.category]) categories[command.category].push(`\`${commandName}\``);
      else categories[command.category] = [`\`${commandName}\``];
    });
    Util.keyValueForEach(categories, (cat, cmdNames) => {
      imageGenCats.push([cat.split('Image Generation - ')[1], cmdNames]);
    });

    if (ctx.args.length) {
      const search = ctx.args.join(' ').toLowerCase();
      const category = imageGenCats.find(
        ([cat]) =>
          search === cat.toLowerCase() ||
          cat.toLowerCase().split(' ')[0] === search ||
          cat.toLowerCase().split('-')[0] === search
      );
      if (!category) return `I couldn't find any commands with \`${ctx.args[0]}\`!`;
      else {
        await ctx.reply(stripIndents`
          __**Image Generation - ${category[0]}**__
          ${category[1].join(', ')}

          Run "${prefix}help <command>" for more info on a command.
        `);
        return;
      }
    }

    await ctx.reply(stripIndents`
      __**Image Generation Categories**__
      ${imageGenCats
        .map(([cat, cmds]) => `- **${cat}**: ${cmds.length} command${cmds.length === 1 ? '' : 's'}`)
        .join('\n')}

      Run \`${prefix}gens <name>\` for a list of commands from a category.
    `);
  }
}
