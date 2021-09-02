import fs from 'fs';
import { VoltareClient, VoltareCommand, CommandContext } from 'voltare';

export default class ReregisterCmdCommand extends VoltareCommand {
  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'reregistercmd',
      aliases: ['reregcmd'],
      description: 'Reregisters commands.',
      category: 'Developer',
      userPermissions: ['voltare.elevated'],
      metadata: {
        examples: ['reregistercmd ping'],
        usage: '<commandName> [commandName] ...'
      }
    });

    this.filePath = __filename;
  }

  fileExists(path: string) {
    const stat = fs.lstatSync(path);
    return stat.isFile();
  }

  async run(ctx: CommandContext) {
    if (!ctx.args.length) return 'Please define commands(s) you want to reload.';

    for (const arg of ctx.args) {
      if (!this.client.commands.commands.has(arg)) return `The command \`${arg}\` does not exist.`;
      const command = this.client.commands.commands.get(arg)!;
      if (!command.filePath) return `The module \`${arg}\` does not have a file path defined.`;
      if (!this.fileExists(command.filePath)) return `The file for module \`${arg}\` no longer exists.`;
      this.client.commands.unregister(command);
      delete require.cache[require.resolve(command.filePath)];
      const newCommand = require(command.filePath);
      this.client.commands.register(newCommand);
    }

    return `Reregistered ${ctx.args.length.toLocaleString()} command(s).`;
  }
}
