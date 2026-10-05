# timeline-maker-web

**单文件离线时间线页面生成器**：给定一组「日期 + 分组 + 事件」，自动按日期升序排序、按分组归类，渲染成一个带分组的项目里程碑时间线。内置示例数据，双击 `index.html` 即可打开。配套 `test.js` 用 Node 断言校验排序与分组。

## 功能简介

- 自动按日期**升序排序**事件。
- 按 `group` 字段**分组**，组内保持日期升序。
- 每个分组一个小标题，事件成行展示日期 + 描述。
- 完全离线，无外部依赖。

## 快速开始

```bash
open index.html
node test.js
```

输出形如：

```
PASS: 事件总数 = 5
PASS: 排序后最早事件为 2026-03-10
PASS: 分组数 = 3（立项/开发/上线）
全部断言通过
```

## 如何替换数据

编辑 `index.html` 里 `<script id="timeline-data" type="application/json">` 块，格式为：

```json
[{"date": "2026-01-01", "group": "阶段A", "text": "事件描述"}]
```

## 目录说明

```
timeline-maker-web/
├── index.html   # 单文件时间线
├── test.js      # Node 断言（排序 + 分组）
├── README.md
├── LICENSE
└── .gitignore
```

## License

MIT License，Copyright (c) 2026 ljiang9。
