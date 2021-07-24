import {Request,Response} from 'express'
import axios from 'axios'
import monthToNumber from '../utils/monthToNumber';
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
                const data = element.air_date.split(" ")

                await db.query(
                    "INSERT INTO episodios (nome_episodio, data_exibicao_episodio, codigo_episodio) VALUES ($1, $2, $3)",
                    [element.name, `${data[2]}-${monthToNumber(data[0])}-${data[1].slice(",",1)}`, element.episode]
                );
                });
              }).catch(function (error) {
                console.error(error);
              });
        }
       

        response.status(200).send("Success")
    }
}

