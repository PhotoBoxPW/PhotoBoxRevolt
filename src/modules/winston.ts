import { VoltareModule, VoltareClient, LoggerExtra } from 'voltare';
import winston, { format } from 'winston';
import dayjs from 'dayjs';
import chalk, { Chalk } from 'chalk';
import * as util from 'util';
import { PhotoBoxConfig } from '../bot';

export const PRODUCTION = process.env.NODE_ENV === 'production';

const levelColors: { [level: string]: Chalk } = {
  info: chalk.black.bgCyan,
  warn: chalk.black.bgYellow,
  error: chalk.black.bgRed,
  debug: chalk.magenta.bgBlack
};

const colorPool = [
  chalk.black.bgCyan,
  chalk.black.bgYellow,
  chalk.black.bgRed,
  chalk.black.bgGreen,
  chalk.black.bgBlue,
  chalk.black.bgMagenta,
  chalk.black.bgGrey,
  chalk.black.bgCyanBright,
  chalk.black.bgYellowBright,
  chalk.black.bgRedBright,
  chalk.black.bgGreenBright,
  chalk.black.bgBlueBright,
  chalk.black.bgMagentaBright,
  chalk.cyan.bgBlack,
  chalk.yellow.bgBlack,
  chalk.red.bgBlack,
  chalk.green.bgBlack,
  chalk.blue.bgBlack,
  chalk.magenta.bgBlack,
  chalk.grey.bgBlack,
  chalk.cyanBright.bgBlack,
  chalk.yellowBright.bgBlack,
  chalk.redBright.bgBlack,
  chalk.greenBright.bgBlack,
  chalk.blueBright.bgBlack,
  chalk.magentaBright.bgBlack
];

const moduleColors: { [level: string]: Chalk } = {
  voltare: chalk.black.bgCyan,
  revolt: chalk.black.bgRed,
  commands: chalk.black.bgYellow,
  sys: chalk.black.bgGray
};

export default class WinstonModule<T extends VoltareClient<PhotoBoxConfig>> extends VoltareModule<T> {
  constructor(client: T) {
    super(client, {
      name: 'winston',
      description: 'Colorful logging with the winston module'
    });

    this.client.logRevoltEvents();
    this.filePath = __filename;
  }

  load() {
    this.registerEvent('logger', this.onLog.bind(this));
  }

  unload() {
    this.unregisterAllEvents();
  }

  get config() {
    return this.client.config.logger;
  }

  private async onLog(_: unknown, level: string, moduleName: string, args: any[], extra?: LoggerExtra) {
    if (!winston.loggers.has(moduleName))
      winston.loggers.add(moduleName, {
        format: format.combine(
          format.printf((info) => {
            const lClk = levelColors[info.level] || chalk.yellow.bgBlack;
            const mClk = moduleColors[moduleName] || colorPool[this._hashCode(moduleName) % colorPool.length];
            return (
              mClk(` ${moduleName} `) +
              chalk.black.bgWhite(` ${dayjs().format('MM/DD HH:mm:ss')} `) +
              lClk(this._centrePad(info.level, 10)) +
              ` ${info.message}`
            );
          })
        ),
        transports: [
          new winston.transports.Console({
            level: this.config.level || (PRODUCTION ? 'info' : 'debug')
          })
        ]
      });

    const text = [];

    // Util formatting
    if (typeof args[0] === 'string') {
      const formats = args[0].match(/%[sdifjoO]/g);
      if (formats) {
        const a = args.splice(1, formats.length);
        text.push(util.format(args.shift(), ...a));
      } else text.push(chalk.white(args.shift()));
    }

    // Colorize the rest of the arguments
    for (const arg of args) {
      if (typeof arg === 'string') {
        text.push(chalk.magenta(`'${arg}'`));
      } else if (typeof arg === 'number') {
        text.push(chalk.cyan(arg.toString()));
      } else if (typeof arg === 'object') {
        text.push('\n');

        if (arg instanceof Error) {
          text.push(chalk.red(arg.stack));
        } else {
          text.push(util.inspect(arg, this.config.inspectOptions || {}));
        }
      } else text.push(arg);
    }

    winston.loggers.get(moduleName).log(level, text.join(' '), extra);
  }

  private _centrePad(text: string, length: number) {
    if (text.length < length)
      return (
        ' '.repeat(Math.floor((length - text.length) / 2)) +
        text +
        ' '.repeat(Math.ceil((length - text.length) / 2))
      );
    else return text;
  }

  private _hashCode(str: string) {
    var hash = 0,
      i,
      chr;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return hash;
  }
}
