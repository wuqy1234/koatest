const { getUerInfo } = require('../service/user.service')
const {
    userFormateError,
    userAlreadyExited,
    userRegisterError,
    userDoesNotExist,
    userLoginError,
    invalidPassword,
    tokenExpiredError,
    invalidToken,
    SensitiveWordserror
} = require('../constant/err.type')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')

const bcrypt = require('bcryptjs');


//判断用户信息是否为空
const userValidator = async (ctx, next) => {
    const { username, password } = ctx.request.body
    const headers = ctx.request.headers;
    console.log(JSON.stringify(headers, null, 2), 'kkkkkkkkkkkkkkkkk')
    // 合法性
    if (!username || !password) {
        console.error('用户名或密码为空', ctx.request.body)
        // 抛出给下方报错的地方
        ctx.app.emit('error', userFormateError, ctx)
        return
    }

    await next()
}
//判断用户是否存在
const verifyUser = async (ctx, next) => {
    const { username } = ctx.request.body

    // if (await getUerInfo({ user_name })) {
    //   ctx.app.emit('error', userAlreadyExited, ctx)
    //   return
    // }
    try {
        const res = await getUerInfo({ user_name: username })

        if (res) {
            console.error('用户名已经存在', { username })
            //ctx.app.emit('error', err, ctx),'error'是错误类型,err和ctx会传给app.on('error',( err, ctx)=>{})
            ctx.app.emit('error', userAlreadyExited, ctx)
            return
        }
    } catch (err) {
        console.error('获取用户信息错误', err)
        ctx.app.emit('error', userRegisterError, ctx)
        return
    }



    await next()
}
//给密码加密
const crpytPassword = async (ctx, next) => {
    const { password } = ctx.request.body

    const salt = bcrypt.genSaltSync(10)
    // hash保存的是 密文
    //即使密码是一样的,输出的hash都会不一样
    const hash = bcrypt.hashSync(password, salt)

    ctx.request.body.password = hash

    await next()
}


//验证登录,和这个verifyUser中间件差不多,查询数据库,解密密码,然后和前端传来的密码进行对比
const verifyLogin = async (ctx, next) => {
    // 1. 判断用户是否存在(不存在:报错)
    const { username, password } = ctx.request.body

    try {
        const res = await getUerInfo({ user_name: username })
        console.log(res, 'rrrrrrrrrrrrrrrrrrrr');
        if (!res) {
            console.error('用户名不存在', { username })
            ctx.app.emit('error', userDoesNotExist, ctx)
            return
        }

        // 2. 密码是否匹配(不匹配: 报错)
        //只要密码匹配,不管hash是否不一样, 都会返回true
        if (!bcrypt.compareSync(password, res.password)) {
            ctx.app.emit('error', invalidPassword, ctx)
            return
        }
    } catch (err) {
        console.error(err)
        return ctx.app.emit('error', userLoginError, ctx)
    }

    await next()
}

// 3. 验证通过, 放行,获得临时操作权限,当token过期了,就需要重新登录,重新生成token
const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    console.log(token)

    try {
        // user中包含了payload的信息(id, user_name, is_admin)
        //通过JWT_SECRET秘钥解析token, 获取负载信息,即加密进去的信息.
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    } catch (err) {
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token已过期', err)
                return ctx.app.emit('error', tokenExpiredError, ctx)
            case 'JsonWebTokenError':
                console.error('无效的token', err)
                return ctx.app.emit('error', invalidToken, ctx)
        }
    }

    await next()
}


const SensitiveWords = async (ctx, next) => {
    const { username } = ctx.request.body
    const sensitiveWords = ['敏感词1', '敏感词2']
    for (const word of sensitiveWords) {

        //用来判断一个字符串是否包含另一个字符串，并根据情况返回 `true` 或 `false`。
        // let sentence = 'Hello world, welcome to the universe.';
        // let word = 'world';
        // console.log(sentence.includes(word)); // 输出：true


        if (username.includes(word)) {
            ctx.app.emit('error', SensitiveWordserror, ctx)
            return
        }
    }
    await next()
}



const testdb = async (ctx, next) => {


    const { code } = ctx.request.body

    console.log(code, 'mmmmmmmmmmmmmmmmm');

    const axios = require('axios');

    const aa = await axios.post('http://api.weixin.qq.com/wxa/business/getuserphonenumber', {
        // openid: `${ctx.headers['x-wx-openid']}`, // 可以从请求的header中直接获取 req.headers['x-wx-openid']
        // version: 2,
        // scene: 2,
        // content: `${username}`
        code: `${code}`,
    })
    // .then(response => {

    //     console.log('检测成功,接口返回内容',response.data);//ctx.body=response.data
    //     return response.data;
    // })
    // .catch(error => {
    //     console.error('请求出错', error);
    // });
    console.log(aa.data, 'hhhhhhhhhhhhhhhhhhhhh')
    ctx.body = aa.data
    // Object.assign(ctx.body, aa.data)
}
module.exports = {
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin,
    auth,
    SensitiveWords,
    testdb,
}