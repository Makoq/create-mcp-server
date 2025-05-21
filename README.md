[![npm](https://img.shields.io/npm/v/create-ts-mcp-server.svg)](https://www.npmjs.com/package/create-ts-mcp-server)

# MCP Server Scaffolding Tool

A command - line tool for quickly creating standardized MCP (Model Context Protocol) servers using Node.js

## ✨Features
🛠️ Interactive Configuration 
- Provides a user 
- friendly command 
- line interactive interface
  
📦 Multi - level API Support 
- Supports both High 
- Level and Low 
- Level API development

⚡ Rapid Generation 
- Fast project generation based on a template engine

🔧 Intelligent Configuration 
- Automatically generates package.json and TypeScript configurations

## Quick Start
```bash
npx create-ts-mcp-server your-mcp-server-name
```



## 🚀 Usage Guide
### Create a Project
```bash

# by npx

npx create-ts-mcp-server your-server-name

```
### Initialization Steps of CLI 
```
# config your project name
? What is the name of your MCP (Model Context Protocol) server? (your-mcp-server-name)
# config your project description
? What is the description of your server? (A Model Context Protocol server)
# @modelcontextprotocol/sdk API level，High-Level upper layer encapsulation of simple and easy-to-use API (suitable for most simple scenarios, more recommended), Low-Level API for underlying detail processing is suitable for complex scenarios
? What is the API level of your server?
 High-Level use (Recommended): It is a commonly used and encapsulated interface for developers. It shields many complex details, is easy to use, and is suitable for most scenarios.
 Low-Level use: It is a low-level interface, which is suitable for developers who need to customize the implementation details. (Use arrow keys)
❯ High-Level API
  Low-Level API
# success message
✔ MCP server created successfully!

Next steps:
  cd your-mcp-server-name
  npm install
  npm run build  #  build your server first
  npm run inspector # debug your server
```


### Develope Command
```bash
cd your-server-name

npm install # install dependencies

npm run build # build project

npm run inspector # debug your server

```
### Directory Structure
The typical project structure generated is as follows:
```
your-server-name/
├── src/
│   ├── index.ts      # Service entry file
├── test/             
├── package.json
└── tsconfig.json
```
## 📚 API Level Explanation
### High-Level API
Use cases: Rapid development of standard services Features:

Pre-configured common middleware
Automatic error handling
Standardized routing configuration
Out-of-the-box RESTful support

Example:

```typescript
// Quickly create a service instance
server.tool(
  "calculate-bmi",
  {
    weightKg: z.number(),
    heightM: z.number()
  },
  async ({ weightKg, heightM }) => ({
    content: [{
      type: "text",
      text: String(weightKg / (heightM * heightM))
    }]
  })
);
```
### Low-Level API
Use cases: Scenarios requiring deep customization Features:

Full control over the request lifecycle
Manual management of the middleware chain
Custom protocol handling
Low-level performance optimization

Example:

```typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case "create_note": {
      const title = String(request.params.arguments?.title);
      const content = String(request.params.arguments?.content);
      if (!title || !content) {
        throw new Error("Title and content are required");
      }

      const id = String(Object.keys(notes).length + 1);
      notes[id] = { title, content };

      return {
        content: [{
          type: "text",
          text: `Created note ${id}: ${title}`
        }]
      };
    }

    default:
      throw new Error("Unknown tool");
  }
});
```

