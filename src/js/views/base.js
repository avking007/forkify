export const elements = {
    search_inp : document.querySelector('.search__field'), 
    search_form: document.querySelector('.search'),
    searchRS:document.querySelector('.results'),
    search_res_list: document.querySelector('.results__list'),
    search_res_list_pages:document.querySelector('.results__pages'),
    recipe:document.querySelector('.recipe'),
    shopping_list:document.querySelector('.shopping__list'),
    likes_menu : document.querySelector('.likes__field'),
    like_list:document.querySelector('.likes__list'),
    shopping : document.querySelector('.shopping')
};

export const newload ={
    loader:'loader'
}

export const render_loader = parent =>{
        const loader = `
        <div class="${newload.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>`;

        parent.insertAdjacentHTML('afterbegin',loader);
    
};

export const clr_loader = ()=>{

    const ld = document.querySelector(`.${newload.loader}`);
    if(ld){
        ld.parentNode.removeChild(ld);
    }
};