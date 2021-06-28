import {Request,Response} from 'express'
import axios from 'axios'
const db = require("../config/database");

export default class PersonagemController{
    async getPersonagens(request:Request,response: Response){
        const eps = await db.query(
            "SELECT * FROM personagem"
        );
        response.send(eps.rows)
    }
    async createPersonagem(request:Request,response: Response){
        
        const resp = await db.query(
            "INSERT INTO personagem (nome, genero, especie, origem, status, subespecie, localizacao) VALUES ($1, $2, $3, $4,$5,$6,$7)",
            [request.body.nome, request.body.genero, request.body.especie,request.body.origem,request.body.status,request.body.subespecie,request.body.localizacao]
        );
        response.status(200).send("Success")
    }
    async populate(request:Request,response: Response){
        for(let i = 1; i <= 34; i++){
            axios.request( {method: 'GET', url: `https://rickandmortyapi.com/api/character/?page=${i}`}).then(function (response) {
                response.data.results.forEach(async (element : any) => {
                console.log(element)
                await db.query(
                    "INSERT INTO personagem (nome, genero, especie, origem, status, subespecie, localizacao) VALUES ($1, $2, $3, $4,$5,$6,$7)",
                    [element.name, element.gender, element.species,element.origin.name,element.status,element.species,element.location.name]
                );
                });
              }).catch(function (error) {
                console.error(error);
              });
        }
       

        response.status(200).send("Success")
    }
}


// await db.query(
//     "INSERT INTO episodios (nome, data_exibicao, codigo_episodio) VALUES ($1, $2, $3)",
//     ['product_name', new Date(), 'price']
// );
