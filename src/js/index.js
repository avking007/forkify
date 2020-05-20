import Search from './modals/Search';
import Recipe from './modals/Recipe';
import List from './modals/List';
import Likes from './modals/Likes';
import {elements, render_loader,clr_loader} from './views/base';
import * as search_view from './views/searchView';
import * as recipe_view from './views/recipeView';
import * as list_view from './views/listView';
import * as likes_view from './views/likesViews';


const state = {};

const search_ctrl = async() =>{
    const query = search_view.getInp();

    if (query){
        // 1)new search obj and add to state
        state.search = new Search(query);

        // 2)prepare UI for results
        search_view.clear_inp();
        search_view.clear_res();
        render_loader(elements.searchRS);

        // 3)Search recipe

        try
        {
            await state.search.getresults();

            // 4)render res on UI
            clr_loader();
            search_view.render_result(state.search.result);
        }
        catch{
            console.log('');
        }
    }

}

elements.search_form.addEventListener('submit',event=>{
    event.preventDefault();
    search_ctrl();

});

elements.search_res_list_pages.addEventListener('click', e=>{
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goto = parseInt(btn.dataset.goto,10);
        search_view.clear_res();
        search_view.render_result(state.search.result, goto);
    }
});

// recipe ctrl

const recipectrl= async() =>{
    // get id form url
    const id = parseInt(window.location.hash.replace('#',''),10);

    if (id){
        // prepare changes to UI
        recipe_view.clear_res();
        render_loader(elements.recipe);
        // create new recipe
        if(state.search)search_view.highlight_sel(id);

        state.recipe = new Recipe(id);

        // get recipe data and parse ing
        try{
            await state.recipe.getrecipe();
            state.recipe.parseIng();

        // calc serving time and period
            state.recipe.calcServing();
            state.recipe.calcTime();

        // render recipe
            clr_loader();
            recipe_view.render_recipe(state.recipe,state.likes.isliked(id));
        }
        catch(err){
            console.log(err);
            alert("Error processing");
        }

    }

};

['hashchange','load'].forEach(event=>window.addEventListener(event,recipectrl));

// 
// List ctrl
// 
const control_list = ()=>{
    // create new list if none

    if(!state.list){
        state.list = new List()
    }
    // add each ing to list and ui
        state.recipe.contents.forEach(el=>{
            const item = state.list.add_item(el.count,el.unit,el.ing);
            list_view.render_item(item);
        });
        list_view.render_del_btn();

};


// handle delete and update list
elements.shopping_list.addEventListener('click', e=>{
    const id = e.target.closest('.shopping__item').dataset.itemid;
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        // delete from state 
            state.list.delete_item(id);
        // delete from UI
            list_view.delete_item(id);

    }
    // handle count update
    else if(e.target.matches('.shopping__count--val')){
        const val = parseFloat(e.target.value);
        state.list.updateCount(id,val);
    }

});


// handle recipe btn  clicks

const controlLike = ()=>{
    if(!state.likes){
        state.likes = new Likes();
    }
    const id = state.recipe.id;
    if(!state.likes.isliked(id)){
        // user not liked recipe

        // add like to state
        const newLikes = state.likes.addlikes(id,state.recipe.title,state.recipe.author, state.recipe.img);
        
        // toggle like btn
        likes_view.ToggleLikebtn(true);

        // add like to UI
        likes_view.renderLikes(newLikes);


    }
    else{
        // use has liked recipe already

        // remove like from state
        state.likes.dellike(id)

        // toggle like bnt
        likes_view.ToggleLikebtn(false);


        // remove like from UI
        likes_view.delete_like(id);

    }
    likes_view.likes_menu_ctrl(state.likes.getNumberoflikes());

}

elements.recipe.addEventListener('click', e=>{
    if(e.target.matches('.btn-dec, .btn-dec *'))
    {
        // dec click
        if(state.recipe.serving > 1)
        state.recipe.update_serving('dec');
        recipe_view.render_recipe(state.recipe,state.likes.isliked());

    }
    else if(e.target.matches('.btn-inc, .btn-inc *'))
    {
        // inc click
        state.recipe.update_serving('inc');
        recipe_view.render_recipe(state.recipe,state.likes.isliked());
    }
    else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        control_list();   
    }

    else if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLike();
    }
});



// restore like _recipe when page loads

window.addEventListener('load',()=>{
    state.likes = new Likes();
    // restore likes
    state.likes.read_stg();
    // toggle like btn
    likes_view.likes_menu_ctrl(state.likes.getNumberoflikes());
    // render likes
    state.likes.likes.forEach(like=>likes_view.renderLikes(like));

    });

// del all items from shopping list

elements.shopping.addEventListener('click',e=>{
    if (e.target.matches('.list-del-all, .list-del-all *'))
    {
        state.list.clear_all();
        list_view.delete_all();
        list_view.del_del_btn();
    }
    


});
