const { Router } = require('express');
const multer = require('multer');
const UserController = require('./app/controllers/UserController.js');
const SessionController = require('./app/controllers/SessionController.js');
const authMiddleware = require('./app/middlewares/auth');
const multerConfig = require('./config/multer');
const FileController = require('./app/controllers/FileController');
const ProviderController = require('./app/controllers/ProviderController');
const AppointmentController = require('./app/controllers/AppointmentController');


const routes = Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  res.send('<h1>Buddypet</h1>');
});
routes.get('/users', UserController.show);
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/appointments', AppointmentController.store);

module.exports = routes;
