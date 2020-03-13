const Koa = require("koa");
const Router = require("koa-router");
const koaBody = require("koa-body");
const mysql2 = require('mysql2');

let app = new Koa();
let router = new Router();


app.use(koaBody({
    multipart: true,
}))




const connection = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"Apply2015!",
    database:"todos"
})

router.get("/", ctx=>{
    ctx.redirect("/index")
})

router.post("/register", ctx=>{
    ctx.set("Access-Control-Allow-Origin","http://localhost:3000");
    
    // let [rows] = await connection.promise().query("INSERT INTO user(username, password) VALUES (?,?)", [user,pwd])
    // console.log(JSON.stringify(ctx.request.body))
    // console.log(username, password)
    console.log("got user info")
})

router.post("/login", async ctx=>{
    ctx.set("Access-Control-Allow-Origin","http://localhost:3000");
    // ctx.set('Content-Type', 'multipart/form-data')
    console.log(ctx.request.body)
    let user = ctx.request.body['username']
    let pwd = ctx.request.body['password']

    let [rows] = await connection.promise().query("SELECT * FROM user WHERE username=?", [user]);
    console.log([...rows])
    if(rows.length > 0){
        if (rows[0].password == pwd) {
            ctx.body = "correct";
        }else{
            ctx.body = "incorrect";
        }
    }
    else{
        ctx.body="not exist";
    }
    
    
})

app.use(router.routes());
app.listen(8787)