function desplegar(){
    var menud = document.getElementById("lista");
    console.log(menud);
    if (menud.style.display !== "flex") {
        console.log("2")
        menud.style.display = "block";
    } else {
        menud.style.display = "none"
    }
}