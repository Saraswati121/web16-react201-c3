
const express= require("express")

const fs=require("fs")

const app=express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use((req,res,next)=>{
    if(!req.headers["apikey"]){
        return res.status(401).send("user not autoenticated")
    }
    next()
})

app.get("/",(req,res)=>{
    fs.readFile("./db.json","utf-8",(err,data)=>{
            res.end(data)
    })
})

app.post("/user/create",(req,res)=>{
    fs.readFile("./db.json","utf-8", (err,data)=>{
        const parsed=JSON.parse(data)
        console.log(req.body)
        parsed.list=[...parsed.list,req.body];

        let s= JSON.parse(data).list;
        s.map((e)=>{
            if(e.name !== req.body.name){
                fs.writeFile("./db.json",JSON.stringify(parsed),"utf-8",()=>{
                    res.status(201).send("created successfull");
                })
            }
        })
    })
})

app.get("/user/:id",(req,res)=>{
    const {id} = req.params;
fs.readFile("./db.json",{encoding:"utf-8"},(err,data)=>{
    let m=JSON.parse(data).list
    m.map((e)=>{
        if(e.id == id){
            res.send(e)
        }
    })
})

})



app.listen(8080,()=>{
    console.log("started")
})