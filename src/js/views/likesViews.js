import {elements} from './base';
import { limiter } from "./searchView";

export const ToggleLikebtn = isliked=>{

// img/icons.svg#icon-heart-outlined
    const iconStr = isliked?'icon-heart':'icon-heart-outlined';

    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconStr}`);

};

export const likes_menu_ctrl=(numLikes)=>{
    elements.likes_menu.style.visibility = numLikes>0?'visible':'hidden'; 

};


export const renderLikes = (like)=>{
    const markup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="Test">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limiter(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
    `
    elements.like_list.insertAdjacentHTML('beforeend',markup);
}


export const delete_like = (id) =>{
    const el = document.querySelector(`.likes__link[href*="#${id}"]`).parentElement;
    if(el){
        el.parentElement.removeChild(el);
    }

}