const {Client, Message, MessageEmbed} = require('discord.js')
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
    name: "kick",
    category: "Moderation",
    usage: "$kick <user/id> <reason>",
    aliases: ["kicked"],
    description: "kicked User",
    cooldown: 1,
    memberpermissions: ["KICK_MEMBERS"],
    requiredroles: [],
    alloweduserids: [],

  /**
   * 
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  
  run: async(client, message, args) => {
  if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply({content: 'You do not have permissions to use that! Required perms:\`KICK_MEMBERS\`', allowedMentions: {repliedUser: false}})
  if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply({content: 'I do not have the required permissions, please give me the required permissions! Required perms:\`KICK_MEMBERS\`', allowedMentions: {repliedUser: false}})
  const target = message.mentions.members.first() ||message.guild.members.cache.get(args[0]) 
  const reason = args.slice(1).join(" ") || 'No reason was specified'
  
  if(!target) return message.reply({content: 'Please specify a user to be kicked!', allowedMentions: {repliedUser: false}})

  if(target.id === message.author.id) return message.reply({content: 'You cannot kick yourself smh!', allowedMentions: {repliedUser: false}})
  if(target.id === message.guild.ownerId) return message.reply({content: 'You cannot kick the server owner! *Imagine trying to kick the owner Lmaoo*', allowedMentions: {repliedUser: false}})
  if(target.id === client.user.id) return message.reply({content: 'Please don\'t kick me D:', allowedMentions: {repliedUser: false}})
  if(target.roles.highest.position >= message.member.roles.highest.position) return message.reply({content: 'You cannot kick that user due to their role being higher than you!', allowedMentions: {repliedUser: false}})

  if(!target.kickable) return message.reply({content: 'I cannot kick that user due to role hierarchy! Please check my role position!', allowedMentions: {repliedUser: false}})
  
  try{
  target.send(`You have been kicked from **${message.guild.name}**\nReason: ${reason}`).catch((e) => {message.reply({content: 'Cannot send a dm to that person!', allowedMentions: {repliedUser: false}})})

  target.kick(reason);
  
  message.reply({content: `Successfully kicked **${target.user.tag}**`, allowedMentions: {repliedUser: false}})
  } catch(e) {
    return message.reply({content: `Something went wrong! If you think this is a bug please report it to our devs by joining our support server! \nError msg:\n${e}`})
  }
  }
}