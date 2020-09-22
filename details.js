
let id=localStorage.getItem("id");
// console.log(id);
// document.body.innerHTML="";
// document.body.innerHTML+=ht;
let url='https://superheroapi.com/api/3305229059513108/'+id;
async function hero_details()
{
  let promise1=await fetch(url);
  let arrJSON=await promise1.json();
  let work=arrJSON.work.occupation +" at "+arrJSON.work.base;
  let img=arrJSON.image.url;
  let name=arrJSON.name;
  //let desc=arrJSON
  let rel=arrJSON.connections.relatives;
  let con=arrJSON.connections["group-affiliation"];
  let val=con;
  let pow=arrJSON.powerstats.combat;
  console.log(arrJSON);
  console.log(pow);
  //height:25vh;width:25vw
  let temp=`<h1 class="text-center text-uppercase" style="color:red;"> ${name}</h1>
  <img src="${img}" alt="hero"  class="rounded mx-auto d-block rounded" style="height:200px;">
  <p>PowerStats: Combat-${pow} </p>
  <li>Affliations: &nbsp;&nbsp; ${con} </li>
  <li><span class="font-weight-bold text-uppercase">Relatives &nbsp;&nbsp;</span>${rel}</li>
  <p><span class="mt-5 font-weight-bold text-uppercase">Work: &nbsp;&nbsp;</span> ${work}</p>`;
  document.querySelector(".sup").innerHTML=temp;
  console.log(arrJSON.powerstats);
}
hero_details();