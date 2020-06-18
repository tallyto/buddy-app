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
  ChatController,
} = require('./config/require');
const AgentamentoUser = require('./app/controllers/AgendamentoUserController');
const ContaBancaria = require('./app/controllers/ContaBancariaController');
const ConsultaController = require('./app/controllers/ConsultaController');
const HistoricoController = require('./app/controllers/HistoricoController');
const ExameController = require('./app/controllers/ExameController');
const FichaController = require('./app/controllers/FichaController');
const authMiddleware = require('./app/middlewares/auth');
const providerAuth = require('./app/middlewares/providerAuth');
const multerConfig = require('./config/multer');

const routes = Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  res.send('<h1>Buddypet</h1>');
});

// Global
routes.get('/credit-card', CreditCardController.index);
routes.get('/pets/all', PetController.show);
routes.get('/vacinas', VacinaController.index);
routes.get('/agendamentos', AgendamentoController.show);
routes.get('/conta-bancaria', ContaBancaria.index);
routes.get('/consultas', ConsultaController.index);
routes.get('/exames', ExameController.index);

// Chat
routes.get('/chat/:id', ChatController.index);

// Users
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

// ForgetPassword
routes.post('/forget-password', ForgetPasswordController.store);
routes.post('/forget-password/:token', ForgetPasswordController.create);

// ForgetPassword provider
routes.post(
  '/providers/forget-password',
  ForgetPasswordProviderController.store,
);
routes.post(
  '/providers/forget-password/:token',
  ForgetPasswordProviderController.create,
);

// Providers
routes.get('/providers', ProviderController.index);
routes.post('/providers', ProviderController.store);
routes.get('/providers/clinica', TypeOfProviderController.clinica);
routes.get('/providers/passeador', TypeOfProviderController.passeador);
routes.get('/providers/adestrador', TypeOfProviderController.adestrador);
routes.put('/providers/cadastro/:id', ProviderController.cadastro);

// Posts
routes.get('/posts', PostController.index);
routes.post('/posts', PostController.store);
routes.put('/posts/:id', PostController.update);
routes.delete('/posts/:id', PostController.delete);

// Session
routes.post('/sessions', SessionController.store);
routes.post('/sessions/providers', SessionProviderController.store);

// Files
routes.post('/files', upload.single('file'), FileController.store);
routes.get('/files', FileController.index);
routes.delete('/files/:id', FileController.delete);

// Categorias
routes.post('/categorias', CategoriaController.store);
routes.get('/categorias', CategoriaController.index);
routes.put('/categorias/:id', CategoriaController.update);
routes.delete('/categorias/:id', CategoriaController.delete);

// Enderecos
routes.get('/enderecos', EnderecoController.index);
routes.post('/enderecos', EnderecoController.store);
routes.put('/enderecos/:id', EnderecoController.update);
routes.delete('/enderecos/:id', EnderecoController.delete);

// Rotas protegidas por autenticação de usuario
routes.use(authMiddleware);

// User
routes.get('/users/profile', UserController.show);
routes.put('/users', UserController.update);

// Agendamentos
routes.get('/agendamentos/user', AgentamentoUser.index);
routes.post('/agendamenos/aceitar', AgentamentoUser.store);
routes.get('/agendamento/:providerId', AgentamentoUser.show);
routes.delete('/agendamentos/:id', AgentamentoUser.delete);

// Chat
routes.post('/chat/provider/:providerId/pet/:petId', ChatController.store);

// Agenda diponivel provider
routes.get(
  '/provider/:providerId/disponivel',
  AgendaDisponivelController.index,
);

// Pets
routes.post('/pets', PetController.store);
routes.get('/pets', PetController.index);
routes.put('/pets/:id', PetController.update);
routes.delete('/pets/:id', PetController.delete);

// Cartão de crédito
routes.post('/credit-card', CreditCardController.store);
routes.put('/credit-card/:id', CreditCardController.update);
routes.delete('/credit-card/:id', CreditCardController.delete);

// Rotas protegidas por autenticação de provider
routes.use(providerAuth);

// Provider
routes.get('/providers/profile', ProviderController.show);
routes.put('/providers/', ProviderController.update);

// Agenda
routes.get('/agenda', AgendaController.index);

// Notificações
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// Agendemantos
routes.post('/agendamentos', AgendamentoController.store);
routes.get('/agendamentos/provider', AgendamentoController.index);

// Conta Bancaria
routes.post('/conta-bancaria', ContaBancaria.store);
routes.put('/conta-bancaria/:id', ContaBancaria.update);
routes.delete('/conta-bancaria/:id', ContaBancaria.destroy);

// Consultas
routes.post('/consultas', ConsultaController.create);
routes.put('/consultas/:id', ConsultaController.update);
routes.delete('/consultas/:id', ConsultaController.delete);
routes.get('/consultas/provider', ConsultaController.show);

// Ficha
routes.get('/ficha/:id', FichaController.show);
routes.get('/historico/:id', HistoricoController.show);

// Vacinas
routes.post('/vacinas', VacinaController.store);
routes.delete('/vacinas/:id', VacinaController.delete);
routes.get('/vacinas/:id', VacinaController.show);

// Exames
routes.post('/exames', ExameController.store);
routes.put('/exames/:id', ExameController.update);
routes.delete('/exames/:id', ExameController.delete);

module.exports = routes;
