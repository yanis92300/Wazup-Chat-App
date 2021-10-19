 const express = require('express')
const app = express()
const ejs = require('ejs')
const config = {
    port: 3000
  }
  const data = {
    channels: [{
      id: '1',
      name: 'Channel 1',
    },{
      id: '2',
      name: 'Channel 2',
    },{
      id: '3',
      name: 'Channel 3',
    }]
  }
  
  app.get('/', (req, res) => {
    //res.send(' <h1>Home page </h1><body><a href ="/channels/">See Channels </a></body>') 
  
  })




  app.get("/channels", (req,res) => {

    res.send(
      data.channels.map(product =>
        `<body>
        <ul>
        <li><a href ="/channels/${product.id}">${product.id}</a> </li>
         </ul>
        </body>
        `
      ).join("")
    )
  })

  
  app.get('/channels/:id', (req, res) => {
   
    const { id } = req.params
    const channel = data.channels.find(e => e.id === req.params.id)


    res.send( channel.name
    )
  })
  
  app.listen(config.port, () => {
   console.log(`Chat is waiting for you at http://localhost:${config.port}`)
   })