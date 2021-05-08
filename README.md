# Discord Embed Page
An easy to use package to create embed pages easily for your discord bot embeds.

## Example
### Quick guide
```js
const { Client } = require("discord.js");
const embedPage = require("discord-embed-page"); //Import the package

const client = new Client(); //Our Discord client

let array = ["element1", "element2", "element3", "element4", "element5", "element6", "element7", "element8", "element9", "element10"] //Your array of information you want to view in embed.

client.once("ready", () => {
    console.log("I am ready!")
});

client.on("message" async(message) => {
    if(message.content.toLowerCase() === "!page") { //If message is !page
        embedPage.createPage(client, message, array, 5) //Create and send embed page, one page having 5 elements of array.
    }
});

client.login("token-here"); //Bot gotta login
```

### Extended Example
```js
const { Client } = require("discord.js");
const embedPage = require("discord-embed-page"); //Import the package

const client = new Client(); //Our Discord client

let array = ["element1", "element2", "element3", "element4", "element5", "element6", "element7", "element8", "element9", "element10"] //Your array of information you want to view in embed.

client.once("ready", () => {
    console.log("I am ready!")
});

client.on("message" async(message) => {
    if(message.content.toLowerCase() === "!page") { //If message is !page
    const args = message.content.slice(6).trim().split(/ +/g);
    let options = {
        forward: "☀", //Go to next page reaction
        backwarn: "🌙" //Go to previous page reaction
        title: "This is embed Title",
        color: "#ff0000" //Embed color. Must be a hex color,
        footer: "A footer text" //Embed footer text
    }
        embedPage.createPage(client, message, array, 5, args[0], options) //Create and send embed page, one page having 5 elements of array with custom page jump support and options. If user types `!page 2` it will view page 2 directly. place **false** at the place of **args[0]** to disable it.
    }
});

client.login("token-here"); //Bot gotta login
```