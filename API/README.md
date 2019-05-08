## seekmosca_api

`SeekMosca` 是一款发掘一些小众的户外旅行景点的产品，主要是记录一些未开发或者半开放的小众旅行景点，并且还有记录个人旅行足迹的功能，帮助他人了解和整理自己旅行脚步。

## 项目简介

项目为 `SeekMosca` 后端服务 `API` 接口项目，采用 `NodeJS` 进行开发。

```
框架：egg （基于koa2的node服务框架）
数据库：mysql
```

### 目录简介

```
seekmosca_api
├── package.json    （资源配置文件）
├── app
|   ├── router.js   (用于配置 URL 路由规则）
│   ├── controller  (用于解析用户的输入，处理后返回相应的结果)
│   ├── service     (用于编写业务逻辑层)
│   ├── middleware  (用于编写中间件)
│   ├── schedule    (用于定时任务)
│   ├── public      (用于放置静态资源)
│   ├── view        (用于放置模板文件)
│   ├── model       (用于放置领域模型)
│   └── extend      (用于框架的扩展)
├── config          (用于编写框架配置文件)
|   ├── plugin.js
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test            (编写测试用例)
```

### 开发

```bash
$ yarn dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```

### code码

```

```