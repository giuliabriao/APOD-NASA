let buttonGenerate = document.querySelector("#buttonGenerate");
buttonGenerate.addEventListener("click", generateDate);

let inputDay = document.querySelector("#inputDay");
let inputMonth = document.querySelector("#inputMonth");
let inputYear = document.querySelector("#inputYear");


class container{
    constructor(date, image, text){
        this._date = date;
        this._image = image;
        this._text = text;
    }
        generateDiv(){
            let container = document.querySelector("#container");

            let dateContainer = document.createElement("h3");
            dateContainer.setAttribute("class", "date");
            dateContainer.textContent = `${this._date}`;            
            container.appendChild(dateContainer);

            let imageContainer = document.createElement("img");
            imageContainer.setAttribute("class", "img");
            imageContainer.src = this._image;
            container.appendChild(imageContainer);

            let textContainer = document.createElement("p");
            textContainer.textContent = `${this._text}`;
            container.appendChild(textContainer);

            // container.innerHTML = "";
        }
    }

function generateDate(){
    let day = inputDay.value;
    let month = inputMonth.value;
    let year = inputYear.value;

    let request = new XMLHttpRequest();

    let urlRequest = `https://api.nasa.gov/planetary/apod?api_key=zhTva976t7FO16TGjpw0asHHH0DdpKYlbTRCoqng&date=${year}-${month}-${day}`;
    request.open("GET", urlRequest);

    request.addEventListener("load", function(){
        if(request.status == 200){
            let response = JSON.parse(request.responseText);
            
            let divImage = new container(response.date, response.url, response.explanation);
            divImage.generateDiv();
        }else{
            let erro = document.createElement("p");
            
            erro = "Ops, deu erro, tente denovo! ):"
        }
    })

    request.send();
}