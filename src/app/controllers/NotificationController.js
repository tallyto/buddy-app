const Notification = require('../models/Notification');

class NotificationController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const notification = await Notification.findAll({
      where: { provider_id: req.providerId },
      limit: 20,
      offset: (page - 1) * 20,
      order: [['created_at', 'DESC']],
    });

    return res.json(notification);
  }

  async update(req, res) {
    const notification = await Notification.findByPk(req.params.id);

    const read = await notification.update({ read: true });

    return res.json(read);
  }
}


module.exports = new NotificationController();
