import { execSync } from "child_process";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

/**
 * Roda as migrations automaticamente
 */
try {
  execSync("npx prisma migrate deploy", { stdio: "inherit" });
} catch (err) {
  console.error("Erro ao rodar migrate:", err.message);
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚓 API Polícia Civil GTA RP - Online");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
