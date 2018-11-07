import koa from 'koa'
import cors from'koa-cors'
import bodyParser from 'koa-bodyparser'
//路由文件
import router from './routes/index'
//引入数据库文件
import query from './utils/query'

const app = new koa()
app.use(cors())
app.use(bodyParser())
app.use(router.routes())

app.listen(3000,()=>{
    console.log('node is ok')
})