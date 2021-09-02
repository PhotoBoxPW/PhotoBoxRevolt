import { VoltareClient } from 'voltare';
import { TextCommand } from '../../../util/abstracts';

export default class NutButtonCommand extends TextCommand {
  endpoint = 'nutbutton';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'nutbutton',
      description: 'NUT',
      aliases: ['nut', 'button', '🌰', ':chestnut:']
    });

    this.filePath = __filename;
  }
}
