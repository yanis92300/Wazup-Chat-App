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
      
      if (channel.users){
          channel.users.map(async(currentUser)=>{
          const user = await db.get(`users:${currentUser}`)
          const updatedUser = merge(user, {channels: channel.users})
          await db.put(`users:${currentUser}`, updatedUser)
        })
      }

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
      // Récupère le channel à suppr
      const channel = await db.get(`channels:${id}`)

      // Tableau de users du channel qu'on va delete
      const {users} = channel
      users.map(async (currentUser) => {
        const user = await db.get(`users:${currentUser}`)
        const {channels} = user
        const filteredChannels = channels.filter((currentChannel)=> currentChannel !== id)
        const updateUser = merge(user, {channels: filteredChannels}) 
        await db.put(`users:${currentUser}`, updateUser)

        
      }) 
      await db.del(`channels:${id}`);
    },

    update: async (id, newData) => {
      const original = await db.get(`channels:${id}`); // on garde l'originale pour pouvoir copier ses éléments
      await console.log(original);
      console.log(newData);
      const modifiedChannel = merge(original, newData);
      console.log(modifiedChannel);
      await db.put(`channels:${id}`, modifiedChannel);


      // Si y'a une propriété JSON nommée 'users' dans le req.body
      // => on ajoute l'id du channel au users existant dans level db
      if (newData.users) {

        console.log("!!!!!!!!!!!!! DANS LE IF !!!!!!!!!!!!!")
        // newData.users si c un tableau de id 
        console.log(newData.users)
        await console.log(modifiedChannel)

        // ATTENTION CA marche que pour l'ajout de user
        // --> Cad que quand on refait un put request avec les mêmes users id (déjà existant dans le channel)
        // ---> et dans le même ordres mais en retirant le dernier user par ex du req.body (dans le JSON)
        // ----> l'id du user qui n'est pas dans le tableau a toujours pour channelId l'id du channel où il devrait plus être
        for (let i = 0; i < newData.users.length; ++i) {
          // On prend le user correspondant au users qu'il y a dans la base de données 
          const user = await db.get(`users:${newData.users[i]}`)

          // Si ya deja un tableau de channels (dans le JSON du req.body) alors on copie le tableau de channel en destructurant l'objet user
          if (user.channels) {
            
            const { channels } = user

            // ATTENTION on ne veut pas les channelIDs copiés du user de leveldb 
            // --> on veut celui  
            const modifiedUser = merge(user, { channels: [...channels, id] })

            // A REVOIR SI C PAS PLUTOT Modified channel ou l'original à parcourir plutôt que newData 
            // -->(sauf si celui-ci correspond à cleui de front-end et dans le bon ordre)
            // + Si on supprime un user d'un channel , supprimer aussi l'id du channel dans l'instance du user retiré
            // ATTENTION faudra jsuet que deouis le front-end les users d'un channel soit 
            // --> dans le même ordre que celui du back-end (du + ancien au + récent)
            await db.put(`users:${newData.users[i]}`, modifiedUser)
          }
          // Si y'en a pas on en crée un tableau avec un user dedans (peut être plutot codé ca dans la creation d'un channel pltot que dans l'update)
          else {
            const modifiedUser = merge(user, { channels: [id] })
            await db.put(`users:${newData.users[i]}`, modifiedUser)
          }
        }

      }
    },

    // Cette fonction est appelé depusi la fonction put du app.js 
    // Lorsque le req.body (json) comporte une propriété de type user
    deleteUser: async (userId, channelId) => {
      if (!userId) {
        //// attention c est paps!id mais !list.id
        throw Error("Unregistered user for this channel");
      }
      // On a le channel original avec tous ses userId 
      const original = await db.get(`channels:${channelId}`);
      await console.log(original)
      // Si ya pas de user (ce qui ne devrait pas être possible), verifier si c'est pas le admin a la place
      if (!original.users) throw Error('No User to delete in this channel')
      // Et maintenant on souhaite retirer un des user (userId) du channel 
      const { users } = original // On récupère le tableau de users présent dans le channel correspondant de leveldb
      // On récupère un tableau sans l'id du user qu'on souhaite retirer du channel  
      // On met dans un objet un tableau d'objet pour le merge avec le channel original et écraser les anciens users
      // Avec le bon tableau filtré de users
      const newUsers = users.filter(user => user !== userId)
      console.log({ users: newUsers })
      const newUsersObject = { users: newUsers }; // --> Retourne dans un tableau tout ce qui est différent du userId qu'on va supp 
      const newChannel = merge(original, newUsersObject)
      await db.put(`channels:${channelId}`, newChannel);
      // UNE fois que c'est fait on peut retiré le channelId du user qui vient d'être retiré du current channel 
      // dans la base de donnés 
      // il remplace tous les channels dans le user en question dans level db par juste l'id du channel (je n'ai plus de user avec un username de cat )
      const removedUser = await db.get(`users:${userId}`)
      // Pas de channels à supp dans le user qui vient d'être retiré du channel ? => Probleme donc throw Error
      if (!removedUser.channels) throw Error('No User to delete in this channel')
      const { channels } = removedUser // Because removedUser should have a 'channels' property containing an array of id channels
      // On récup un tableau de channel id du user sans l'id du channel où il vient d'être suppr
      const newChannels = channels.filter(channel => channel !== channelId)
      // On merge le tout en un seul object USEER pour pouvoir le remettre dans la base de données avec toutes les même propriété
      // --> Seulement la propriété intéressée ici est 'channels' dans user où un channel id est retiré
      const updatedUserObject = merge(removedUser, { channels: newChannels })
      // Pour finir on met à jour le user dans leveldb qui vient de perdre le channel avec le nouveau tableau de channels
      await db.put(`users:${userId}`, updatedUserObject) // userId passé en paramètres de base
      return newChannel;
    },
    // Cette fonction est très similaire au update ci dessus, les différences seront les verif sur le fait que la user demandé soit valide ?
    // Et voir comment ajouter l'id du channel à ce user 
    // addUsers: async (id, newData) => {
    //   const original = await db.get(`channels:${id}`); // on garde l'originae pour pouvoir copier ses éléments
    //   await console.log(original);
    //   // If there is no value for users in the JSON req.body
    //   if (!newData.users)   throw Error("No user value in the request")
    //   // If there is a users value in the JSON of the req.body
    //   console.log(newData);
    //   const modifiedChannel = merge(original, newData);
    //   console.log(modifiedChannel);
    //   await db.put(`channels:${id}`, modifiedChannel);
    //   await db.put
    // },
  },

  /// END CHANNELS

  users: {
    create: async (user) => {
      if (!user.username) throw Error("Invalid user");
      if (!user.email) throw Error("Invalid user");
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
    // a rajouter la verif du user qui modifie le message
    update: async (channelId, creation, newContent) => {
      // Checking the validity of the message
      if (!channelId) throw Error("Invalid channel");
      if (!creation) throw Error("Invalid message")
      if (!newContent.content) throw Error("No content specified");

      // Saving the old message
      const originalMessage = await db.get(`messages:${channelId}:${creation}`); // on garde l'originae pour pouvoir copier ses éléments
      // Keep a trace of both old and new message 
      await console.log(originalMessage);
      console.log(newContent);
      // Modify the message by merging them 
      const modifiedMessage = merge(originalMessage, newContent);
      // Pinting the result
      console.log(modifiedMessage);
      // Inserting the result of the modified message in the databasae (overwrites it)
      await db.put(`messages:${channelId}:${creation}`, modifiedMessage);
    },

    // a rajouter la verif du user qui supprime le message 
    delete: async (channelId, creation) => {
      if (!channelId) throw Error("Unregistered channel");
      if (!creation) throw Error("Invalid message")
      await db.del(`messages:${channelId}:${creation}`);
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