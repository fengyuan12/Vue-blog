import koa from 'koa'
const app = new koa()
console.log('test 3')
app.listen(3000,()=>{
    console.log('node is not ok')
})