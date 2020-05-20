export default class Likes{
    constructor(){
        this.likes=[]
    }
    addlikes(id,title ,author,img){
        const like = {id,title,author,img}
        this.likes.push(like);
        // persist data in local storage
        this.persist_data(); 
        return like;


    }
    dellike(id){
        const idx = this.likes.findIndex(el=>el.id ===id)
        this.likes.splice(idx,1);
    // del  data from local stg

        this.persist_data();

    }
    isliked(id){
        return this.likes.findIndex(el=>el.id === id)!== -1;
    }
    getNumberoflikes(){
     
        return this.likes.length;
    }

    persist_data(){
        localStorage.setItem('likes',JSON.stringify(this.likes))
    }

    read_stg(){
        const stg = JSON.parse(localStorage.getItem('likes'))
        if(stg){
            // restore likes from local stg
            this.likes = stg;
        }
    }

}