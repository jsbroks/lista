const express = require("express");
const app = express();
const fs = require("fs");

const port = 5000;

app.all("/*", (req, res) => {
  const type = "get";

  if (req.post) type = "post";
  if (req.put) type = "put";
  if (type.delete) type = "delete";

  const url = req.url;

  let end = url.length;
  if (url.endsWith("/")) {
    end -= 1;
  }

  const path = url.substring(7, end);
  const file = `.${path}/${type}.json`;

  console.log(`${url} => returning ${path}`);

  try {
    const data = fs.readFileSync(file);
    res.send(JSON.parse(data));
  } catch (err) {
    res.status(400);
    res.send({ message: "error occured" });
    console.log("\t Error loading file");
  }
});

app.listen(port, () => console.log(`Running on ${port}`));
