import { getSubdomain, nameToPid } from "./utils.js";
import { PERMACAST_BASE_URL } from "./constants.js";
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", async (req, res) => {
  const label = await getSubdomain(req);
  console.log(label);
  const pid = await nameToPid(label);
  console.log(pid);
  if (pid) {
    res.redirect(`${PERMACAST_BASE_URL}/${pid}`);
    return;
  }
  res.redirect(`https://permacast.dev`);
  return;
});

app.listen(port, async () => {
  console.log(`Ark Protocol running on PORT: ${port}`);
});
