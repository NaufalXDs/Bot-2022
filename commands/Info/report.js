const { MessageEmbed } = require('discord.js')
const config = require("../../botconfig/config.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "report", //the command name for execution & for helpcmd [OPTIONAL]
  category: "Info",
  usage: "report [cmdname]",
  aliases: [""],
  cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
  description: "Returns all Commmands, or one specific command", //the command description for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async(client, message, args) => {
    const channel = client.channels.cache.get('916682864349810789');
    const query = args.join(" ");
    if(!query[0]) return message.reply("Please provide a bug!");
    const embed = new MessageEmbed()
    .setTitle("New bug reported!")
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL())
    .addFields(
      {name: 'Author', value: `${message.author.tag}`},
      {name: 'ID', value: `${message.author.id}`},
      {name: 'Guild', value: `${message.guild.name}`},
      {name: 'Bug', value: `${query}`}
      )
      .setFooter("Sandorns")
      message.reply({content: 'Thank you for reporting this issue to us!'});
      channel.send({embeds: [embed]});
      
  }
}