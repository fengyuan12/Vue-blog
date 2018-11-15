//首先连接MySQL数据库
//封装一个query方法，方便我们进行MySQL语句的执行
import mysql from 'mysql'
import { db,dbName } from '../config'
import fs from 'fs'
import path from 'path'
const sqlContent = fs.readFileSync(path.resolve(__dirname,'..','./sql/fengyuan_db.sql'),'utf-8')
let pool
//第一次连接数据库的时候，没有指定数据库名称，这次连接的目的是为了能够创建一个fengyuan_blog数据库
//并且将数据库文件执行，执行完毕后fengyuan_blog数据库就有对应的表和数据了
const init = mysql.createConnection(db)
init.connect()
//判断如果数据库存在了，则不需要执行下面的代码
init.query('CREATE DATABASE fengyuan_blog',err=>{
    Object.assign(db,dbName)//合并成db一个对象
    //第二次连接数据库，这时候，数据库fengyuan_blog已经创建成功了，这时候，直接连接fengyuan_blog数据库
    //然后执行sql文件夹下的fengyuan_blog
    pool = mysql.createPool(db)
    if(err){
        console.log('fengyuan_blog database created already')
    }else{
        query(sqlContent).then(res=>{
            console.log('import sql is success')
        }).catch(err=>{
            console.log(err)
        })
    }
})
init.end()
//错误的
// export default function query(sql,values){
//     return new Promise((resolve,reject)=>{
//         pool.getConnection(function(err,collection){
//             if(err){
//                 reject(err);
//             }else{
//                 collection.query(sql,values,(err,data)=>{
//                     if(err){
//                         reject(err);
//                     }else{
//                         resolve(data);
//                     }
//                 })
//             }
//         })
//     })
// }
//修复后的
export default function query(sql,values){
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
            }else{
                connection.query(sql,values,(err,data)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(data);
                    }
                    connection.release()
                })
            }
        })
    })
}

