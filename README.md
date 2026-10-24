# QXAI介绍
## *发布页：https://qxai-agent.pages.dev/*
## *B站介绍视频：https://b23.tv/NQlNyjs*
<img width="342" height="463" alt="image" src="https://github.com/user-attachments/assets/22860698-03a0-486b-aa8d-7d0a4378a3cf" />
<img width="780" height="599" alt="image" src="https://github.com/user-attachments/assets/680b2e13-b631-432e-8a52-65a6cccbbc6e" />
# QxAI 鸣谢 / Acknowledgements

QxAI 能运行起来，依靠的是下面这些开源项目、开放规范与创作者素材。感谢所有作者与维护者。

> 说明：MCP 服务器是通过 `npx` 在**独立进程**中启动的外部程序，不随 QxAI 一起打包；它们各自的许可与隐私政策由对应项目负责。模型、动作素材有独立的授权条款，分发或商用前请阅读原文。

## 应用运行时与界面

| 项目 | 用途 | 许可 | 链接 |
| --- | --- | --- | --- |
| Electron | 桌面应用运行时（内含 Chromium 与 Node.js） | MIT | https://github.com/electron/electron |
| Chromium | Electron 使用的浏览器内核 | BSD 3-Clause 等 | https://www.chromium.org |
| Node.js | Electron 内置的 JavaScript 运行时 | MIT | https://nodejs.org |
| React / React DOM | 界面框架 | MIT | https://github.com/facebook/react |
| three.js | 3D 渲染 | MIT | https://github.com/mrdoob/three.js |
| GSAP / @gsap/react | 界面与窗口动效 | GSAP Standard License（免费使用，非 OSI 开源） | https://gsap.com/standard-license |
| @modelcontextprotocol/sdk | MCP 客户端与 stdio 传输 | MIT | https://github.com/modelcontextprotocol/typescript-sdk |
| react-markdown | 渲染模型返回的 Markdown | MIT | https://github.com/remarkjs/react-markdown |
| remark-gfm | Markdown 表格、任务列表等 GFM 语法 | MIT | https://github.com/remarkjs/remark-gfm |
| unified / remark / micromark 生态 | Markdown 解析（上述包的依赖） | MIT | https://github.com/remarkjs |

## 桌面宠物与 3D

| 项目 | 用途 | 许可 | 链接 |
| --- | --- | --- | --- |
| @pixiv/three-vrm-animation | 解析 VRMA、人形骨骼重定向 | MIT | https://github.com/pixiv/three-vrm |
| @pixiv/three-vrm-springbone | 头发/尾巴/缎带的弹簧骨骼算法参考 | MIT | https://github.com/pixiv/three-vrm |
| @pixiv/three-vrm-core | VRM 人形骨骼与元数据 | MIT | https://github.com/pixiv/three-vrm |
| lilToon（jp.lilxyzw.liltoon 2.4.1） | Unity 卡通着色与描边 | MIT | https://github.com/lilxyzw/lilToon |
| Unity 2022.3.62f3c1 | Unity WebGL 桌宠构建 | Unity 授权（专有，非开源） | https://unity.com |
| VRM / VRMA 规范 | 模型与动作格式 | VRM Consortium 规范 | https://vrm.dev |
| glTF 2.0 | VRM/VRMA 的底层容器格式 | Khronos 规范 | https://www.khronos.org/gltf |

QxAI 的 Unity 端头发弹簧（`QxaiSpringBones.cs`）参考了 three-vrm-springbone 的 Verlet 思路，用 C# 重新实现并按本模型调整了参数与稳定性限位。

## 工具集成（通过 MCP 启动的外部服务）

| 项目 | 用途 | 许可 | 链接 |
| --- | --- | --- | --- |
| Desktop Commander | 终端、文件、进程、文档处理（默认启用） | MIT | https://github.com/wonderwhy-er/DesktopCommanderMCP |
| baidu-search-mcp | 百度网页搜索与抓取（默认启用） | MIT | https://www.npmjs.com/package/baidu-search-mcp |
| duckduckgo-websearch | DuckDuckGo 搜索 | MIT | https://www.npmjs.com/package/duckduckgo-websearch |
| ddg-search-mcp | DuckDuckGo 搜索/新闻/图片/视频 | MIT | https://www.npmjs.com/package/ddg-search-mcp |
| @modelcontextprotocol/server-brave-search | Brave Search | MIT | https://github.com/modelcontextprotocol/servers |
| tavily-mcp | Tavily 搜索与抓取 | MIT | https://www.npmjs.com/package/tavily-mcp |
| exa-mcp-server | Exa 语义搜索 | MIT | https://www.npmjs.com/package/exa-mcp-server |
| @playwright/mcp（浏览器沙箱） | 无头浏览器操作 | Apache-2.0 | https://github.com/microsoft/playwright-mcp |
| Playwright | 浏览器自动化内核 | Apache-2.0 | https://github.com/microsoft/playwright |
| Model Context Protocol | MCP 协议与规范 | 开放规范；SDK 为 MIT | https://modelcontextprotocol.io |

## 开发与构建

| 项目 | 用途 | 许可 | 链接 |
| --- | --- | --- | --- |
| TypeScript | 类型系统与编译 | Apache-2.0 | https://github.com/microsoft/TypeScript |
| Vite | 开发服务器与打包 | MIT | https://github.com/vitejs/vite |
| Vitest | 单元/集成测试 | MIT | https://github.com/vitest-dev/vitest |
| electron-vite | Electron + Vite 构建 | MIT | https://github.com/alex8088/electron-vite |
| electron-builder | Windows 安装包与便携版 | MIT | https://github.com/electron-userland/electron-builder |
| @vitejs/plugin-react | React 的 Vite 插件 | MIT | https://github.com/vitejs/vite-plugin-react |

完整的传递依赖清单与版本锁定见仓库根目录的 `package-lock.json`；每个包的许可声明保留在 `node_modules/<包名>/LICENSE` 中。

## 特别感谢

- **@mukumi** 创作了 Kipfel，并允许在遵守模型条款的前提下用于桌宠。
- **notelm / Desktop Homunculus**、**Pixiv VRoid Project**、**dsh-plugin-vrmpet3d** 提供了可直接重定向的 VRMA 动作。
- **lilxyzw** 的 lilToon 让 Unity 端能还原 VRChat 风格的描边与卡通着色。
- **pixiv / three-vrm** 团队把 VRM 人形重定向与弹簧骨骼的实现开放出来，QxAI 的 three.js 端和 Unity 端都受益于此。
- **Anthropic** 与 MCP 社区提供了协议、SDK 以及本项目的默认工具生态。

如果你认为名单中遗漏了某个项目，或某处署名/许可需要更正，请提交 issue 或直接修改本文件。
