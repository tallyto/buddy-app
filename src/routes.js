const { Router } = require('express');
const multer = require('multer');
const {
  AdestradorController,
  AgendaController,
  AgendamentoController,
  CategoriaController,
  ClinicaController,
  FileController,
  ForgetPasswordController,
  PasseadorController,
  PetController,
  ProfileController,
  ProviderController,
  SessionController,
  SessionProviderController,
  UserController,
  VacinaController,
  NotificationController,
} = require('./config/require');

const authMiddleware = require('./app/middlewares/auth');
const providerAuth = require('./app/middlewares/providerAuth');
const multerConfig = require('./config/multer');

const routes = Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  res.send('<h1>Buddypet</h1>');
});

// Users
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

// ForgetPassword
routes.post('/forget-password', ForgetPasswordController.store);
routes.post('/forget-password/:token', ForgetPasswordController.create);

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
routes.get('/files', FileController.index);

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
routes.put('/pets/:id', PetController.update);
routes.delete('/pets/:id', PetController.delete);


routes.post('/agendamentos', AgendamentoController.store);
routes.get('/agendamentos', AgendamentoController.index);
routes.delete('/agendamentos/:id', AgendamentoController.delete);


routes.post('/vacinas', VacinaController.store);

// Rotas protegidas por autenticação de provider
routes.use(providerAuth);

routes.put('/providers', ProviderController.update);
routes.get('/providers/profile', ProfileController.provider);
routes.get('/agenda', AgendaController.index);
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

module.exports = routes;
