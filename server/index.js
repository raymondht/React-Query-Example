const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");

const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
// app.get("/api/pokemon", async (req, res) => {
//   const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
//   res.send(response.data.results);
// });

app.get("/api/users", (req, res) => {
  const users = [
    { id: '1', name: 'John Doe', avatar: 'https://avatars.dicebear.com/api/open-peeps/stefan.svg' },
    { id: '2', name: 'Will Doe', avatar: 'https://pickaface.net/gallery/avatar/unr_random_180527_1151_2bcb7h9.png' },
    { id: '3', name: 'Thomas Doe', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInZrfJwEV91ZRGQlrybTovQTBkOQFHp9HxtqPmeRAy0T6phn3ODM8DeZWz57dN1CEo6A&usqp=CAU' },
    { id: '4', name: 'Eric Doe', avatar: 'https://pickaface.net/gallery/avatar/brilliantme53e577ef03bc9.png' },
  ]

  res.send(
    users
  );
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
