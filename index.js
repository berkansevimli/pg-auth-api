import express from "express"
import postgresClient from "./config/db.js"

const app = express()
app.use(express.json())

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
