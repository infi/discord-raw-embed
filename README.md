# `discord-raw-embed`  
  
Utility to build raw embed objects to be used by the Discord API.  
  
## Example  
  
```js
const RawEmbed = require("discord-raw-embed")
const embed = new RawEmbed()

embed.setColor(0xff00ff) // Set color to #FF00FF
embed.setTitle("Hello World!")
embed.setDescription("Unable to find a readme for discord-raw-embed@0.1.0")

embed.getEmbed()
/*
{
    "title": "Hello World!"
    "color": 16711935,
    "description": "Unable to find a readme for discord-raw-embed@0.1.0"
}
*/
```