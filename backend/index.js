const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = ["http://localhost:8080", "https://cionic.onrender.com"];

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      console.log(origin);
      if (!allowedOrigins.includes(origin)) {
        const msg = `The CORS policy for ${origin} does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`App running on port ${port}!`));

app.post("/", (req, res) => {
  const statusList = [200, 404];
  const status = statusList[Math.floor(Math.random() * statusList.length)];
  res.status(status).send({
    status,
  });
});
