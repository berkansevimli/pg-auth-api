import express from "express"
import postgresClient from "../config/db.js"

const router = express.Router()


//CREATE USERS
router.post("/create",async (req, res) => {
    try {
        const text = "INSERT INTO users (username,email, password) VALUES ($1, $2, crypt($3, gen_salt('bf'))) RETURNING *"
        const values = [req.body.username, req.body.email, req.body.password]
        const { rows } = await postgresClient.query(text, values)
        return res.status(201).json({'createdUser': rows[0]})
        
    } catch (error) {
        console.log("error occured: " +  error.message)
        return res.status(400).json({"message":error.message})
    }
})
  




export default router