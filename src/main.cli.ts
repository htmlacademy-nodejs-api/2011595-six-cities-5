#!/usr/bin/env node
import { CLIApplication, HelpCommand, VersionCommand } from './cli/index.js';
import { ImportCommand } from './cli/commands/import.command.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([new HelpCommand(), new VersionCommand(), new ImportCommand()]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
