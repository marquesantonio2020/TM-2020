function getInfo(){
    var link = document.getElementById("link");
    var lista = document.getElementById("info");

    lista.innerHTML =
        "ID:" + link.id + "<br>" +
        "Target:" + link.target + "<br>" +
        "Type:" + link.type + "<br>" +
        "href:" + link.href + "<br>";
}

function changeColorstoRed() {
    var titles = document.getElementsByClassName("titulo")

    for(let title of titles){ //Iteração equivalente ao for-each
        title.style.color ="red";
    }
}

function onClickCell(cell){
    cell.innerText = prompt("novo valor?");
    cell.style.backgroundColor ="green";
}

function setClickCell(){
    var cells = document.getElementsByTagName("td");

    for(let cell of cells){
        cell.onclick = function(){
            onClickCell(cell);
        }
    }
}

setClickCell();