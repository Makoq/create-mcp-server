# MCP 服务器脚手架工具

通过Node.js快速创建标准化MCP（Model Context Protocol）服务器的命令行工具

## 快速开始
```bash
npx @ad/create-mcp-server te your-mcp-server-name
```

## ✨ 功能特性
- 🛠️ 交互式配置 - 提供友好的命令行交互界面
- 📦 多层级API支持 - 同时支持High-Level和Low-Level API开发
- ⚡ 极速生成 - 基于模板引擎的快速项目生成
- 🔧 智能配置 - 自动生成package.json和TypeScript配置
## 🚀 使用指南
### 创建项目
```bash

# 通过npx直接创建

npx @ad/create-mcp-server your-server-name

# 或全局安装后使用

npm install -g @ad/create-mcp-server

create-mcp-server your-server-name
```
### 开发命令
```bash
cd your-server-name

npm install # 安装依赖

npm run build # 编译项目

npm run watch # 开发模式（监听文件变化）
```
### 目录结构
生成的典型项目结构：
```
your-server-name/
├── src/
│   ├── index.ts     # 服务入口文件
├── test/             # 测试用例
├── package.json
└── tsconfig.json
```
## 📚 API级别说明
### High-Level API
适用场景 ：快速开发标准服务 特点 ：

- 预置常用中间件
- 自动错误处理
- 标准化路由配置
- 开箱即用的RESTful支持
示例：

```typescript
// 快速创建服务实例
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
适用场景 ：需要深度定制的场景 特点 ：

- 完全控制请求生命周期
- 手动管理中间件链
- 自定义协议处理
- 底层性能优化
示例：

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

