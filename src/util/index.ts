import { CommandContext } from 'voltare';

interface FlagOption {
  shortFlag?: string;
  name: string;
  aliases?: string[];
  getsString?: boolean;
}

export const creditDescriptions: { [key: string]: string } = {
  blargbot: '[blargbot](https://blargbot.xyz/) by stupid cat',
  dankmemer: '[Dank Memer](https://dankmemer.lol/) by Melmsie',
  shitpost: 'A Random [Shitpost Bot 5000](https://www.shitpostbot.com/) Template',
  ks: '[Kitchen Sink](https://sink.discord.bot/) by Roadcrosser',
  switchblade: '[Switchblade](https://switchblade.xyz/) by Doges',
  korra: '[Korra](https://github.com/game-tv/korra) from weeb.sh'
};

export function readFlags(flags: FlagOption[], ctx: CommandContext) {
  const result: { [flag: string]: boolean | string } = {};
  const args: string[] = [];

  let assignTo: string | null = null;
  for (const arg of ctx.args) {
    const targ = arg.trim();

    // Match full names
    if (targ.startsWith('--') && !/\s/.test(targ)) {
      const flagName = targ.slice(2);
      const flag = flags.find(
        (f) =>
          f.name.toLowerCase() === flagName.toLowerCase() ||
          (f.aliases && f.aliases.find((al) => al.toLowerCase() === flagName.toLowerCase())) ||
          f.shortFlag === flagName
      );

      if (flag) result[flag.name] = true;
      if (flag?.getsString) assignTo = flag.name;
      continue;
    }

    // Match short names
    if (targ.startsWith('-') && !/\s/.test(targ)) {
      for (const shortFlag of targ.slice(1)) {
        const flag = flags.find((f) => f.shortFlag === shortFlag);
        if (flag) result[flag.name] = true;
        if (flag?.getsString) assignTo = flag.name;
      }
      continue;
    }

    // If the previous arg had an assign
    if (assignTo) {
      result[assignTo] = arg;
      assignTo = null;
      continue;
    }

    args.push(arg);
  }

  return { result, args };
}

export function randint(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
