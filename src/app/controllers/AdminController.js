const Yup = require('yup');
const Admin = require('../models/Admin');

class AdminController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('e-mail inválido')
        .required('e-mail obrigatório'),
      password: Yup.string()
        .required('senha obrigatória')
        .min(6, 'senha menor que 6 caracteres'),
    });

    try {
      await schema.validate(req.body);

      const adminExist = await Admin.findOne({
        where: { email: req.body.email },
      });

      if (adminExist) {
        return res.status(401).json({ error: 'e-mail já cadastrado' });
      }

      const { id, email } = await Admin.create(req.body);

      return res.json({
        id,
        email,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email('e-mail inválido'),
      password: Yup.string().min(6, 'senha menor que 6 caracteres'),
      comfirmPassword: Yup.string().when('password', (password, field) => (password
        ? field
          .required('senha de confirmação requerida')
          .oneOf([Yup.ref('password')], 'as senhas não são iguais')
        : field)),
    });

    try {
      await schema.validate(req.body);

      const { email } = req.body;

      const admin = await Admin.findByPk(req.adminId);

      if (email && email !== admin.email) {
        const userExist = await Admin.findOne({ where: { email } });
        if (userExist) {
          return res.status(401).json({ error: 'e-mail já cadastrado' });
        }
      }

      await admin.update(req.body);

      admin.password_hash = null;

      return res.json(admin);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new AdminController();
