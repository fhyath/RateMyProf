const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
let ul = document.getElementById("ul-el")

inputBtn.addEventListener("click", getInfo)

function getInfo(){
    fullName = inputEl.value.split(" ")
    const url = `https://fast-eyrie-54159.herokuapp.com/https://search-production.ratemyprofessors.com/solr/rmp/select/?solrformat=true&rows=2&wt=json&q=${fullName[0]}+${fullName[1]}`
   // console.log(url)
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.send();

    Http.onload = (e) => {
        const obj = JSON.parse(Http.responseText)
        console.log(obj)

        let data = {
            name: obj.response.docs[0]["teacherfullname_s"],
            school: obj.response.docs[0]["schoolname_s"],
            department: obj.response.docs[0]["teacherdepartment_s"],
            averageRating: obj.response.docs[0]["averageratingscore_rf"],
            averageeasyscore_rf : obj.response.docs[0]["averageeasyscore_rf"] 
        }
        
        ul.innerHTML = `<li> <span class = "heading">Professor: </span>${data.name}</li> <li> 
        <span class = "heading">School: </span>${data.school}</li>  <li> <span class = "heading">Department: </span>${data.department}</li>  
        <li> <span class = "heading">Average Rating: </span>${data.averageRating}/5</li> 
        <li><span class = "heading"> Level of Difficulty: </span>${data.averageeasyscore_rf}/5</li>`
        
    }
}
