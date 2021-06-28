import {Request,Response} from 'express'
import axios from 'axios'
const db = require("../config/database");


export default class LocalizacaoController{
    async getLocalizacoes(request:Request,response: Response){
        const eps = await db.query(
            "SELECT * FROM localizacao"
        );
        response.send(eps.rows)
    }
    async createLocalizacao(request:Request,response: Response){
        
        const resp = await db.query(
            "INSERT INTO localizacao (nome, tipo, dimensao) VALUES ($1, $2, $3)",
            [request.body.nome, request.body.tipo, request.body.dimensao]
        );
        response.status(200).send("Success")
    }
    async populate(request:Request,response: Response){
        for(let i = 1; i <= 6; i++){
            axios.request( {method: 'GET', url: `https://rickandmortyapi.com/api/location/?page=${i}`}).then(function (response) {
                response.data.results.forEach(async (element : any) => {
                console.log(element)
                await db.query(
                    "INSERT INTO localizacao (nome, tipo, dimensao) VALUES ($1, $2, $3)",
                    [element.name, element.type, element.dimension]
                );
                });
              }).catch(function (error) {
                console.error(error);
              });
        }
       

        response.status(200).send("Success")
    }
}

