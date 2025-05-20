#!/usr/bin/env node
import chalk from "chalk";
import path from "path";
import inquirer from "inquirer";
import ora from "ora";
import fs from "fs";
import ejs from "ejs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export async function createServer(directory: string, options: any = {}) {
  
  // Check if directory already exists
  if (fs.existsSync(directory)) {
    console.log(chalk.red(`Error: Directory '${directory}' already exists.`));
    // Exit when directory already exists
    process.exit(1);
  }
  // Prompt user for server name, description, and API level
  const questions = [
    {
      type: "input",
      name: "name",
      message: "What is the name of your MCP (Model Context Protocol) server?",
      default: path.basename(directory),
      when: !options.name,
    },
    {
      type: "input",
      name: "description",
      message: "What is the description of your server?",
      default: "A Model Context Protocol server",
      when: !options.description,
    },
    {
      type: "list",
      name: "level",
      message: "What is the API level of your server?\n High-Level use (Recommended): It is a commonly used and encapsulated interface for developers. It shields many complex details, is easy to use, and is suitable for most scenarios.\n Low-Level use: It is a low-level interface, which is suitable for developers who need to customize the implementation details.",
      choices:[
        "High-Level API",
        "Low-Level API"
      ],
      when: !options.level,
    },
  ];

  const answers = await inquirer.prompt(questions);
  const config = {
    name: options.name || answers.name,
    description: options.description || answers.description,
    level: options.level || answers.level,
  };
  const spinner = ora("Creating MCP server...").start();

  try {
    fs.mkdirSync(directory);
    const templateDir = path.join(__dirname, "../../template");
    const files = fs.readdirSync(templateDir, { recursive: true });
    
    for (const file of files) {
      const sourcePath = path.join(templateDir, file as string);
      const stats = fs.statSync(sourcePath);
      if (!stats.isFile()) continue;
      
      const targetPath = path.join(
        directory,
        (file as string).startsWith("dotfile-")
          ? `.${(file.slice(8) as string).replace(".ejs", "")}`
          : (file as string).replace(".ejs", "")
      );
      const targetDir = path.dirname(targetPath);
      // Create subdirectories if needed
      fs.mkdirSync(targetDir, { recursive: true });
      // Read and process template file
      let content = fs.readFileSync(sourcePath, "utf-8");

      // Use EJS to render the template
      content = ejs.render(content, config);

      // Write processed file
      if(file.includes(".ejs")){
        if(config.level === "Low-Level API"&& file.includes("high.ts.ejs")){
          continue;
        };
        if(config.level === "High-Level API"&& file.includes("low.ts.ejs")){
          continue;
        }
      }
      fs.writeFileSync(targetPath, content);

      if(file.includes("high")||file.includes("low")){
        fs.renameSync(targetPath,targetPath.replace(/(high|low)/,"index"))
      }
    }

    spinner.succeed(chalk.green("MCP server created successfully!"));

    // Print next steps
    console.log("\nNext steps:");
    console.log(chalk.cyan(`  cd ${directory}`));
    console.log(chalk.cyan("  npm install"));
    console.log(
      chalk.cyan(`  npm run build  ${chalk.reset("# or: npm run watch")}`)
    );
    console.log(
      chalk.cyan(
        `  npm link       ${chalk.reset(
          "# optional, to make available globally"
        )}\n`
      )
    );
  } catch (e) {
    // spinner.fail(chalk.red("Failed to create MCP server"));
    console.log(e);
    process.exit(1);
  }
}
