import express from 'express'
import EpisodioController from './controllers/episodioController'
import PersonagemController from './controllers/personagemController'
import LocalizacaoController from './controllers/localizacaoController'
import EpisodioPersonagemController from './controllers/episodioPersonagemController'
const routes = express.Router()

const episodioController = new EpisodioController()
const personagemController = new PersonagemController()
const localizacaoController = new LocalizacaoController()
const episodioPersonagemController = new EpisodioPersonagemController()

routes.get('/episodios/',episodioController.getEpisodios)
routes.post('/episodios/',episodioController.createEpisodio)
routes.post('/episodios/populate',episodioController.populate)

routes.get('/personagem/',personagemController.getPersonagens)
routes.post('/personagem/',personagemController.createPersonagem)
routes.post('/personagem/populate',personagemController.populate)

routes.get('/localizacao/',localizacaoController.getLocalizacoes)
routes.post('/localizacao/',localizacaoController.createLocalizacao)
routes.post('/localizacao/populate',localizacaoController.populate)

routes.get('/episodio_personagem/',episodioPersonagemController.getEpisodiosPersonagens)
routes.post('/episodio_personagem/',episodioPersonagemController.createEpisodioPersonagem)
routes.post('/episodio_personagem/populate',episodioPersonagemController.populate)

export default routes