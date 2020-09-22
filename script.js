async function render()
{
  let favourites =await JSON.parse(localStorage.getItem("fav")); 
  console.log(favourites);
  let oth=document.querySelectorAll(".add-to-fav");
  for(let i=0;i<oth.length;i++)
  {
    if(favourites.find(oth[i].getAttribute("data-id"))===-1)
    {
      oth[i].innerHTML="Add to favourites";
      oth[i].classList.remove("btn-danger");
      oth[i].classList.add("btn-primary");
    }
    else
    {
      oth[i].innerHTML="Remove from favourite";
      oth[i].classList.remove("btn-primary");
      oth[i].classList.add("btn-danger");
    }
  }
}
render();
document.body.addEventListener('keyup',fetch_details);
//http://cors-anywhere.herokuapp.com
let url='https://superheroapi.com/api/3305229059513108/'
async function fetch_details()
{
  let value=document.querySelector("#search-bar").value;
  let promise1=await fetch(url+"search/"+value);
  let arrJSON=await promise1.json();
  let arr=arrJSON.results;
  let ptr=document.querySelector(".fetch-heroes");
  ptr.innerHTML="";
  let id;
  for(let i=0;i<arr.length;i++)
  {
    id=arr[i].id;
    let name=arr[i].name;
    let img_url=arr[i].image.url;
    let power=arr[i].powerstats;
    let temp=`<div class="card" style="width: 18rem; background-color:cyan; margin:auto;">
            <img class="card-img-top" src=" ${img_url} " alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title get-name">${name}</h5>
            <p class="get-id">${id}</p>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div class="card-body">
            <span>
              <a href="#" class="add-to-fav card-link btn btn-primary" data-id="${id}">Add to Fav</a>
              <a href="#" class=" view-details card-link btn btn-primary" data-id="${id}">Details...</a>
              </span>
            </div>
            </div>`; 
    ptr.innerHTML+=temp;
  }
  get_hero();
  make_favourite();
  render();
}
function get_hero()
{
  let oth=document.querySelectorAll(".view-details");
    for(let i=0;i<oth.length;i++)
    {
      oth[i].addEventListener('click',function(e)
      {
        let id=e.target.getAttribute("data-id");
        console.log(id);
        e.preventDefault();
        localStorage.setItem("id",id);
        window.location.href="/superdetail.html";
      }
      );
    }
    render();
}
function make_favourite()
{
  let oth=document.querySelectorAll(".add-to-fav");
  for(let i=0;i<oth.length;i++)
  {
    oth[i].addEventListener('click',function(e)
    {
      e.preventDefault(); 
      let favourites = JSON.parse(localStorage.getItem("fav"));
      if( favourites== null)
         favourites = [];
      let entry=e.target.getAttribute("data-id").toString();
      if(favourites.indexOf(entry)===-1)
      {
        console.log(" in add favourites");
        favourites.push(entry);
        console.log(favourites);
        localStorage.setItem("fav", JSON.stringify(favourites));
        oth[i].innerHTML="Remove from Favourites";
      }
      else{
        console.log("in remove favourites");
        favourites.splice(favourites.indexOf(entry),1);
        localStorage.setItem("fav", JSON.stringify(favourites));
        oth[i].innerHTML="Add to Favourites";
        }
       
      }
    );
  }
  render();
}
