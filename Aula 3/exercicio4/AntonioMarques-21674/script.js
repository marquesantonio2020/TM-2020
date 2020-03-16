var counterImage = 0;

function addImage(){
    var image = document.createElement("img")
    var listaImagens = document.getElementById("imageList")

    image.src = "https://placeimg.com/250/150/"+counterImage;
    listaImagens.appendChild(image);

    var contador = document.getElementById("imageCounter");

    counterImage++;
    contador.innerText = counterImage.toString();


}

function removeImage(){

    var listaImagens = document.getElementById("imageList");

    var random = Math.floor((Math.random()*counterImage) + 1);

    listaImagens.removeChild(listaImagens.childNodes[random]);

    var contador = document.getElementById("imageCounter");
    counterImage--;
    contador.innerText = counterImage.toString();

}