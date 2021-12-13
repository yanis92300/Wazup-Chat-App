var level = require("level");
var sublevel = require(level - sublevel);

var db = level("./db", { valueEncoding: "json" });

// db.del("animal", (err, animal) => {
//   db.get("animal", (err, animal) => {
//     console.log(animal);
//   });
// });

// db.put("animal", { type: "grizzly", name: "steve" }, (err) => {
//   db.get("animal", (err, animal) => {
//     console.log(animal.type);
//   });
// });
