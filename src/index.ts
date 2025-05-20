#!/usr/bin/env node
import { Command } from "commander";
import {createServer} from './utils/createServer.js'

const program = new Command()
    .name("create-mcp-server")
    .description("Create a new MCP server")
    .argument("<directory>", "Directory to create the server in")
    .option("-n, --name <name>", "Name of the server")
    .option("-d, --description <description>", "Description of the server")
    .option("-lv, --level <level>", "API level of the server")
    .action(createServer);

program.parse();
