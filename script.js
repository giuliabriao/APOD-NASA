window.onload = function(){
    let today = new Date();

    let inputFutureDays = document.querySelector("#inputDate")
    inputFutureDays.setAttribute("max", formatDate(today));

    setDateIntoInput(today); //passa a data dentro do input como a de hoje para que o previous button funcione

    enableOrDisableNext(today);

    generateApod();
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

function setDateIntoInput(date){ //coloca a data dentro do input
    document.querySelector("#inputDate").value = formatDate(date);
}

function getSelectedDate(){ //pega a data selecionada dentro do input
    let inputDate = document.querySelector("#inputDate");

    return inputDate.value;
}

function formatDate(date){ //formata a data para que permaneça apenas como YYYY-MM-DD
    return date.toISOString().substr(0, 10);
}

let generateClick = function(){ //é chamada no clicar do botão Generate
    generateApod();
    enableOrDisableNext();
    enableOrDisablePrevious();
}

let buttonGenerate = document.querySelector("#buttonGenerate");
buttonGenerate.addEventListener("click", generateClick);

function generateApod(){
    clearDiv(); 
    clearError();

    let request = new XMLHttpRequest();

    let date = getSelectedDate();

    let requestUrl = `https://api.nasa.gov/planetary/apod?api_key=zhTva976t7FO16TGjpw0asHHH0DdpKYlbTRCoqng&date=${date}`;
    
    request.open("GET", requestUrl);

    request.addEventListener("load", function(){
        if(request.status == 200){
            let response = JSON.parse(request.responseText);
            
            let divImage = new container(response.title, response.url, response.explanation);
            divImage.generateDiv();

        }else{
            let error = document.createElement("p");      
            error = "Oops, something went wrong, generate again or try another date! ):"

            let spanError = document.querySelector("#error");
            spanError.innerHTML = "";
            spanError.append(error);            
        }
    })

    request.send();
}

let buttonPrevious = document.querySelector("#previous");
buttonPrevious.addEventListener("click", function(){

    changesTheDateForPreviousOrNext(-1); //faz voltar a data
    enableOrDisableNext();
    enableOrDisablePrevious();
})

let buttonNext = document.querySelector("#next");
buttonNext.addEventListener("click", function(){
    changesTheDateForPreviousOrNext(1);
    enableOrDisableNext();
    enableOrDisablePrevious();
})

function changesTheDateForPreviousOrNext(number){
    let selectedDate = new Date(getSelectedDate()); //o getSelectedDate() retorna uma string. Ex: "2021-01-24"
    selectedDate.setDate(selectedDate.getDate() + number); //estabelece uma data que pegamos do input e aí coloca mais 1 ou menos 1 dia
    setDateIntoInput(selectedDate); //coloca a data como valor do input já formatada (YYYY-MM-DD)
    generateApod(); //gera a pagina com texto e imagem
}

function enableOrDisableNext(){
    let buttonNext = document.querySelector("#next");

    if(getSelectedDate() == formatDate(new Date())){
        buttonNext.disabled = true;
    }else{
        buttonNext.disabled = false;
    }
}

function enableOrDisablePrevious(){
    let buttonPrevious = document.querySelector("#previous");

    if(getSelectedDate() == "1995-06-16"){
        buttonPrevious.disabled = true;
    }else{
        buttonPrevious.disabled = false;
    }
}

function clearDiv(){
    document.querySelector("#containerTitle").innerHTML = "";
    document.querySelector("#containerImgText").innerHTML = "";
}

function clearError(){
    let spanError = document.querySelector("#error");
    spanError.innerHTML = "";
}