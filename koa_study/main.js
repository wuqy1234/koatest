const app = require('./app/index')
const { APP_PORT } = require('./config/config.default')

//启动服务器页面

app.listen(APP_PORT, () => {
    console.log(`服务器运行在:"http://localhost:${APP_PORT}"`)
})


/**
 * 流程分析:
 * 1. 配置环境变量
 * 2. 启动服务器监听端口
 * 3. 挂载路由
 *   11.注册好路由,再挂中间件
 *     111.在路由中使用中间件,中间件中包含各种处理业务逻辑
 * 4.创建数据库连接
 *   11.映射数据库
 *    111.制作操作数据库的方法,增删改查
 *      1111.把方法导出给中间件使用
 * 5.分类一些数据,比如错误码,错误信息,成功码,成功信息,导出给中间件使用
 * 
 * 数据的导入导出,是为了把数据分门别类的整理好,方便管理和维护,提高效率
 * 
 */