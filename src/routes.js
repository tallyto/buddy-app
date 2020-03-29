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
const PetController = require('./app/controllers/PetController');
const VacinaController = require('./app/controllers/VacinaController');
const CategoriaController = require('./app/controllers/CategoriaController');
const ProfileController = require('./app/controllers/ProfileController');
const ClinicaController = require('./app/controllers/ClinicaController');
const PasseadorController = require('./app/controllers/PasseadorController');
const AdestradorController = require('./app/controllers/AdestradorController');


const routes = Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  res.send('<h1>Buddypet</h1>');
});

// Users
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

// Providers
routes.get('/providers', ProviderController.index);
routes.post('/providers', ProviderController.store);
routes.get('/providers/clinica', ClinicaController.index);
routes.get('/providers/passeador', PasseadorController.index);
routes.get('/providers/adestrador', AdestradorController.index);
routes.put('/providers/cadastro/:id', ProviderController.cadastro);

// Session
routes.post('/sessions', SessionController.store);
routes.post('/sessions/providers', SessionProviderController.store);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/categorias', CategoriaController.store);
routes.get('/categorias', CategoriaController.index);


routes.get('/pets/all', PetController.show);

routes.get('/vacinas', VacinaController.index);

// Rotas protegidas por autenticação de usuario
routes.use(authMiddleware);

routes.get('/users/profile', ProfileController.user);

routes.put('/users', UserController.update);

routes.post('/pets', PetController.store);
routes.get('/pets', PetController.index);
routes.put('/pets/:petId', PetController.update);


routes.post('/vacinas', VacinaController.store);

// Rotas protegidas por autenticação de provider
routes.use(providerAuth);

routes.put('/providers', ProviderController.update);
routes.get('/providers/profile', ProfileController.provider);

module.exports = routes;
