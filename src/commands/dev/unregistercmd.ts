import { VoltareClient, VoltareCommand, CommandContext } from 'voltare';

export default class UnregisterCmdCommand extends VoltareCommand {
  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'unregistercmd',
      aliases: ['unregcmd'],
      description: 'Unregisters commands.',
      category: 'Developer',
      userPermissions: ['voltare.elevated'],
      metadata: {
        examples: ['unregistercmd ping'],
        usage: '<commandName> [commandName] ...'
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    if (!ctx.args.length) return 'Please define commands(s) you want to unload.';

    for (const arg of ctx.args) {
      if (!this.client.commands.commands.has(arg)) return `The command \`${arg}\` does not exist.`;
      this.client.commands.unregister(this.client.commands.commands.get(arg)!);
    }

    return `Unregistered ${ctx.args.length.toLocaleString()} command(s).`;
  }
}
