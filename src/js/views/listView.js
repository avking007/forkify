import {elements} from './base';

export const render_item=(item)=>{
    const markup=`
    <li class="shopping__item" data-itemid=${item.id}>
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}" class="shopping__count--val">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ing}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>`;
    elements.shopping_list.insertAdjacentHTML('beforeend',markup);


};
export const render_del_btn = ()=>{

    const markup=`<button class="btn-small recipe__btn list-del-all">
        <span>Empty Shopping List</span>
            </button>`;
    elements.shopping_list.insertAdjacentHTML('afterend',markup);
};

export const del_del_btn = ()=>{
    const del = document.querySelector('.list-del-all');
    if(del){
        del.parentNode.removeChild(del);
    }
};


export const delete_item=(id)=>{

    const item = document.querySelector(`[data-itemid="${id}"]`);
    if(item) item.parentElement.removeChild(item);

};

export const delete_all = ()=>{

    elements.shopping_list.innerHTML = '';
};