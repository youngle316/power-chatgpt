<div align="center">

<h1 align="center">Power Chat</h1>

A Power Tool For ChatGPT

![home](https://raw.githubusercontent.com/youngle316/picg/main/20230810143834.png)
</div>

[中文 README](./README-CN.md)

## Features ✨

- No login required, protects privacy, data stored locally in the browser.
- Responsive design, supports dark mode.
- Built-in prompt lists: [Chinese](https://github.com/PlexPt/awesome-chatgpt-prompts-zh) and [English](https://github.com/f/awesome-chatgpt-prompts).
- Multi-language support: (Chinese, English).
- Full Markdown support: LaTeX formulas, code highlighting, etc.
- Exportable as JSON files.
- Supports GPT-4, custom model parameters, API proxy support.
- Supports streaming responses.

## Development plan

- [x] Automatically compress context chat logs to save tokens while supporting long conversations.
  - Compression can lead to loss of context. It is recommended to save tokens by setting **context limit** in the model setting.
  - ![](https://raw.githubusercontent.com/youngle316/picg/main/202309041413821.png)
- [x] Allow users to customize prompts.
- [ ] Include built-in characters and make them available in new sessions.
- [ ] Share as an image or share via a ShareGPT link.
- [ ] Package the desktop application using Tauri.
- [ ] Support text-to-speech functionality.
- [ ] Support a plugin system.
- [ ] Support more models.

## Deployment

### Docker

#### Docker build & Run

```bash
docker build -t power-chatgpt .

docker run --name power-chatgpt --rm -it -p 127.0.0.1:3000:3000 power-chatgpt

# 运行地址
http://localhost:3000/
````

### local

```bash
pnpm install

npm run build

npm run start
```
