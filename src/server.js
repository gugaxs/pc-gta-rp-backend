import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// rota teste
app.get("/", (req, res) => {
  res.send("API Polícia Civil GTA RP - Online");
});

// LOGIN SIMPLES (SEM BANCO)
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email e senha são obrigatórios"
    });
  }

  // login fake
  if (email === "admin@pc.com" && password === "123456") {
    return res.json({
      success: true,
      user: {
        email,
        role: "admin"
      }
    });
  }

  return res.status(401).json({
    error: "Credenciais inválidas"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
