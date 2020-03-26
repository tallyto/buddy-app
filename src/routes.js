const { Router } = require('express');
const multer = require('multer');
const UserController = require('./app/controllers/UserController.js');
const SessionController = require('./app/controllers/SessionController.js');
const authMiddleware = require('./app/middlewares/auth');
const providerAuth = require('./app/middlewares/providerAuth');
const SessionProviderController = require('./app/controllers/SessionProviderController');
const multerConfig = require('./config/multer');
const FileController = require('./app/controllers/FileController');
const ProviderController = require('./app/controllers/ProviderController');
const AppointmentController = require('./app/controllers/AppointmentController');
const PetController = require('./app/controllers/PetController');
const VacinaController = require('./app/controllers/VacinaController');
const CategoriaController = require('./app/controllers/CategoriaController');
const ProfileController = require('./app/controllers/ProfileController');


const routes = Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  res.send('<h1>Buddypet</h1>');
});

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/providers', ProviderController.index);
routes.post('/providers', ProviderController.store);

routes.post('/sessions/providers', SessionProviderController.store);
routes.post('/sessions', SessionController.store);
routes.post('/files', upload.single('file'), FileController.store);
routes.post('/categorias', CategoriaController.store);

routes.get('/pets/all', PetController.show);

// Rota de usuários
routes.use(authMiddleware);

routes.get('/profile', ProfileController.user);

routes.put('/users', UserController.update);

routes.post('/pets', PetController.store);
routes.get('/pets', PetController.index);

routes.post('/vacinas', VacinaController.store);


routes.post('/appointments', AppointmentController.store);

// Rota de providers
routes.use(providerAuth);
routes.put('/providers', ProviderController.update);
routes.get('/providers/profile', ProfileController.provider);


module.exports = routes;
