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


//login user
router.post("/login", async (req, res) => {
    try {
        const text = "SELECT * FROM users WHERE email = $1 and password = crypt($2, password)"
        const values = [req.body.email, req.body.password]
        const { rows } = await postgresClient.query(text, values)
        if(rows.length === 0){
            return res.status(400).json({"message":"User not found"})
        }
        else{
            const user = rows[0]
            return res.status(200).json({"user":user})
          
        }
    } catch (error) {
        console.log("error occured: " +  error.message)
        return res.status(400).json({"message ":error.message})
    }
})

//update user
router.put('/update/:userId',async (req, res) => {
    try {
        const { userId } = req.params
        const text = "UPDATE users SET username = $1 WHERE id = $2 RETURNING *"
        const values = [req.body.username,  userId]
        const { rows } = await postgresClient.query(text, values)
        return res.status(200).json({"updatedUser": rows[0]})
    } catch (error) {
        console.log("error occured: " +  error.message)
        return res.status(400).json({"message":error.message})
    }
})

//delete user
router.delete('/delete/:userId',async (req, res) => {
    try { 
        const { userId } = req.params
        const text = "DELETE FROM users WHERE id = $1 RETURNING *"
        const values = [userId]
        const { rows } = await postgresClient.query(text, values)
        return res.status(200).json({"deletedUser": rows[0]})
    } catch (error) {
        console.log("error occured: " +  error.message)
        return res.status(400).json({"message":error.message})
    }
})

  




export default router