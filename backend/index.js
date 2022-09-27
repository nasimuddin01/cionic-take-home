const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`App running on port ${port}!`));

app.post("/", (req, res) => {
  const statusList = [200, 404];
  const status = statusList[Math.floor(Math.random() * statusList.length)];
  res.status(status).send({
    status,
  });
});
