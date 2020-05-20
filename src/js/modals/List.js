import uniqid from 'uniqid';
export default class List{

    constructor(){
        this.items = [];
    }
    add_item(count,unit,ing){
        const item = {
            count,
            unit,
            ing,
            id:uniqid()
        }
        this.items.push(item);
        return item;
    }

    delete_item(id){
        const idx = this.items.findIndex(el=>el.id===id)
        this.items.splice(idx,1);
    }

    update_count(id,count){
        this.items.find(el=>el,id===id).count = count;
    }
    clear_all(){
        this.items = [];
    }
}