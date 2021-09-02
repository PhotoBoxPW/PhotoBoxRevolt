import { VoltareClient, VoltareCommand } from 'voltare';

export default class ModulesCommand extends VoltareCommand {
  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'modules',
      aliases: ['mods'],
      description: 'Lists the modules loaded on the client.',
      category: 'Developer',
      userPermissions: ['voltare.elevated'],
      metadata: {
        examples: ['modules']
      }
    });

    this.filePath = __filename;
  }

  async run() {
    return `**Modules loaded:** \n${this.client.modules
      .map((mod) => {
        const depCount = mod.options.requires ? mod.options.requires.length : 0;
        // @ts-ignore
        const eventGroup = this.client.events.eventGroups.get(mod.options.name);
        return `- \`${mod.options.name}\`${
          mod.options.description ? `: ${mod.options.description}` : ''
        }\n  - ${depCount.toLocaleString()} deps, ${
          eventGroup ? Object.keys(eventGroup).length.toLocaleString() : 'no'
        } events`;
      })
      .join('\n')}`;
  }
}
