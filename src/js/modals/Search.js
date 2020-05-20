import axios from 'axios';
export default class Search{

    constructor(query){
        this.query = query;
    }

    async getresults(){
        try{
        
        const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
        this.result = res.data.recipes;
        }
        catch{
            alert(`No search results for ${this.query}`);
        }
    }
}