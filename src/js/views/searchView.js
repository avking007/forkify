import {elements} from './base';

export const getInp =()=> elements.search_inp.value;

export const clear_inp=()=>{
    elements.search_inp.value = '';
};

export const highlight_sel =id =>{
    const res = Array.from(document.querySelectorAll('.results__link'));
    res.forEach(el=>{
        el.classList.remove('results__link--active');
    })
    document.querySelector(`.results__link[href *="#${id}"]`).classList.add('results__link--active');
};

export const clear_res=()=>{
    elements.search_res_list.innerHTML='';
    elements.search_res_list_pages.innerHTML = '';
};

export const limiter =(title, limit=17)=>{
    const rs = [];
    if(title.length >limit){
        title.split(" ").reduce((acc, curr)=>{
            if(acc+curr.length <= limit){
                rs.push(curr);
            }
            return acc + curr.length;
        },0);

    return `${rs.join(" ")}...`;
    }
    return title;
};


export const render_recipe = rec=>{
    const markup = `
    <li>
    <a class="results__link" href="#${rec.recipe_id}">
        <figure class="results__fig">
            <img src="${rec.image_url}" alt="${rec.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limiter(rec.title)}</h4>
            <p class="results__author">${rec.publisher}</p>
        </div>
    </a>
    </li>`
    elements.search_res_list.insertAdjacentHTML('beforeend',markup);

}

const create_btn =(page,type)=> `

        <button class="btn-inline results__btn--${type}" data-goto=${type==='prev'?page-1:page+1}>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type==='prev'?'left':'right'}"></use>
            </svg>
            <span>Page ${type==='prev'?page-1:page+1}</span>
        </button>
        `

const render_btn=(page,res_num, res_per_page)=>{
    const pgs = Math.ceil(res_num/res_per_page);

    let btn;
    if(page == 1 && pgs >1){

        // btn for nxt page
        btn = create_btn(page,'next');
    }
    else if(page == pgs & pgs > 1)
    {
        // btn for prev page
        btn = create_btn(page,'prev');

    }
    else if(page<pgs)
    {
        // btn for prev
        btn =  `${create_btn(page,'prev')}
                ${create_btn(page,'next')}`;

        // btn for nxt 
    }
    elements.search_res_list_pages.insertAdjacentHTML('afterbegin',btn);


};

export const render_result= (rec,page=1,res_per_page=10) =>{

    // render recipe
    const st = (page-1)*res_per_page;
    const end = page*res_per_page;
    rec.slice(st,end).forEach(render_recipe);
    
    // ṛender pagination
    render_btn(page,rec.length,res_per_page);

};