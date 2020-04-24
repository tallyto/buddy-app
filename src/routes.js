const { Router } = require('express');
const multer = require('multer');
const {
  AgendaController,
  AgendamentoController,
  CategoriaController,
  FileController,
  ForgetPasswordController,
  ForgetPasswordProviderController,
  PetController,
  ProviderController,
  PostController,
  SessionController,
  SessionProviderController,
  UserController,
  VacinaController,
  NotificationController,
  EnderecoController,
  CreditCardController,
  TypeOfProviderController,
  AgendaDisponivelController,
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

// ForgetPassword
routes.post('/providers/forget-password', ForgetPasswordProviderController.store);
routes.post('/providers/forget-password/:token', ForgetPasswordProviderController.create);

// Providers
routes.get('/providers', ProviderController.index);
routes.post('/providers', ProviderController.store);
routes.get('/providers/clinica', TypeOfProviderController.clinica);
routes.get('/providers/passeador', TypeOfProviderController.passeador);
routes.get('/providers/adestrador', TypeOfProviderController.adestrador);
routes.put('/providers/cadastro/:id', ProviderController.cadastro);

routes.get('/credit-card', CreditCardController.index);

routes.get('/posts', PostController.index);
routes.post('/posts', PostController.store);
routes.put('/posts/:id', PostController.update);
routes.delete('/posts/:id', PostController.delete);

routes.get('/agendamentos', AgendamentoController.index);


// Session
routes.post('/sessions', SessionController.store);
routes.post('/sessions/providers', SessionProviderController.store);

routes.post('/files', upload.single('file'), FileController.store);
routes.get('/files', FileController.index);
routes.delete('/files/:id', FileController.delete);

routes.post('/categorias', CategoriaController.store);
routes.get('/categorias', CategoriaController.index);
routes.put('/categorias/:id', CategoriaController.update);
routes.delete('/categorias/:id', CategoriaController.delete);

routes.get('/enderecos', EnderecoController.index);
routes.post('/enderecos', EnderecoController.store);
routes.put('/enderecos/:id', EnderecoController.update);
routes.delete('/enderecos/:id', EnderecoController.delete);

routes.get('/pets/all', PetController.show);

routes.get('/vacinas', VacinaController.index);

// Rotas protegidas por autenticação de usuario
routes.use(authMiddleware);

routes.get('/users/profile', UserController.show);
routes.put('/users', UserController.update);
routes.get('/provider/:providerId/disponivel', AgendaDisponivelController.index);
routes.post('/pets', PetController.store);
routes.get('/pets', PetController.index);
routes.put('/pets/:id', PetController.update);
routes.delete('/pets/:id', PetController.delete);

routes.post('/agendamentos', AgendamentoController.store);
routes.get('/agendamento/:providerId', AgendamentoController.show);

routes.delete('/agendamentos/:id', AgendamentoController.delete);

routes.post('/credit-card', CreditCardController.store);
routes.put('/credit-card/:id', CreditCardController.update);
routes.delete('/credit-card/:id', CreditCardController.delete);

routes.post('/vacinas', VacinaController.store);
routes.delete('/vacinas/:id', VacinaController.delete);

// Rotas protegidas por autenticação de provider
routes.use(providerAuth);

routes.get('/providers/profile', ProviderController.show);
routes.get('/agenda', AgendaController.index);
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);
routes.put('/providers/', ProviderController.update);

module.exports = routes;
