const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const inputBtn2 = document.getElementById("input-btn2")
let ul = document.getElementById("ul-el")

inputBtn.addEventListener("click", getInfo)
inputBtn2.addEventListener("click", clearInfo)

function clearInfo(){
    ul.innerHTML = ""
}

function getInfo(){
    fullName = inputEl.value.trim()
    fullName = fullName.split(' ').join('+')
   // console.log(fullName)
    const url = `https://fast-eyrie-54159.herokuapp.com/https://search-production.ratemyprofessors.com/solr/rmp/select/?solrformat=true&rows=2&wt=json&q=${fullName}`
  //  console.log(url)
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.send();

    Http.onload = (e) => {
        const obj = JSON.parse(Http.responseText)
        console.log(obj)

        for(i = 0; i<obj.response.docs.length; i++){
        let data = {
            name: obj.response.docs[i]["teacherfullname_s"],
            school: obj.response.docs[i]["schoolname_s"],
            department: obj.response.docs[i]["teacherdepartment_s"],
            averageRating: obj.response.docs[i]["averageratingscore_rf"],
            averageeasyscore_rf : obj.response.docs[i]["averageeasyscore_rf"],
            total_number_of_ratings_i : obj.response.docs[i]["total_number_of_ratings_i"],
            tags : "None"  
        }
        if(obj.response.docs[i].hasOwnProperty('tag_s_mv')){
            let string = ""
            for(j=0; j<obj.response.docs[i].tag_s_mv.length; j++){
                string+=obj.response.docs[i].tag_s_mv[j]+ ", "
            }
            data.tags = string
        }
        
        ul.innerHTML += `<li> <span class = "heading">Professor: </span>${data.name}</li> <li> 
        <span class = "heading">School: </span>${data.school}</li>  <li> <span class = "heading">Department: </span>${data.department}</li>  
        <li> <span class = "heading">Average Rating: </span>${data.averageRating}/5</li> 
        <li><span class = "heading"> Level of Difficulty: </span>${data.averageeasyscore_rf}/5</li>
        <li><span class = "heading"> Number of Ratings: </span>${data.total_number_of_ratings_i}</li>
        <li><span class = "heading"> Tags: </span>${data.tags}</li><br/>`
        
    }
}
}
