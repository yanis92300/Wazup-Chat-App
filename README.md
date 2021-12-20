# Clone the repository on your machine
git clone https://github.com/yanis92300/yanis_nicolas_webtech.git
cd Wazup


# Install Go
apt install golang-go
# Download Dex
git clone https://github.com/dexidp/dex.git
# Build Dex
cd dex
make examples



# Front-End
cd FrontEnd
## Install dependencies
npm install

## Start the front-end
npm start 


# Back-end
cd BackEnd
## Install dependencies
npm install
## Start the back-end
npm start



# Dex

## Install Go
apt install golang-go
## Download Dex
git clone https://github.com/dexidp/dex.git

## Build Dex
cd dex
make
make examples

## Modify the ClientId and clientSecret of the .yml file for a github connection 
- type: github
  id: github
  name: GitHub
  config:
    clientID: 356b77ab4b475cfcb6d2
    clientSecret: 8a9431870c4648e9234e26b8551925cc28b4556d
    redirectURI: http://127.0.0.1:5556/dex/callback

## go in th edex directory
cd dex
## Start the dex server
./bin/dex serve examples/config-dev.yaml


# Author
Click on 'Sign in with ...' to connect with openID using aouth2.
Then choose 'login with example' or with google, or github.


# Project Managment

## Naming Convention 2/2
Most of the objects, variables are clear and understandable

## Project Structure 4/4
The BackEnd and FrontEnd are two  separated folders.

 FrontEnd:
Is composed of a public folder and a src folder.
The src folder contains the whole application for the user side. A sub-folder named 'components' is also present in src folder.
In the components folder,
Leftbar.js is the list of channels on the interface.
Message.js is a single component message
Messages.js is the component that contains all the Message components from a channel
Navbar.js is the navbar component of the app at the top of the application where you can logout.
SignUp.js is the first page you see before accessing the app where you can login thanks to openid by clicking the 'Sign up with...' button.

 BackEnd:
The backend relies on the installation of leveldb.
Is composed of 2 main files: app.js and index.js and a db folder.
App.js is the file that listens to incoming request and give them a response, when index.js is the file that make the queries and modifies directly the database.

The Database of the backend
The database (db folder) has messages, channels and users.
Each users has an id, an array of channel ids, an email and a username.
Each channels has an id, an array of user ids, a name, 
Each messages has a channel id, an author, some content, and a creation. 

## Code Quality 4/4
We used the same code structure as in the initial project.
The code is respectfully indented, line-spaced and understandable with clear names for objects and methods in order to make it easy to read.


## Design, UX 4/4
The app looks really nice, we have spent a lot of time on the css part of the project to make it look good and easy to use. Most of the components displayed on the WAZUP app interface are MUI components.

## Git and Devops 2.5/4
Simple commits that introduces a commit history. We used branches as we have merged the main branch with some side branches.

# Application development

## Welcome screens 4/4
The welcome screens show where you are as it is simple to use. It is friendly and good-looking to us.

## New Channel Creation 6/6
To create a new channel we must click on the discussion button. Then the list of users you can add is then diplayed. Choose the users you wish to discuss with and click add.
unfortunately, the channel does not appear in real time. You need to Refresh the page to see the new channel displayed with a default channel name !!

## Channel membership and access 1.5/4
A non-registered user connecting to our app gets automatically registered in the database.
No verification of the user access token in the middleware.

## Ressource access control 2/4
When connecting to the app, the users gets acces to the discussion already existing and can speak in these channels.

## Invite Users to channels 4/6
In the toolbar of a Channel there is the Channel name and a Icon Button on the right. Click it to add users. When we wish to add some users, the users not remaining in the channel are console logged !! But we didn't find a way to display them in a component at the screen. Other than this, we have the right add users functions in the backend and works perfectly ass we tested with Postman.

## Message Modification 1.5/2
A message is automatically modified to "nooon" when you click on the Icon button of a message in a channel and then click on 'modify massage'. However it is not modified in real time, you need to refresh the page.

## Message removal 2/2
A message is deleted in real time when the 'delete message' button from the Icon Button of a message. It is also deleted in the database.

## Account settings 0/4
Need more time to do so

## Gravatar Integration 0/2
Need more time

## Avatar Integration 0/2
Need more time

## Personal custom avatar 0/6
Need more time
