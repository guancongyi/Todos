const Koa = require("koa");
const Router = require("koa-router");
const koaBody = require("koa-body");
const mysql2 = require('mysql2');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

let app = new Koa();
let router = new Router();


app.use(koaBody({
    multipart: true,
}))

const uri = "mongodb+srv://guan:Apply2015!@cluster0-kldaq.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

let EMPTYUSER = {
    "id": "",
    "password": "",
    "name":"",
    'isGoogle': false,
    'email': ""
}

const EMPTYLIST = {
    "name": "",
    "tasks": []
}

let TASK = {
    "name": "",
    "time": "",
    "date":"",
}

router.get("/", ctx => {
    ctx.redirect("/index")
})

router.post("/register", async ctx => {
    ctx.set("Access-Control-Allow-Origin", "http://localhost:3000");
    // console.log(ctx.request.body)

    let id = ctx.request.body['id'];
    let pwd = ctx.request.body['password'];
    let email = ctx.request.body['email'];
    const hash = await new Promise((resolve, reject) => {
        bcrypt.hash(pwd, 10, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })

    ctx.body = await new Promise((resolve, reject) => {
        client.connect(function (err, client, status) {
            let col = client.db('todos').collection('users');
            col.findOne({ "id": id }, function (err, doc) {
                if (doc == null) {
                    col.insertOne({ "id": id, "password": hash, 'isGoogle': false, 'email': email}, (err, result) => {
                        if (result.result.ok) {
                            // console.log(result)
                            resolve('ok')
                        }
                        resolve("wrong")
                    })
                } else {
                    resolve('exist')
                }

            })

        });

    })

})

router.post("/login", async ctx => {
    ctx.set("Access-Control-Allow-Origin", "http://localhost:3000");
    // ctx.set('Content-Type', 'multipart/form-data')
    // console.log(ctx.request.body)

    let isGoogle = (ctx.request.body['isGoogle'] === 'true');
    // console.log(typeof (isGoogle))
    if (isGoogle) {
        let id = ctx.request.body['id'];
        let name = ctx.request.body['name'];
        let email = ctx.request.body['email'];

        console.log(name)
        ctx.body = await new Promise((resolve, reject) => {
            client.connect(function (err, client) {
                let col = client.db('todos').collection('users');
                col.findOne({ "id": id }, function (err, doc) {
                    if (doc == null) {
                        col.insertOne({ "id": id, "name": name, 'isGoogle': isGoogle, 'email': email }, (err, result) => {
                            if (result.result.ok) {
                                // console.log(result)
                                resolve('ok')
                            }
                            resolve("wrong")
                        })
                    } else {
                        resolve('exist')
                    }

                })

            });
        })
    } else {
        let id = ctx.request.body['id'];
        let pwd = ctx.request.body['password'];

        ctx.body = await new Promise((resolve, reject) => {
            client.connect(function (err, client) {
                let col = client.db('todos').collection('users');
                col.findOne({ "id": id }, function (err, doc) {
                    bcrypt.compare(pwd, doc.password, function (err, res) {
                        if (res == true) {
                            resolve('ok')
                        } else {
                            client.close();
                            resolve("wrong")
                        }
                    })
                });
            });
        })
    }
})


router.get('/getLists', async ctx => {
    ctx.set("Access-Control-Allow-Origin", "http://localhost:3000");
    let uid = ctx.request.query['uid'];

    ctx.body = await new Promise((resolve, reject) => {
        client.connect(function (err, client, status) {
            let col = client.db('todos').collection('data');
            col.findOne({ "uid": uid }, function (err, doc) {
                if (doc == null) { // first time user
                    let list = JSON.parse(JSON.stringify(EMPTYLIST));;
                    list.name = "all tasks"

                    col.insertOne({'uid': uid, 'lists':list}, (err, result) => {
                        if (result.result.ok) {
                            resolve(list)
                        }
                        resolve("wrong")
                    })
                } else { // user has lists already
                    console.log(doc)
                    resolve(doc.lists)
                }

            })

        });

    })
})

app.use(router.routes());
app.listen(8787)