import { stripIndents, oneLine } from 'common-tags';
import { CommandContext, VoltareClient } from 'voltare';
import { keyValueForEach, splitMessage, truncate } from 'voltare/lib/util';
import { creditDescriptions, readFlags } from '../util';
import { GeneralCommand } from '../util/abstracts';

export default class HelpCommand extends GeneralCommand {
  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'help',
      description: 'Displays a list of available commands, or detailed information for a specified command.',
      category: 'General',
      aliases: ['❓', '❔', ':question:', ':grey_question:'],
      metadata: {
        examples: ['help', 'help ping'],
        usage: '[command]',
        details: oneLine`
          The command may be a whole command name.
          If it isn't specified, all available commands will be listed.
        `
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    const prefix = ctx.prefix + (ctx.event.get('commands/spacedPrefix') ? ' ' : '');
    const { result, args } = readFlags([{ name: 'unhide', shortFlag: 'H' }], ctx);

    if (args.length) {
      const commands = ctx.cmdsModule.find(ctx.args[0].toLowerCase(), ctx);
      if (!commands.length) return `I couldn't find any commands with \`${ctx.args[0]}\`!`;
      else {
        const command = commands[0];
        let text = stripIndents`
          # ${command.name}
          ${command.description || ''}

					Category | ${command.category}
          -:|:-
        `;

        // Aliases
        if (command.aliases.length !== 0) text += `\nAliases | ${command.aliases.join(', ')}`;

        // Usage
        if (command.metadata?.usage)
          text += `\nUsage | ${ctx.prefix} ${command.name} \`${command.metadata.usage}\``;

        // Examples
        if (command.metadata?.examples && command.metadata?.examples.length !== 0)
          text += `\nExamples | ${command.metadata.examples.map((e: string) => `\`${e}\``).join(', ')}`;

        // Credit
        if (command.metadata?.credit) text += `\nCredit | ${creditDescriptions[command.metadata.credit]}`;

        // Details
        if (command.metadata?.details) text += `\n\n${command.metadata.details}`;

        await ctx.reply(text);
        return;
      }
    }

    const prefixes: string[] = [];
    const configPrefixes = this.client.config.prefix;
    if (Array.isArray(configPrefixes)) prefixes.push(...configPrefixes);
    else prefixes.push(configPrefixes);

    // Display general help command
    const blocks: string[] = [];

    // Populate categories
    const categories: { [cat: string]: string[] } = {};
    const showHidden = !!result.unhide;
    this.client.commands.commands.forEach((command) => {
      if (
        typeof command.hasPermission(ctx, ctx.event) === 'string' ||
        (!showHidden && command.metadata?.hidden)
      )
        return;
      const commandName = command.name;
      const category = command.category || 'Uncategorized';
      if (categories[category]) categories[category].push(commandName);
      else categories[category] = [commandName];
    });

    const imageGenCats: [string, string[]][] = [];

    // List categories into fields

    // List categories into fields
    keyValueForEach(categories, (cat, cmdNames) => {
      if (cat.startsWith('Image Generation - ')) {
        imageGenCats.push([cat.split('Image Generation - ')[1], cmdNames]);
        return;
      }

      let cmds: string[] = [];
      let valueLength = 0;
      let fieldsPushed = 0;
      cmdNames.forEach((name: string) => {
        const length = name.length + 4;
        if (valueLength + length > 1800) {
          fieldsPushed++;
          blocks.push(stripIndents`
            ## ${truncate(cat, 200)} (${fieldsPushed})
            ${cmds.join(', ')}
          `);
          valueLength = 0;
          cmds = [];
        }

        cmds.push(`\`${name}\``);
        valueLength += length;
      });

      blocks.push(stripIndents`
        ## ${fieldsPushed ? `${truncate(cat, 200)} (${fieldsPushed + 1})` : truncate(cat, 256)}
        ${cmds.join(', ')}
      `);
    });

    if (imageGenCats.length)
      blocks.push(stripIndents`
        ## Image Generation
        ${imageGenCats
          .map(([cat, cmds]) => `**${cat}**: ${cmds.length} command${cmds.length === 1 ? '' : 's'}`)
          .join('\n')}
        ** **
        *View image generation categories with \`${prefix}gens <name>\`.*
      `);

    const messages = splitMessage(
      stripIndents`
        # **\`📷\` PhotoBox** by Snazzah
        **Prefixes:** ${prefixes.map((p) => `\`${p}\``).join(', ')}, <@${this.client.bot.user!._id}>
        ** **
        ${blocks.join('\n** **\n')}
        ** **
        Run \`${prefix}help <command>\` for more info on a command.
      `
    );
    if (messages.length === 1) return messages[0];
    try {
      const dm = await ctx.author.openDM();
      for (const content of messages) await dm.sendMessage(content);
      if (ctx.server) return 'Sent you a DM with information.';
    } catch (e) {
      return 'Unable to send you the help DM. You probably have DMs disabled.';
    }
  }
}
