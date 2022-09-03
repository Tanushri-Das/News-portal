
const loadCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category))
}
const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerText='';
    

const categoryList = document.createElement('li');
categoryList.classList.add('col');
categoryList.innerHTML=`
<h5>Home</h5>`
categoriesContainer.appendChild(categoryList)
for(const category of categories){
    const categoryList = document.createElement('li');
    categoryList.classList.add('col');
    categoryList.innerHTML = `
   
    <h5 onclick="loadNewsDetails('${category.category_id}')">${category.category_name}</h5>
    `;
    categoriesContainer.appendChild(categoryList)
}

}

const loadNewsDetails = id =>{
     toggleSpiner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLoadNews(data.data))
}

const displayLoadNews = news =>{
    const newsCategoryContainer = document.getElementById('news-category-container');
    newsCategoryContainer.innerText='';
    const noNews = document.getElementById('no-news-message');
    if (news.length === 0) {
        noNews.classList.remove('d-none');
        
    }
    else {
        noNews.classList.add('d-none');
    }
    const noItemFound = document.getElementById('no-item-found');
    if(news.length === 0 || news.length > 0){
        noItemFound.innerHTML=`
        <p>${news.length} items in this section</p>`;
        noItemFound.classList.remove('d-none');
    }
    else{
        noItemFound.classList.add('d-none');
    }

    
    
    for(const myNews of news){
       
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <div class="card">
            <img src="${myNews.thumbnail_url}" class="card-img-top" alt="...">
            <div class="card-body">
              
                <p class="card-text">${myNews.title}</p>
                <p class="card-text">${myNews.details.slice(0,140)+"..."}</p>
                <img src="${myNews.author.img}" class="rounded-circle w-50 d-inline" alt="...">
                <h4 class="card-title mt-2">${myNews.author.name ? myNews.author.name : 'No author name available'}</h4>
                <p>Published Date : ${myNews.author.published_date ? myNews.author.published_date : 'No published date available'}</p>
                <p><i class="fa-light fa-eye">${myNews.total_view ? myNews.total_view : 'No total view found'}</i></p>
                <button type="button" onclick="loadModalNewsDetails('${myNews._id}')" class="btn btn-primary fs-5" data-bs-toggle="modal" data-bs-target="#newsDetailModal">
                Show Details
              </button>
             
            </div>
        </div>
        `;
        newsCategoryContainer.appendChild(newsDiv)
    }
    toggleSpiner(false);
}
const toggleSpiner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}
const loadModalNewsDetails = id =>{

    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLoadModalNewsDetails(data.data[0]))
}
const displayLoadModalNewsDetails = details =>{
   
    const newsDetailModalThumbnail = document.getElementById('news-detail-modal-thumbnail');
    newsDetailModalThumbnail.src = details.thumbnail_url;
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = details.title;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
    <p>Details : ${details.details.slice(0,120) +"..."}</p>
    <p>Author Name : ${details.author.name ? details.author.name : 'No author name found'}</p>
    <p>Published Date : ${details.author.published_date ? details.author.published_date : 'No published date found'}</p>
    <p>Total View : ${details.total_view ? details.total_view : 'No view found'}</p>
    `
}
// loadModalNewsDetails()



// loadNewsDetails()

loadCategories()
