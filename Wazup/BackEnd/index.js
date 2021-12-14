const express = require("express");
const level = require("level");
const microtime = require("microtime");
const { clone, merge } = require("mixme");
const { v4: uuidv4 } = require("uuid"); // v4 : uuidv4 est l'équivalent de l'écriture import v4 as uuidv4 from 'uuid'
const currentUser = "Nicolas";
const db = level("./db", { valueEncoding: "json" }); // La BDD est encoder en json donc pour insérer faut spécifier en json

module.exports = {
  channels: {
    create: async (channel) => {
      if (!channel.name) throw Error("Invalid Channel");
      const id = uuidv4(); /// id aleatoire
      await db.put(`channels:${id}`, channel); // Normalement pas besoin de mettre le stringify(channel) pcq on a déja spécifié l'encodage en JSON
      return merge(channel, { id: id });
    },
    get: async (channelId) => {
      if (!channelId) {
        throw Error("Invalid channel");
      }
      const data = await db.get(`channels:${channelId}`);
      console.log(data); // Pour vérifier la data crée ... Le prof avait mis const channel JSON.parse(data), mais le JSON ne marche pas car c deaj du JSON je crois, donc on le print direct en tant que tel
      return merge(data, { id: channelId });
    },

    list: async () => {
      return new Promise((resolve, reject) => {
        const channels = [];
        db.createReadStream({
          gt: "channels:",
          lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
        })
          .on("data", ({ key, value }) => {
            channel = value; // Le prof avait écrit ici channel = JSON.parse(value) mais ca faisait une erreur donc j'ai enlever le json.parse
            // --> je crois que ca a qlqch a voir avec la déclaration de JSON que j'ai fait plus haut ou sinon autre part jsp
            channel.id = key.split(":")[1];
            channels.push(channel);
          })
          .on("error", (err) => {
            reject(err);
          })
          .on("end", () => {
            resolve(channels);
          });
      });
    },

    delete: async (id) => {
      if (!id) {
        //// attention c est paps!id mais !list.id
        throw Error("Unregistered channel");
      }
      await db.del(`channels:${id}`);
    },

    update: async (id, newData) => {
      const original = await db.get(`channels:${id}`); // on garde l'originae pour pouvoir copier ses éléments
      await console.log(original);
      console.log(newData);
      const modifiedChannel = merge(original, newData);
      console.log(modifiedChannel);
      await db.put(`channels:${id}`, modifiedChannel);
    },
  },

  /// END CHANNELS

  users: {
    create: async (user) => {
      if (!user.username) throw Error("Invalid user");
      const id = uuidv4();
      await db.put(`users:${id}`, user);
      return merge(user, { id: id });
    },
    get: async (id) => {
      if (!id) throw Error("Invalid id");
      const data = await db.get(`users:${id}`);
      return merge(data, { id: id });
    },
    list: async () => {
      return new Promise((resolve, reject) => {
        const users = [];
        db.createReadStream({
          gt: "users:",
          lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
        })
          .on("data", ({ key, value }) => {
            user = value;
            user.id = key.split(":")[1];
            users.push(user);
          })
          .on("error", (err) => {
            reject(err);
          })
          .on("end", () => {
            resolve(users);
          });
      });
    },

    delete: async (id) => {
      if (!id) {
        //// attention c est paps!id mais !list.id
        throw Error("Unregistered channel");
      }
      await db.del(`users:${id}`);
    },
  },

  messages: {
    create: async (channelId, message) => {
      if (!channelId) throw Error("Invalid channel");
      if (!message.author) throw Error("Invalid message");
      if (!message.content) throw Error("Invalid message");
      creation = microtime.now();
      await db.put(`messages:${channelId}:${creation}`, {
        author: message.author,
        content: message.content,
      });
      return merge(message, { channelId: channelId, creation: creation });
    },

    list: async (channelId) => {
      return new Promise((resolve, reject) => {
        const messages = [];
        db.createReadStream({
          gt: `messages:${channelId}:`,
          lte:
            `messages:${channelId}` +
            String.fromCharCode(":".charCodeAt(0) + 1),
        })
          .on("data", ({ key, value }) => {
            message = value;
            const [, channelId, creation] = key.split(":");
            message.channelId = channelId;
            message.creation = creation;
            messages.push(message);
          })
          .on("error", (err) => {
            reject(err);
          })
          .on("end", () => {
            resolve(messages);
          });
      });
    },
  },
};
