import express from 'express'
import routes from './routes'
import cors from 'cors'

const app = express()

//GET : Buscar/listar informações
//POST : Cria informações 
//PUT : Atualiza informações
//DELETE : Deleta informações 


//Corpo: Dados para criação de um registro
//Route Params : identificar qual recurso atualizar
//Query Params: paginação, filtros, ordenação

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }))
app.use(routes)


app.listen(3333)