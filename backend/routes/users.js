import express from "express"
import pool from "../src/db.js"
import bcrypt from "bcrypt"
import multer from "multer"
import path from 'path'
import { fileURLToPath } from "url"
import { Router } from "express"
const router = Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

router.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"))
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName)
  }
})

const upload = multer({ storage })

router.get("/", async (req, res) => {
  const sql = "SELECT * FROM users"
  const result = await pool.query(sql)
  res.json(result.rows)
})

router.delete("/delete/:id", async (req, res) => {
  const userId = req.params.id

  try {
    const sql = 'SELECT * FROM users WHERE id = $1'
    const result = await pool.query(sql, [userId])
    if(result.rows.length === 0) {
      res.status(404).json({ error: "Usuario não encontrado"})
    }

    await pool.query("DELETE FROM users WHERE id = $1", [userId])
    res.status(201).json({ message: "Usuario deletado com sucesso" }) 
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }

})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(sql, [email]);

  if (result.rows.length === 0) {
    return res.status(404).json({ success: false, message: "Email não encontrado" });
  }

  const user = result.rows[0];

  bcrypt.compare(password, user.password, (err, match) => {
    if (err) return res.status(500).json({ success: false, message: "Erro ao verificar senha" });
    if (!match) return res.status(401).json({ success: false, message: "Senha incorreta" });

    res.json({
      success: true,
      message: "Login realizado com sucesso",
      user: {
        id: user.id,
        name: user.username,
        email: user.email
      }
    });
  });
});

  router.post("/register", async (req, res) => {
    const { name, email, password } = req.body
  
    try {
      const hash = await bcrypt.hash(password, 10)
      const result = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, hash]
      )

      
    const user = result.rows[0];

      console.log("Usuário cadastro com sucesso!")
      res.json({
        success: true,
        message: "Registro realizado com sucesso",
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Erro ao criptografar senha." })
    }
  })

  router.post("/forgot-password", async (req, res) => {
    const { newPassword, email } = req.body

    const hashed = await bcrypt.hash(newPassword, 10)

    const sql = 'UPDATE users SET password = $1 WHERE email = $2 RETURNING *'
    const result = await pool.query(sql, [hashed, email])
    if(result.rows.length === 0) {
      return res.status(404).json({ error: "erro: email não encontrado" })
    }

    res.status(201).json(result.rows[0])
  })

  router.post("/:id/profile-image", upload.single('arquivo'), async (req, res) => {
    try {
      const userId = req.params.id;
      const { filename } = req.file

      const sql = 'UPDATE users SET profile_pic = $1 WHERE id = $2 RETURNING *'
      const result = await pool.query(sql, [filename, userId])

      res.json(result.rows)
    } catch(err) {
      res.status(500).json({ error: err.message })
      console.error(err)
    }
  })

export default router