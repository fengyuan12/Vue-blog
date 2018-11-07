import koa from 'koa'
const app = new koa()
console.log('test 2')
app.listen(3000,()=>{
    console.log('node is ok')
})