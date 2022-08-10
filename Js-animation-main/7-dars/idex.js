function light(show){
    var pic;
    if (show == 0){
        pic = "0,10,4-700x770.jpg"
    }
    else{
        pic = "on.jpg"
    }
    document.getElementById('bulb').src = pic;
}