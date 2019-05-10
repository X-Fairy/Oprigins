//vue_server_00/app.js
//1:复制服务器端模块
//2:引入第三方模块
//  mysql/express/
const mysql = require("mysql");
const express = require("express");
const session=require("express-session");
//3:创建连接池
const pool = mysql.createPool({
  host:"127.0.0.1",
  user:"root",
  password:"",
  database:"origins"
});
//4:创建express对象
var server = express(); 
//配置session

//app.js 录一段跨域配置
const cors = require("cors");
server.use(cors({
   origin:["http://127.0.0.1:8080",
   "http://localhost:8080","http://127.0.0.1:4200"],
   credentials:true
}))
server.use(session({
  secret:"128位字符串",//配置密钥
  resave:false,//每次请求是否更新数据
  // resvae:true, //添加路由修改值,
  saveUninitialized:true//保存初始化数据
}))
//5:绑定监听端口 3000
server.listen(3000);
//5.1:指定静态目录.保存图片资源
//    项目中所有图片都需要保存在服务器端
//    重启动服务器 
server.use(express.static("public"));
//商品
server.get("/product",(req,res)=>{
  pool.query("SELECT * FROM origin_product",(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send(result);
    }
  })
})
//6:处理用户登录请求
server.get("/login",(req,res)=>{
  //6.1:获取参数
  var phone = req.query.phone;
  var upwd = req.query.upwd;
  //6.2:创sql
  var sql = "SELECT uid FROM 3songsu_user";
  sql+=" WHERE phone = ? AND upwd=?";
  //6.3:执行sql
  pool.query(sql,[phone,upwd],(err,result)=>{
     if(err)throw err;
     //6.4:获取返回结果
     //6.5:判断结果返回 登录成功或者失败
     if(result.length==0){
       res.send({code:-1,msg:"用户名或密码有误"});
     }else{
       //将用户登录成功凭据保存在session对象中
       //-获取uid
       var uid=result[0].uid;
       //-保存session对象中
       req.session.uid=uid;
       res.send({code:1,msg:result})
     }
  });
});     
server.get("/user",(req,res)=>{
  var uid=req.session.uid;
  if(!uid){
    res.send({code:-1,msg:"请登录"});//停止程序执行
    return;
  }
  pool.query("SELECT * FROM 3songsu_user WHERE uid=?",[uid],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
       //将用户登录成功凭据保存在session对象中
       //-获取uid
       var uid=result[0].uid;
       //-保存session对象中
       req.session.uid=uid;
      //  console.log(req.session.uid);
      res.send({code:1,msg:result});
    }else{
      res.send({code:-1,msg:result});
    }
  });
})

//商品详情
server.get("/details",(req,res)=>{
  var lid=req.query.lid;
  pool.query("SELECT * FROM origin_product WHERE lid=?",[lid],(err,result)=>{
    if(err) throw err;
    res.send({code:200,data:result});
  })
})

//查询购物车列表
server.get("/getCart",(req,res)=>{
  //获取session uid
  var uid = req.session.uid;
  // console.log(uid);
  //如果没有登录凭据
  if(!uid){
    res.send({code:-1,msg:"请登录",data:[]});//停止程序执行
    return;
  }  
  pool.query("SELECT lid,title,price,pic,count FROM 3songsu_shopcar WHERE uid=?",[uid],(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})
//删除购物车
server.get("/delCart",(req,res)=>{
  var lid=req.query.lid;
  pool.query("DELETE FROM 3songsu_shopcar WHERE lid=?",[lid],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"})
    }else{
      res.send({code:-1,msg:"商品不存在"});
    }
  })
})
//删除购物车中多个商品
server.get("/dels",(req,res)=>{
  var ids=req.query.ids;
  pool.query("DELETE FROM 3songsu_shopcar WHERE lid IN ("+ids+")",(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:200,msg:'删除成功'})
    }else{
      res.send({code:401,msg:'删除失败'})
    }
  })
})
//功能九:将商品添加至购物车
server.get("/addcart",(req,res)=>{
  
  //1:参数 lid count uid price
  var lid = parseInt(req.query.lid);
  var price =req.query.price;
  var pic=req.query.pic;
  var subtitle=req.query.subtitle;
  var count=1;
  // console.log(lid,price,pic,title,count,uid);
  var sql =" SELECT pid FROM origin_shopCar";
      sql+=" WHERE lid = ?";
  pool.query(sql,[lid],(err,result)=>{
    if(err)throw err;
    // console.log(result);
    if(result.length==0){
     var sql = ` INSERT INTO origin_shopCar`;
     sql+=` VALUES(null,'${pic}','${subtitle}','${price}',${count},${lid})`;
    }else{
      var sql = ` UPDATE origin_shopCar`;
      sql+=` SET count=count+1 WHERE lid=${lid}`;
    }
    pool.query(sql,(err,result)=>{
      if(err)throw err;
      if(result.affectedRows > 0){
        res.send({code:1,msg:"添加成功"});
      }else{
        res.send({code:-1,msg:"添加失败"});
      }
    })
  })
  //5:JSON
})
 