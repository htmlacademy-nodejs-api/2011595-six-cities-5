#!/usr/bin/env node
import { CLIApplication, GenerateCommand, HelpCommand, VersionCommand } from './cli/index.js';
import { ImportCommand } from './cli/commands/import.command.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
// npm run mock:server
//npm run ts ./src/main.cli.ts -- --generate 100 ./mocks/test-data.tsv http://localhost:3123/api

//chmod u+x ./dist/main.cli.js
// npm run ts ./src/main.cli.ts -- --import <path-to-mock>
