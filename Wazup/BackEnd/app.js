const express = require("express");
const { append } = require("express/lib/response"); // jsp pq c là mais je vais pas l'enlever, je crois que je l'utilise pas
const { channels, users, messages } = require("./index"); // Index retourne le code de fonctionnalités des channels et msgs

const app = express();
app.use(express.json()); // To use icoming json data such as for the post request

// Récupérer un channel en particulier (id ici est le uuid qui est généré automatiquement lors de l'insertion d'un channel dans la base de données)
app.get("/channels/:id", async (req, res) => {
  const channel = await channels.get(req.params.id);
  res.json(channel);
});

//Récupérer la liste des channels existants déja dans la base de données (précédemment inséré)
app.get("/channels", async (req, res) => {
  const channelz = await channels.list();
  res.json(channelz);
});

// On récupère la valeur 'author' qui a été envoyé dans le req.body (ex: {"author": "Nicolas"}), puis le reste sera généré dans la fonction create de channels codé dans le index.js
app.post("/channels", async (req, res) => {
  const channel = await channels.create(req.body);
  res.status(201).json(channel);
});

app.delete("/channels/:id", async (req, res) => {
  await channels.delete(req.params.id);
  res.status(200).json({ message: "success" });
});

app.put("/channels/:id", (req, res) => {
  const { id } = req.params;
  // const newData = req.body;
  // newData = { name, user };
  // // if (!name) console.log("no name specified");
  // // if (!user) console.log("no user specified");
  // const channel = channels.update(id, { name: name, user: user }); /// ... a test
  const newData = req.body;
  const channel = channels.update(id, newData);
  res.json(channel);
});

///////////////////////////////////////////////////////////////////USERS////////////////////////////////////////
app.get("/users", async (req, res) => {
  const userz = await users.list();
  res.json(userz);
});

app.get("/users/:id", async (req, res) => {
  const user = await users.get(req.params.id);
  res.json(user);
});

app.post("/users", async (req, res) => {
  const user = req.body;
  if (!user) {
    return res.status(400).json({ success: false, msg: "arrete" }); // ON met du json mnt a cause du app.use(json) j'crois, ca veut dire que les reponses se font en json
  }
  // Récupérer le user créé pour l'afficher lui ainsi que les autres infos et son UUID !!
  const userCreated = await users.create(user); // sans le await async ici ce met un objet vide

  res.status(201).json(userCreated);
});

app.delete("/users/:id", async (req, res) => {
  await users.delete(req.params.id);
  res.status(200).json({ message: "success" });
});

///////////////////////////////////////////////////////////////////MESSAGES////////////////////////////////////////

app.post("/channels/:id/messages", async (req, res) => {
  const message = await messages.create(req.params.id, req.body);
  res.status(201).json(message);
});

app.get("/channels/:id/messages", async (req, res) => {
  try {
    const channel = await channels.get(req.params.id);
  } catch (err) {
    return res.status(404).send("Channel does not exist.");
  }
  const messagez = await messages.list(req.params.id);
  res.json(messagez);
});

// app.all c pour toutes les autres routes qui n'ont pas été spécifié plus haut dans les méthodes get, post, etc ...
// --> On exécute une action commune aux chemins non existant dans le code
app.all("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
