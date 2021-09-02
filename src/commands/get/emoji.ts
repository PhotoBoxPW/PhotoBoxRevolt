import { CommandContext, VoltareClient } from 'voltare';
import emojilib from 'emojilib';
import { GeneralCommand } from '../../util/abstracts';
import { stripIndents } from 'common-tags';

export interface ParseEmojiResult {
  url: string;
  raw: string;
  name: string;
  names: string[];
}

export default class EmojiCommand extends GeneralCommand {
  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'emoji',
      description: 'Gets the image link of an emoji.',
      category: 'General',
      aliases: ['em'],
      metadata: {
        examples: ['em 😃', 'em :smiley:'],
        usage: '<emoji>'
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    if (!ctx.args[0]) return 'This command requires an emoji!';

    const emoji = this.parseEmoji(ctx.args[0]);
    if (!emoji) return 'An invalid emoji was given!';

    return stripIndents`
      ## ${emoji.raw} ${emoji.name}
      ##### ${emoji.names.map((e) => `\`${e}\``).join(', ')}
      [Image Link](${emoji.url})
    `;
  }

  parseEmoji(str: string): ParseEmojiResult | null {
    const emojiMatches = Object.keys(emojilib)
      .filter(
        (emoji) =>
          str.startsWith(emoji) ||
          (emojilib[emoji as keyof typeof emojilib] as string[]).map((n) => `:${n}:`).includes(str)
      )
      .sort((a, b) => a.length - b.length)
      .reverse();
    if (emojiMatches.length) {
      const rawEmoji = emojiMatches[0];
      const names = (emojilib as any)[rawEmoji] as string[];
      const name = names.slice(0, 1)[0];
      const codepoint = this.mediaModule.toCodePoint(rawEmoji);

      return {
        name,
        names: names.slice(1),
        url: `https://twemoji.maxcdn.com/v/latest/72x72/${codepoint}.png`,
        raw: rawEmoji
      };
    }

    return null;
  }
}
