    import express from "express"
    import dotenv from "dotenv"
    import cors from "cors"

    import users from "../routes/users.js"

    dotenv.config()

    const app = express()
    
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(cors())
    app.use('/uploads', express.static('uploads'));
    app.use("/users", users)

    app.listen(3001, () => {
        console.log("Rodando NA PORTA 3001")
    })