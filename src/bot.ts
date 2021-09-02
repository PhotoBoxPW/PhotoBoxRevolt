import { VoltareClient, BaseConfig } from 'voltare';
import config from 'config';
import path from 'path';
import WinstonModule from './modules/winston';
import MediaModule from './modules/media';
import ImgSrvModule from './modules/imgsrv';

export const PRODUCTION = process.env.NODE_ENV === 'production';

export interface PhotoBoxConfig extends BaseConfig {
  prefix: string | string[];
  mentionPrefix: boolean;

  logger: {
    level: string;
    inspectOptions?: any;
  };

  media: {
    lookBackLimit: number;
  };

  imgsrv: {
    url: string;
    key: string;
    interval: number;
    cacheTimeout: number;
    limit: number;
  };
}

export const client = new VoltareClient(config.get('voltare') as PhotoBoxConfig);

client.loadModules(WinstonModule, MediaModule, ImgSrvModule);
client.commands.registerDefaults(['eval', 'kill', 'exec', 'load', 'unload', 'reload']);
client.commands.registerFromFolder(path.join(config.get('commandsPath' as string)));

client.permissions.register('server.dbots', (object) => {
  if (object.message) return object.message.channel?.server_id === '01FE62ASTHZFMSTCBBVAK4TZE1';
  return false;
});

process.once('SIGINT', async () => {
  client.emit('logger', 'warn', 'sys', ['Caught SIGINT']);
  await client.disconnect();
  process.exit(0);
});

process.once('beforeExit', async () => {
  client.emit('logger', 'warn', 'sys', ['Exiting....']);
  await client.disconnect();
  process.exit(0);
});

process.on('unhandledRejection', (reason, p) => {
  client.emit('logger', 'error', 'sys', ['Unhandled rejection', reason, p]);
});

process.on('uncaughtException', async (err) => {
  client.emit('logger', 'error', 'sys', ['Uncaught exception', err]);
  await client.disconnect();
  process.exit(1);
});

export async function connect() {
  await client.connect();
  client.bot.users.edit({
    // @ts-ignore
    status: PRODUCTION
      ? { text: `pbox help (📷❓)`, presence: 'Online' }
      : { text: `DEVELOPER MODE / pbx help (📸❓)`, presence: 'Busy' }
  });
}

export async function disconnect() {
  await client.disconnect();
}
