let gameSeq = [];
let userSeq = [];
let highScore = 0;

let btns = ['col1','col2','col3','col4'];

let started = false;
let level = 0;

let h2 = document.querySelector('h2');


document.addEventListener('keypress', function() {
    if(started==false) {
        console.log('game started');
        started = true;
        
        levelUp();
    }
})

// document.addEventListener('click', function() {
//     console.log('Key Pressed');
// })


function gameFlash(btn) {
    btn.classList.add('flash');
    setTimeout(function() {
        btn.classList.remove('flash');
    },250);
}

function userFlash(btn) {
    btn.classList.add('flash');
    setTimeout(function() {
        btn.classList.remove('flash');
    },250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText= `Level ${level}`;


    //random button choose then flash

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    // console.log('level:', level);
    if(gameSeq[idx]==userSeq[idx]){
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp,1000);
        }
    } else {
        if(highScore == 0) {
            highScore = level;
            h2.innerHTML = `Game Over! High Score is <b>${highScore}</b> <br> Press any key to start`;
        }
        else if(highScore < level){
            highScore = level;
            h2.innerHTML = `Game Over! Your new High Score is <b>${highScore}</b> <br> Press any key to start`;

            highScore = level;
        }
        else if(highScore > level) {
            h2.innerHTML = `Game Over! Your Score was <b>${level}</b> & High Score is <b>${highScore}</b> <br> Press any key to start`;
        }
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function() {
            document.querySelector('body').style.backgroundColor = 'white'; 
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    console.log(btn);
    userFlash(btn);


    userColor = btn.getAttribute('id');
    console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns) {
    btn.addEventListener('click',btnPress);
}

function reset() {
    started = 0;
    userSeq = [];
    gameSeq = [];
    level = 0;
}