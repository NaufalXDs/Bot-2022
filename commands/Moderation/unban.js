const {Client, Message, MessageEmbed} = require('discord.js')
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
    name: "unban",
    category: "Moderation",
    usage: "$unban <user/id>",
    aliases: ["unbanned"],
    description: "Unban User",
    cooldown: 1,
    memberpermissions: ["BAN_MEMBERS"],
    requiredroles: [],
    alloweduserids: [],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args   
   */
  run: async(client, message, args) => {
    if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply({content: 'You do not have permissions to use that! Required perms:\`BAN_MEMBERS\`', allowedMentions: {repliedUser: false}})
    if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply({content: 'I do not have the required permissions, please give me the required permissions! Required perms:\`BAN_MEMBERS\`', allowedMentions: {repliedUser: false}})
    const uid = args[0]
    const reason = args.slice(1).join(" ") || 'No reason provided'

    if(!uid) return message.reply({content: 'Please provide a valid user ID!', allowedMentions: {repliedUser: false}})
    if(isNaN(uid)) return message.reply({content: 'User ID must be a number!', allowedMentions: {repliedUser: false}})
    if(uid === message.author.id) return message.reply({content: 'Oh Seriously? You aren\'t even banned from this server smh!', allowedMentions: {repliedUser: false}})
    if(uid === message.guild.ownerId) return message.reply({content: 'Oh god owner can\'t be banned basically, so please don\'t ever try to ban or unban them lmao', allowedMentions: {repliedUser: false}})
    if(uid === client.user.id) return message.reply({content: 'I\'m not banned! *You sus*', allowedMentions: {repliedUser: false}})

    message.guild.members
    .unban(uid, reason)
    .then((user) => {
      message.reply({content: `Successfully unbanned **${user.tag}**!`, allowedMentions: {repliedUser: false}})
    })
    .catch((e) => {
      message.reply({content: `User is not banned!`, allowedMentions: {repliedUser: false}})
    })
  }
}