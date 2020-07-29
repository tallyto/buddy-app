const { Router } = require('express');
const multer = require('multer');
const AgentamentoUserController = require('./app/controllers/AgendamentoUserController');
const ContaBancaria = require('./app/controllers/ContaBancariaController');
const ConsultaController = require('./app/controllers/ConsultaController');
const HistoricoController = require('./app/controllers/HistoricoController');
const ExameController = require('./app/controllers/ExameController');
const FichaController = require('./app/controllers/FichaController');
const multerConfig = require('./config/multer');
const forgetPassword = require('./app/controllers/ForgetPasswordController');
const session = require('./app/controllers/SessionController');
const EspecialidadeController = require('./app/controllers/EspecialidadeController');
const AvaliacaoController = require('./app/controllers/AvalicaoController');
const AdminController = require('./app/controllers/AdminController');
const AgendamentoController = require('./app/controllers/AgendamentoController');
const FileController = require('./app/controllers/FileController');
const PetController = require('./app/controllers/PetController');
const ProviderController = require('./app/controllers/ProviderController');
const PostController = require('./app/controllers/PostController');
const UserController = require('./app/controllers/UserController');
const VacinaController = require('./app/controllers/VacinaController');
const EnderecoController = require('./app/controllers/EnderecoController');
const CreditCardController = require('./app/controllers/CreditCardController');
const TypeOfProviderController = require('./app/controllers/TypeOfProviderController');
const ChatController = require('./app/controllers/ChatController');
const { authAdmin, authProvider, authUser } = require('./app/middlewares/auth');
const AdminProviderController = require('./app/controllers/AdminProviderController');
const PromocoesController = require('./app/controllers/PromocoesController');
const routes = Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  res.send('<h1>Buddypet</h1>');
});

routes.get('/posts', PostController.getPosts);
routes.get('/promocoes', PromocoesController.getPromocoes);

routes.post('/especialidades/:provider_id', EspecialidadeController.createEspecialidade);
routes.get('/especialidades/', EspecialidadeController.getEspecialistas);

routes.get('/pet/:id', PetController.getPetAged);

routes.post('/admin', AdminController.store);

// Chat
routes.get('/chat/:id', ChatController.chatProvider);
routes.get('/chat/user/:id', ChatController.chatUser);

// Users
routes.post('/users', UserController.store);

// ForgetPassword
routes.post('/forget-password/user', forgetPassword.user);

// ForgetPassword provider
routes.post('/forget-password/provider', forgetPassword.provider);

// Providers
routes.post('/providers', ProviderController.store);
routes.get('/providers/clinica', TypeOfProviderController.clinica);
routes.get('/providers/passeador', TypeOfProviderController.passeador);
routes.get('/providers/adestrador', TypeOfProviderController.adestrador);
routes.put('/providers/cadastro/:id', ProviderController.cadastro);

// Session
routes.post('/sessions', session.user);
routes.post('/sessions/providers', session.provider);
routes.post('/sessions/admin', session.admin);

// Files
routes.post('/files', upload.single('file'), FileController.store);
routes.get('/files', FileController.index);
routes.delete('/files/:id', FileController.delete);

// Enderecos
routes.post('/enderecos', EnderecoController.store);
routes.put('/enderecos/:id', EnderecoController.update);
routes.delete('/enderecos/:id', EnderecoController.delete);

// Rotas protegidas por autenticação de usuario
routes.use(authUser);

// Avaliacao
routes.post('/avaliacao/provider/:provider_id', AvaliacaoController.createAvaliacao);
routes.get('/avaliacao/provider/:provider_id', AvaliacaoController.getAvaliacaoForProvider);

// User
routes.get('/users/profile', UserController.show);
routes.put('/users', UserController.update);

// Agendamentos
routes.get('/agendamentos/user', AgentamentoUserController.getAcceptedSchedules);
routes.get('/agendamento/:provider_id', AgentamentoUserController.getAcceptedSchedulesFromProvider);
routes.get('/agendamentos/nao/confirmados', AgentamentoUserController.getUnconfirmedSchedules);
routes.post('/agendamenos/aceitar', AgentamentoUserController.aceitarAgendamento);
routes.delete('/agendamentos/:id', AgentamentoUserController.cancelarAgendamento);
routes.get('/agendamentos/pet/:pet_id', AgentamentoUserController.getPetSchedules);

// Chat
routes.post('/chat/provider/:providerId/pet/:petId', ChatController.store);

// Pets
routes.get('/pets', PetController.getUserPets);
routes.post('/pets', PetController.createPet);
routes.put('/pets/:id', PetController.updatePet);
routes.delete('/pets/:id', PetController.removePet);

// Cartão de crédito
routes.post('/credit-card', CreditCardController.store);
routes.put('/credit-card/:id', CreditCardController.update);
routes.delete('/credit-card/:id', CreditCardController.delete);

// Rotas protegidas por autenticação de provider
routes.use(authProvider);

// Provider
routes.get('/providers/profile', ProviderController.show);
routes.put('/providers/', ProviderController.update);

// Agendemantos
routes.post('/agendamentos', AgendamentoController.store);
routes.get('/agendamentos/provider', AgendamentoController.getProviderAppointmens);

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
routes.get('/exames/pet/:id', ExameController.getPetExames);

routes.use(authAdmin);

routes.put('/admin', AdminController.update);

// Posts
routes.post('/posts', PostController.store);
routes.put('/posts/:id', PostController.update);
routes.delete('/posts/:id', PostController.delete);

routes.post('/promocoes', PromocoesController.store);
routes.put('/promocoes/:id', PromocoesController.update);
routes.delete('/promocoes/:id', PromocoesController.delete);

routes.get('/admin/pending/provider', AdminProviderController.getPendingProvider);
routes.get('/admin/approved/provider', AdminProviderController.getApprovedProvider);
routes.get('/admin/rejected/provider', AdminProviderController.getRejectedProvider);


routes.put('/admin/approve/:provider_id', AdminProviderController.approveProvider);

module.exports = routes;
