window.onload = function(){
    generateApod()
}

let buttonGenerate = document.querySelector("#buttonGenerate");
buttonGenerate.addEventListener("click", generateApod);

let inputDay = document.querySelector("#inputDay");
let inputMonth = document.querySelector("#inputMonth");
let inputYear = document.querySelector("#inputYear");

function previousButton(){
    let previous = document.querySelector("#previous");
    previous.addEventListener("click", function(){
        let previousDate = new Date()
    })

}

function nextButton(){
    let next = document.querySelector("#next");
}


class container{
    constructor(title, image, text){
        this.title = title;
        this._image = image;
        this._text = text;
    }
        generateDiv(){
            let divTitle = document.querySelector("#containerTitle");

            let titleContainer = document.createElement("h3");
            titleContainer.setAttribute("class", "title");
            titleContainer.textContent = `${this.title}`;            
            divTitle.appendChild(titleContainer);

            let divImgtext = document.querySelector("#containerImgText");

            let imageContainer = document.createElement("img");
            imageContainer.setAttribute("class", "img");
            imageContainer.src = this._image;
            divImgtext.appendChild(imageContainer);

            let textContainer = document.createElement("p");
            textContainer.setAttribute("class", "text")
            textContainer.textContent = `${this._text}`;
            divImgtext.appendChild(textContainer);

        }
    }

function generateApod(){
    clearDiv()

    let day = inputDay.value;
    let month = inputMonth.value;
    let year = inputYear.value;

    let request = new XMLHttpRequest();

    const nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=zhTva976t7FO16TGjpw0asHHH0DdpKYlbTRCoqng";
    
    let requestUrl = nasaUrl;

    if(day != "" && month != "" && year != ""){
        requestUrl += `&date=${year}-${month}-${day}`
    }
    
    request.open("GET", requestUrl);

    request.addEventListener("load", function(){
        if(request.status == 200){
            let response = JSON.parse(request.responseText);
            
            let divImage = new container(response.title, response.url, response.explanation);
            divImage.generateDiv();

        }else{
            let error = document.createElement("p");      
            error = "Oops, something went wrong, try again! ):"

            let spanError = document.querySelector("#error");
            spanError.append(error);
        }
    })

    request.send();
}

function clearDiv(){
    document.querySelector("#containerTitle").innerHTML = "";
    document.querySelector("#containerImgText").innerHTML = "";
}