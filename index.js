import express from "express"
import postgresClient from "./config/db.js"
import userRouter from "./routers/user_router.js"

const app = express()
app.use(express.json())

app.use("/users", userRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
    postgresClient.connect(err=>{
        if(err){
            console.log("Connection error!", err.stack)
        }
        else{
            console.log("Connected to database")
        }
    })
})
