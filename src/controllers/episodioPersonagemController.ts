import {Request,Response} from 'express'
import axios from 'axios'
const db = require("../config/database");

export default class EpisodioPersonagemController{
    async getEpisodiosPersonagens(request:Request,response: Response){
        const eps = await db.query(
            "SELECT * FROM episodio_personagem"
        );
        response.send(eps.rows)
    }
    async createEpisodioPersonagem(request:Request,response: Response){
        
        const resp = await db.query(
            "INSERT INTO episodio_personagem (id_personagem, id_episodio) VALUES ($1, $2)",
            [request.body.id_personagem, request.body.id_episodio]
        );
        response.status(200).send("Success")
    }
    async populate(request:Request,response: Response){
        for(let i = 1; i <= 34; i++){
            axios.request( {method: 'GET', url: `https://rickandmortyapi.com/api/character/?page=${i}`}).then(function (response) {
                response.data.results.forEach(async (element : any) => {
                const eps = element.episode.map((ep:any)=>ep.split('https://rickandmortyapi.com/api/episode/')[1])
                eps.forEach(async(ep:any) => {
                    await db.query(
                    "INSERT INTO episodio_personagem (id_personagem, id_episodio) VALUES ($1, $2)",
                    [element.id, ep]
                );
                });
                });
              }).catch(function (error) {
                console.error(error);
              });
        }
        response.status(200).send("Success")
    }
}