<div align="center">

<h1 align="center">Power Chat</h1>

A Power Tool For ChatGPT

![home](https://raw.githubusercontent.com/youngle316/picg/main/20230810143834.png)
</div>

## 功能 ✨

- 无需登录，保护隐私，数据存储在浏览器本地
- 响应式设计，支持深色模式
- 内置 Prompt 列表：[中文](https://github.com/PlexPt/awesome-chatgpt-prompts-zh) 和 [英文](https://github.com/f/awesome-chatgpt-prompts)
- 多国语言支持：（中文、英文）
- 完整的 Markdown 支持：LaTex 公式、代码高亮等等
- 支持导出为 JSON 文件
- 支持 GPT-4，自定义模型参数，支持 API 代理
- 支持流式响应

## 开发计划

- [x] 自动压缩上下文聊天记录，节省 Token 的同时支持超长对话
  - 压缩会导致上下文丢失，推荐在模型设置中通过设置 **上下文限制** 来节省 Token
  - ![](https://raw.githubusercontent.com/youngle316/picg/main/202309041411448.png)
- [x] 允许用户自定义 Prompt
- [ ] 内置 Character，并在新建会话内置
- [ ] 分享为图片，分享到 ShareGPT 链接
- [ ] 使用 tauri 打包桌面应用
- [ ] 支持文本转语音
- [ ] 支持插件系统
- [ ] 支持更多其他模型

## 部署

### Docker

#### Docker build & Run

```bash
docker build -t power-chatgpt .

docker run --name power-chatgpt --rm -it -p 127.0.0.1:3000:3000 power-chatgpt

# 运行地址
http://localhost:3000/
```

### local

```bash
pnpm install

npm run build

npm run start
```
