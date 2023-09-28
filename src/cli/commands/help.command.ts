import {Command} from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.log(`
        ${chalk.bold('Программа для подготовки данных для REST API сервера.')}
        ${chalk.bold('Пример:')}
            ${chalk.redBright('main.js')} ${chalk.yellow('--<command>')} ${chalk.green('[--arguments]')}
        ${chalk.bold('Команды:')}
            ${chalk.yellow('--version')}:                   # выводит номер версии
            ${chalk.yellow('--help')}:                      # печатает этот текст
            ${chalk.yellow('--import')} ${chalk.green('<path>')}:             # импортирует данные из TSV
            ${chalk.yellow('--generate')} ${chalk.green('<n> <path> <url>')}  # генерирует произвольное количество тестовых данных`);
  }
}
