for(let i = 0;i < 5;i ++) {
    setTimeout(function() {
        move(i);
    }, 1000*i);
}

function move (i) {
    console.log(i);
}



