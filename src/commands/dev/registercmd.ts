import { VoltareClient, VoltareCommand, CommandContext } from 'voltare';
import path from 'path';

export default class RegisterCmdCommand extends VoltareCommand {
  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'registercmd',
      aliases: ['regcmd'],
      description: 'Registers commands.',
      category: 'Developer',
      userPermissions: ['voltare.elevated'],
      metadata: {
        examples: ['registercmd ./path/to/module ./path/to/another/module'],
        usage: '<path> [path] ...'
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    if (!ctx.args.length) return 'Please define command(s) you want to register.';

    for (const arg of ctx.args) {
      try {
        const command = require(path.join(process.cwd(), arg));
        this.client.commands.register(command);
      } catch (e) {
        if ((e as any).code === 'MODULE_NOT_FOUND') return `A command could not be found in \`${arg}\`.`;
        return `Error registering command from \`${arg}\`: \`${(e as any).toString()}\``;
      }
    }

    return `Registered ${ctx.args.length.toLocaleString()} command(s).`;
  }
}
