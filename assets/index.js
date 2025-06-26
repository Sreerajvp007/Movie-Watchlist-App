let inputSearch =document.getElementById("inputSearch");
let inputBtn =document.getElementById("inputBtn");
let searchItems =document.getElementById("searchItems");
let watchlistbody =document.getElementById("offBody");
let watchArr =[];
let tempArr=[];
let searchMovie;



async function searchMovies(){
    
    searchItems.innerHTML="";
    if(inputSearch.value ==""){
        alert("please enter the input correctly");
    }else{
        searchMovie =inputSearch.value;
        inputSearch.value ="";
        const url = `https://www.omdbapi.com/?s=${searchMovie}&apikey=409b5c8d`
    try{
        const data =await fetch(url);
        const movies =await data.json();
        console.log(movies);
        searchList(movies);
        
    }catch(err){
        console.log("API failed: ",err.message)
    }
    }
    
     
}

 function searchList(movies){
    
    tempArr =movies.Search;
    tempArr.forEach(x => {
        
        let currentMovie =x;
        let id =x.imdbID;
        let poster =x.Poster;
        let title =x.Title;
        let year =x.Year;
        
       const movieItem = document.createElement("div");
       movieItem.classList.add("movie-item","border","rounded","p-1","mb-1","col-10","col-md-4");
       movieItem.innerHTML = `<div class="movie-img me-3 d-flex flex-column justify-content-center align-items-center" style="width: 90px; height: 90px;">
                                <img src="${poster}" alt="Movie Poster" class="img-fluid rounded" style="width: 90px; height: 90px;">
                              </div>
                              <div class="movie-text text-start">
                                <h5 class="mb-1 text-white" id="movie-title">${title}</h5>
                                <p class="mb-1 text-white" >Year: <span id="movie-year">${year}</span></p>
                              </div>
                              <button onclick="addToWatchlist('${id}')" id="${id}"><i class="fa-solid fa-plus fa-2xl addIcon" style="color: #ffffff;" id="icon-${id}"  ></i></button>`
         searchItems.appendChild(movieItem);
         
                          
        
    });
    
 }

 function addToWatchlist(id){
     const addbtn = document.getElementById(id);
     const icon = document.getElementById(`icon-${id}`);
     icon.classList.remove('fa-plus');
     icon.classList.add('fa-circle-check')
    
     addbtn.removeAttribute("onclick");

    const selectedMovie = tempArr.find(x => x.imdbID === id);
    const isPresent = watchArr.includes(selectedMovie); 
    if (selectedMovie !=null && isPresent ==false) {
        watchArr.push(selectedMovie);
        loadWatchlist(selectedMovie);
    } else {
        console.log("Movie not found");
    }
    console.log(id);
    
 }
function loadWatchlist(x){
    
    const watchItem = document.createElement("div");
    watchItem.classList.add("movie-item","border","rounded","p-1","mb-1");
    watchItem.innerHTML = `<div class="movie-img me-3 d-flex flex-column justify-content-center align-items-center" style="width: 90px; height: 90px;">
                                <img src="${x.Poster}" alt="Movie Poster" class="img-fluid rounded" style="width: 90px; height: 90px;">
                            </div>
                            <div class="movie-text text-start">
                                <h5 class="mb-1 text-white" id="movie-title">${x.Title}</h5>
                                <p class="mb-1 text-white" >Year: <span id="movie-year">${x.Year}</span></p>
                            </div>
                            <i class="fa-solid fa-trash fa-xl remove" style="color: #ff0000;"  onclick="removeMovie(this, '${x.imdbID}')" value="${x.imdbID}" id="${x.imdbID}">`
                            
    watchlistbody.appendChild(watchItem);

    

}
function removeMovie(e,id){
    const parent =e.parentElement;
    parent.remove();
    const icon = document.getElementById(`icon-${id}`);
    const addbtn = document.getElementById(id);
    
    icon.classList.remove('fa-circle-check');
    icon.classList.add('fa-plus')
    addbtn.setAttribute('onclick',"addToWatchlist(this.id)");
    watchArr = watchArr.filter((x)=>x.imdbID !== id)

}





// https://www.omdbapi.com/?s=bazooka&apikey=409b5c8d