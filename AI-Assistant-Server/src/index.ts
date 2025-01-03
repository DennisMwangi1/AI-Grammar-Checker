import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fetchGrammarCheck } from './utils/fetchGrammarCheck';
import { formatGrammarErrors } from './utils/formatGrammarErrors';
import { validateInput } from './utils/validateInput';
const path = require("path");

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../AI-Assistant-Client/dist")));


app.post("/grammarCheck", async (req: Request, res: Response): Promise<any> => {
  const { value } = req.body;

  const { isValid, message } = validateInput(value);
  if (!isValid) {
    return res.status(400).json({ error: message });
  }

  const apiResponse = await fetchGrammarCheck(value);

  if (apiResponse.status === 200) {
    const matches = apiResponse.data.matches || [];
    const errors = formatGrammarErrors(matches);
    return res.status(200).json(errors);
  }

  return res.status(apiResponse.status).json(apiResponse.data);
});

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../AI-Assistant-Client/dist", "index.html")
  );
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
