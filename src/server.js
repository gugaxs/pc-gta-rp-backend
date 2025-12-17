import { execSync } from "child_process";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

try {
  execSync("npx prisma db push", { stdio: "inherit" });
} catch (err) {
  console.error("Erro ao sincronizar banco:", err.message);
}


import prisma from "./prisma.js";
import bcrypt from "bcryptjs";

async function createAdminIfNotExists() {
  const email = "gugab621@gmail.com";

  const admin = await prisma.user.findUnique({
    where: { email }
  });

  if (!admin) {
    const hash = await bcrypt.hash("Lendas.1203", 10);

    await prisma.user.create({
      data: {
        name: "Gustavo Gabriel",
        email,
        password: hash,
        rg: "478",
        role: "ADMIN",
        division: "ADMINISTRACAO",
        approved: true
      }
    });

    console.log("✅ ADMIN criado automaticamente");
  }
}

createAdminIfNotExists();


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha obrigatórios" });
  }

  // LOGIN FAKE (por enquanto)
  if (email === "teste@teste.com" && password === "123456") {
    return res.json({
      token: "token-fake-123",
      user: { email }
    });
  }

  return res.status(401).json({ error: "Credenciais inválidas" });
});

  res.send("🚓 API Polícia Civil GTA RP - Online");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
