import axios from 'axios';
export default class Recipe{
    constructor(id){
        this.id = id;
    }
    async getrecipe(){
        try{
                const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
                this.title = res.data.recipe.title;
                this.author = res.data.recipe.publisher;
                this.img = res.data.recipe.image_url;
                this.url = res.data.recipe.source_url;
                this.contents = res.data.recipe.ingredients;
        }
        catch(error){
            console.log(error);
            alert('Something went wrong');
        }
    }

    calcTime(){
        const num_ing = this.contents.length;
        const period = Math.ceil(num_ing/3);
        this.time = period*15;
    };

    calcServing(){
        this.serving = 4;
    }

    parseIng(){

        const unitLong = ['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const unitShort = ['tbsp','tbsp','oz', 'oz','tsp','tsp', 'cup','pound'];

        const ingrediants = this.contents.map(el=>{
            // uniform units
            let ing = el.toLowerCase();
            unitLong.forEach((unit,i)=>{
                ing = ing.replace(unit,unitShort[i]);
            });


            // remove ()
            ing  = ing.replace(/ *\([^)]*\) */g,' ');


            // parse ingrediants into count,unit, ingrediants
            const arr = ing.split(' ');
            const unit_index = arr.findIndex(el2=>unitShort.includes(el2));
            let objIng;
            if (unit_index>-1){
                // unit +
                const arrcnt = arr.slice(0,unit_index);
                let count;
                if(arrcnt.length===1){
                    count =eval(arr[0].replace('-','+'));
                }
                else{
                    count = eval(arr.slice(0,unit_index).join('+'));
                }
                objIng={
                    count:count,
                    unit:arr[unit_index],
                    ing:arr.slice(unit_index+1).join(' ')
                }

            }
            else if(parseInt(arr[0],10)){
                    // No unit but 1st element is number
                    objIng={
                        count:parseInt(arr[0],10),
                        unit:'',
                        ing:arr.slice(1).join(' ')
                    }

            }
            else if(unit_index ===-1){
                // no unit and no number
                objIng={
                    count:1,
                    unit:'',
                    ing
                }
            }            
            return objIng;
        });
        this.contents = ingrediants;

    }
    update_serving(type){
        // update serving 
            const newServ = type==='dec'?this.serving-1:this.serving+1;

        // update ing
            this.contents.forEach(el=>{
                el.count=el.count*(newServ/this.serving);
            })

            this.serving = newServ;

    }
}