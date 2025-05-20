# MCP Server Scaffolding Tool

A command - line tool for quickly creating standardized MCP (Model Context Protocol) servers using Node.js

## Quick Start
```bash
npx @ad/create-mcp-server te your-mcp-server-name
```

## ✨Features
🛠️ Interactive Configuration - Provides a user - friendly command - line interactive interface
📦 Multi - level API Support - Supports both High - Level and Low - Level API development
⚡ Rapid Generation - Fast project generation based on a template engine
🔧 Intelligent Configuration - Automatically generates package.json and TypeScript configurations
🚀 Usage Guide
### Create a Project
```bash

# by npx

npx @ad/create-mcp-server your-server-name

# or by npm

npm install -g @ad/create-mcp-server

create-mcp-server your-server-name
```
### command
```bash
cd your-server-name

npm install # install dependencies

npm run build # build project

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

