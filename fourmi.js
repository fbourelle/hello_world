let fx, fy = 0;
let direction = 0;
let tabDirection = [-1, -1, 1 , 1]
let timer = 0;

$(function() {

    $('#go').click(function(){
        clearInterval(timer);
        $('#fourmi').html(generate(
            $('#dimX').val(),
            $('#dimY').val(),
            
        ));
        
//        $('#fourmi0_0').click(
//        function() {console.log('kghj= '+$(this));
//        //    $( this ).find( "span:last" ).remove();
//        }
    
    });

    $('#start').click(function(){
        timer = setInterval(function(){fourmiPos($('#dimX').val(),$('#dimY').val())}, 5) // fourmiPos // 
    });
    
    $('#stop').click(function(){
        clearInterval(timer);
        console.log("stop");
    });
    
    

}) 

function cible(){
    
}

function start(x, y, i, j){
    return (i == Math.round(x/2) && j == Math.round(y/2));
}

function getRandomValues(min,max){
    return Math.round(Math.random()*(max-min)+min);
}

function fourmiPos(x, y){
    
    if ($('#fourmi'+(fx)+'_'+(fy)).attr('class') == 'blue') {  
            $('#fourmi'+(fx)+'_'+(fy)).removeClass('blue').addClass('yellow');
            var compteur = parseInt($('#fourmi'+(fx)+'_'+(fy)).text());
            var fColor = $('#fourmi'+(fx)+'_'+(fy)).css('backgroundColor');        
            $('#fourmi'+(fx)+'_'+(fy)).css('background-color', ''+changeColor(fColor,20,compteur));
            $('#fourmi'+(fx)+'_'+(fy)).text(changeText(compteur));
            if (direction%2==0) {
                fx = fx+tabDirection[direction];
                if (fx < 0) fx = 0;
                if (fx > x) fx = x;
                if ((fy < 0) && (fx !=0)) fy = 0;
                if (fy > y) fy = y;
                if ((fx == 0) && (fy == -1)) fx = getRandomValues(0,x), fy = getRandomValues(0,y), console.log("coucou");
                ++direction;
                if (direction == 4) direction = 0;
            } 
            else {
                fy = fy+tabDirection[direction];
                if (fx < 0) fx = 0;
                if (fx > x) fx = x;
                if ((fy < 0) && (fx !=0)) fy = 0;
                if (fy > y) fy = y;;
                if ((fx == 0) && (fy == -1)) fx = getRandomValues(0,x), fy = getRandomValues(0,y), console.log("coucou");
                 ++direction;
                if (direction == 4) direction = 0;
            }           
    }
    else {
            $('#fourmi'+(fx)+'_'+(fy)).removeClass('yellow').addClass('blue');
            var fColor = $('#fourmi'+(fx)+'_'+(fy)).css('backgroundColor');
            var compteur = parseInt($('#fourmi'+(fx)+'_'+(fy)).text());
            $('#fourmi'+(fx)+'_'+(fy)).css('background-color', changeColor(fColor,-10,compteur));
            $('#fourmi'+(fx)+'_'+(fy)).text(changeText(compteur));
        
            if (direction%2==0) {
                fx = fx-tabDirection[direction];
                if (fx < 0) fx = 0;
                if (fx > x) fx = x;
                if ((fy < 0) && (fx !=0)) fy = 0;
                if (fy > y) fy = y;
                if ((fx == 0) && (fy == -1)) fx = getRandomValues(0,x), fy = getRandomValues(0,y), console.log("coucou");
                --direction;
                if (direction == -1) direction=3;
            }
            else {
                fy = fy-tabDirection[direction];
                if (fx < 0) fx = 0;
                if (fx > x) fx = x;
                if ((fy < 0) && (fx !=0)) fy = 0;
                if (fy > y) fy = y;
                if ((fx == 0) && (fy == -1)) fx = getRandomValues(0,x), fy = getRandomValues(0,y), console.log("coucou");
                --direction;
                if (direction == -1) direction=3;
            }
    }
        
}

function changeText(compteurTD){
    if (compteurTD != undefined) {
        ++compteurTD;
        return compteurTD;
    }
    else {
        console.log(compteurTD);
    }
}

function changeColor(colorval, modif, count){
    
    if (colorval != undefined) {
        var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    var r = 0;
    var g = 0;
    var b = 0;
    for (var i = 1; i <= 3; ++i) {
        if (i == 1) {
            r = (parseInt(parts[i])+modif);
        }
        else if (i == 2) {
            g = (parseInt(parts[i])+(modif*2));
        }
        else if (i == 3) {
            b = (parseInt(parts[i])+(modif*3));
        }
    }
    if ((r>255)&&(g>255)&&(b>255)) r=0, g=0, b=0, console.log('white :' + count);
    return 'rgb('+r+','+g+','+b+')';
    }
}


function generate(x,y){
    
    let flow ='<table style="font-size:14px">';
    for (let i = 0; i < x; i++) {
        flow +='<tr>';
        for (let j = 0; j < y; j++) {
            flow += '<td';
            
            if (start(x,y,i,j)) {
                    flow += ' class="blue" style="background-color:rgb(0, 0, 0)" id="fourmi' +i+'_'+j+'"'; 
                    fx = i;
                    fy = j;
            }
            else {
                flow += ' class="yellow" style="background-color:rgb(0, 0, 0)" id="fourmi' +i+'_'+j+'"';
            }
            flow += '>0</td>';
        }
        flow += '</tr>';
    }
    flow += '</table>';
    return flow;    
}

