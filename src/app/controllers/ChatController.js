/* eslint-disable camelcase */
const Chat = require('../models/Chat');
const User = require('../models/User');
const Provider = require('../models/Provider');
const File = require('../models/File');
const Pet = require('../models/Pet');

class ChatController {
  async store(req, res) {
    const chat = await Chat.findOne({
      where: {
        provider_id: req.params.providerId,
        user_id: req.userId,
        pet_id: req.params.petId,
      },
    });

    if (chat) {
      return res.json(chat);
    }

    const newChat = await Chat.create({
      provider_id: req.params.providerId,
      user_id: req.userId,
      pet_id: req.params.petId,
    });

    return res.json(newChat);
  }

  async index(req, res) {
    const chats = await Chat.findAll({
      where: {
        provider_id: req.params.id,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
          include: [{ model: File, as: 'avatar', attributes: ['url'] }],
        },
        {
          model: Pet,
          as: 'pets',
          include: [{ model: File, as: 'avatar', attributes: ['url'] }],
        },
      ],
    });

    return res.json(chats);
  }

  async chatUser(req, res) {
    const chats = await Chat.findAll({
      where: {
        user_id: req.params.id,
      },
      include: [
        {
          model: Provider,
          as: 'provider',
          attributes: ['name', 'passeador', 'adestrador', 'clinica'],
          include: [{ model: File, as: 'avatar', attributes: ['url'] }],
        },
      ],
    });

    return res.json(chats);
  }
}

module.exports = new ChatController();
