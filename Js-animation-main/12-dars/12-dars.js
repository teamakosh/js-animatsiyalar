$(document).ready(function () {

    //arrange blocks in a circle
    var block = $("#rotator div").get(),
    increase = Math.PI * 2 / block.length,
    x = 0, y = 0, angle = 0;

    for (var i = 0; i < block.length; i++) {
        var elem = block[i];
        x = 115 * Math.cos(angle) + 150;
        y = 115 * Math.sin(angle) + 150;
        elem.style.position = 'absolute';
        elem.style.left = x + 'px';
        elem.style.top = y + 'px';
        var rot = 90 + (i * (360 / block.length));
        angle += increase;
    }

    //Rotator click action
    function datakeyClick(clickedIcon, leftMove, topMove) {
        $("#rotator #" + clickedIcon).click(function () {
            $("#rectangle #" + clickedIcon).show();
            $("#rectangle #" + clickedIcon).animate({
                left: leftMove
            }, 2000, function () {
                $("#rectangle #" + clickedIcon).hide();
                $("#rectangle #" + clickedIcon).removeAttr('style');
                $("#bucket #" + clickedIcon).show();
                $("#bucket #" + clickedIcon).animate({
                    top: "105"
                }, 1000, function () {
                    $("#bucket #" + clickedIcon).removeAttr('style');
                });
            });
        });
    };

    datakeyClick("foodIcon", "451");
    datakeyClick("drinkIcon", "448");
    datakeyClick("clockIcon", "630");
    datakeyClick("peopleIcon", "630");
    datakeyClick("moneyIcon", "630");
    datakeyClick("moneyIcon2", "262");
    datakeyClick("calculatorIcon", "268");
    datakeyClick("percentIcon", "262");


  

});