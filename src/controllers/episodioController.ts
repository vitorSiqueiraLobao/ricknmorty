import {Request,Response} from 'express'
import axios from 'axios'
const db = require("../config/database");


export default class EpisodioController{
    async getEpisodios(request:Request,response: Response){
        const eps = await db.query(
            "SELECT * FROM episodios"
        );
        response.send(eps.rows)
    }
    async createEpisodio(request:Request,response: Response){
        
        await db.query(
            "INSERT INTO episodios (nome, data_exibicao, codigo_episodio) VALUES ($1, $2, $3)",
            [request.body.nome, new Date(request.body.data_exibicao), request.body.codigo_episodio]
        );
        response.status(200).send("Success")
    }
    async populate(request:Request,response: Response){
        for(let i = 1; i <= 3; i++){
            axios.request( {method: 'GET', url: `https://rickandmortyapi.com/api/episode/?page=${i}`}).then(function (response) {
                response.data.results.forEach(async (element : any) => {
                console.log(element)
                await db.query(
                    "INSERT INTO episodios (nome, data_exibicao, codigo_episodio) VALUES ($1, $2, $3)",
                    [element.name, new Date(), element.episode]
                );
                });
              }).catch(function (error) {
                console.error(error);
              });
        }
       

        response.status(200).send("Success")
    }
}

