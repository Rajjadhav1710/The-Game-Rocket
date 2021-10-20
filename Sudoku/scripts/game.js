// JAVASCRIPT CODE //

// SELECT CVS
const cvs=document.getElementById("sudoku_board");
const ctx=cvs.getContext("2d");

// SELECT PLAY/PAUSE BUTTON (ON RIGHT SIDE OF TIMER)
const playPauseButton=document.getElementById("play_pause_button");

// SELECT NEW GAME BUTTON
const newGameButton=document.getElementById("new_game_button");

// SELECT ERASE BUTTON
const eraseButton=document.getElementById("erase_button");

// SELECT SUBMIT BUTTON
const submitButton=document.getElementById("submit_button");

// SELECT NUM-PAD BUTTONS
const numpadButton=document.querySelectorAll(".numpad-item");

// SELECT PAUSE ICON
const pauseIcon=document.getElementById("icon_pause");

// SELECT PLAY ICON
const playIcon=document.getElementById("icon_play");

// SELECT TIMER TEXT
const timerText=document.getElementById("timer_text");

// LOAD SUDOKU BOARD IMAGE
const sudokuBoardImg=new Image();
sudokuBoardImg.src="../img/sudoku.png";

// LOAD PLAY BUTTON IMAGE
const playBtn=new Image();
playBtn.src="../img/play.png";

// LOAD SUCCESS IMAGE
const successImg=new Image();
successImg.src="../img/trophy.png";

// LOAD FAILURE IMAGE
const failureImg=new Image();
failureImg.src="../img/lose.png";

// REQUIRED EMPTY CELLS AND CURRENT EMPTY CELLS IN QUESTION.
const requiredEmptyCells = 49;
let currentEmptyCells = 0;
// VALID SUDOKU GRID.
const validGrid = [ [ 3, 1, 6, 5, 7, 8, 4, 9, 2 ],
[ 5, 2, 9, 1, 3, 4, 7, 6, 8 ],
[ 4, 8, 7, 6, 2, 9, 5, 3, 1 ],
[ 2, 6, 3, 4, 1, 5, 9, 8, 7 ],
[ 9, 7, 4, 8, 6, 3, 1, 2, 5 ],
[ 8, 5, 1, 7, 9, 2, 6, 4, 3 ],
[ 1, 3, 8, 9, 4, 7, 2, 5, 6 ],
[ 6, 9, 2, 3, 5, 1, 8, 7, 4 ],
[ 7, 4, 5, 2, 8, 6, 3, 1, 9 ] ];

// QUESTION
const question =  [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ] ];

// ANSWER
// HOLDS ANSWER OF QUESTION
const answer = [ [] , [] , [] , [] , [] , [] , [] , [] , [] ] ;

// GAME STATE
const state = {
    current : 0,
    getReady : 0,
    game : 1,
    gamePause : 2,
    gameOver : 3
}

// STORE INFORMATION OF TOP-LEFT COORD (X,Y) OF EACH CELL.
const canvasGrid = {
    cell : [ 
        [{x : 2,y : 2},{x : 48,y : 2},{x : 95,y : 2},{x : 143,y : 2},{x : 190,y : 2},{x : 237,y : 2},{x : 285,y : 2},{x : 332,y : 2},{x : 380,y : 2}] , 
        [{x : 2,y : 48},{x : 48,y : 48},{x : 95,y : 48},{x : 143,y : 48},{x : 190,y : 48},{x : 237,y : 48},{x : 285,y : 48},{x : 332,y : 48},{x : 380,y : 48}] , 
        [{x : 2,y : 95},{x : 48,y : 95},{x : 95,y : 95},{x : 143,y : 95},{x : 190,y : 95},{x : 237,y : 95},{x : 285,y : 95},{x : 332,y : 95},{x : 380,y : 95}] , 
        [{x : 2,y : 143},{x : 48,y : 143},{x : 95,y : 143},{x : 143,y : 143},{x : 190,y : 143},{x : 237,y : 143},{x : 285,y : 143},{x : 332,y : 143},{x : 380,y : 143}] , 
        [{x : 2,y : 190},{x : 48,y : 190},{x : 95,y : 190},{x : 143,y : 190},{x : 190,y : 190},{x : 237,y : 190},{x : 285,y : 190},{x : 332,y : 190},{x : 380,y : 190}] , 
        [{x : 2,y : 237},{x : 48,y : 237},{x : 95,y : 237},{x : 143,y : 237},{x : 190,y : 237},{x : 237,y : 237},{x : 285,y : 237},{x : 332,y : 237},{x : 380,y : 237}] , 
        [{x : 2,y : 285},{x : 48,y : 285},{x : 95,y : 285},{x : 143,y : 285},{x : 190,y : 285},{x : 237,y : 285},{x : 285,y : 285},{x : 332,y : 285},{x : 380,y : 285}] , 
        [{x : 2,y : 332},{x : 48,y : 332},{x : 95,y : 332},{x : 143,y : 332},{x : 190,y : 332},{x : 237,y : 332},{x : 285,y : 332},{x : 332,y : 332},{x : 380,y : 332}] , 
        [{x : 2,y : 379},{x : 48,y : 379},{x : 95,y : 379},{x : 143,y : 379},{x : 190,y : 379},{x : 237,y : 379},{x : 285,y : 379},{x : 332,y : 379},{x : 380,y : 379}] 
    ],

    // FUNCTION WHICH TAKES USER'S CURRENT CLICKS X AND Y COORD RELATIVE TO VIEWPORT
    // AND RETURNS (i,j) VALUE FOR GRID IN MEMORY
    // IF IT FALIS TO FIND IT RETURNS (-1,-1).
    getIJ : function(clientX,clientY){
        let rect = cvs.getBoundingClientRect();
        let clickX = clientX - rect.left;
        let clickY = clientY - rect.top;

        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                if(clickX >= this.cell[i][j].x && clickX <= this.cell[i][j].x + cell.width &&
                    clickY >= this.cell[i][j].y && clickY <= this.cell[i][j].y + cell.height){
                        return { i : i , j : j};
                    }
            }
        }

        return { i : -1 , j : -1};
    }
}

// CONTROL THE GAME
cvs.addEventListener("click",function(evt){
    switch(state.current){
        case state.getReady :
             state.current = state.game;
             timer.play();
             break;            
        case state.game :
             const location = canvasGrid.getIJ(evt.clientX,evt.clientY);
             if(location.i != -1 && location.j != -1){
                sudokuBoard.currentCell.i = location.i;
                sudokuBoard.currentCell.j = location.j;
             }
             break;
        case state.gamePause :
             state.current = state.game;
             playPauseControlButton.state.current = playPauseControlButton.state.play;
             timer.play();
             break;
        case state.gameOver :
             break;
    }
});

playPauseButton.addEventListener("click",function(evt){
    switch(state.current){
        case state.getReady :
             break;
        case state.game :
             state.current = state.gamePause;
             playPauseControlButton.state.current = playPauseControlButton.state.pause;
             timer.pause();
             break;
        case state.gamePause :
             state.current = state.game;
             playPauseControlButton.state.current = playPauseControlButton.state.play;
             timer.play();
             break;
        case state.gameOver :
             break;
    }
});

newGameButton.addEventListener("click",function(evt){
    switch(state.current){
        case state.getReady :
             break;
        case state.game :
             // RESET FUNCTION
             reset();
             state.current = state.getReady;
             break;
        case state.gamePause :
             // RESET FUNCTION
             reset();
             state.current = state.getReady;
             break;
        case state.gameOver :
              // RESET FUNCTION
              reset();
              state.current = state.getReady;
              break;
    }
});

eraseButton.addEventListener("click",function(evt){
    switch(state.current){
        case state.getReady :
             break;
        case state.game :
             // ALLOW TO ERASE ONLY IF IT'S SOFT CELL
             if(sudokuBoard.grid[sudokuBoard.currentCell.i][sudokuBoard.currentCell.j].type == 0){
                sudokuBoard.grid[sudokuBoard.currentCell.i][sudokuBoard.currentCell.j].data=0;
             }
        case state.gamePause :
             break;
        case state.gameOver :
             break;
    }
});

submitButton.addEventListener("click",function(evt){
    switch(state.current){
        case state.getReady :
             alert("First Play The Game Then Submit!");
             break;
        case state.game :
             // CHECK, IS SUDOKU GRID COMPLETELY FILLED.
             if(sudokuBoard.isCompletelyFilled() === false){
                alert("Complete Your Sudoku First!");
             }else{
                timer.pause();
                state.current=state.gameOver;
                // check if sudoku filled by user is correct or not.
                // change the state of game over according to it.
                if(sudokuBoard.isCorrectlyFilled(answer) === true){
                    gameOver.state.current = gameOver.state.success;
                }else{
                    gameOver.state.current = gameOver.state.failure;
                }
             }
        case state.gamePause :
             break;
        case state.gameOver :
             break;
    }
});

for(let i=0;i<numpadButton.length;i++){
    numpadButton[i].addEventListener("click",function(evt){
        switch(state.current){
            case state.getReady :
                 break;
            case state.game :
                 if(sudokuBoard.grid[sudokuBoard.currentCell.i][sudokuBoard.currentCell.j].type == 0){
                    sudokuBoard.grid[sudokuBoard.currentCell.i][sudokuBoard.currentCell.j].data=parseInt(evt.target.getAttribute("data-value"),10);
                 }
            case state.gamePause :
                 break;
            case state.gameOver :
                 break;
        }
    });
}

// GET READY SCREEN
const getReady = {
    // PROPERTIES OF PLAY BUTTON
    // SOURCE PROPERTIES
    sX : 0,
    sY : 0,
    sW : 512,
    sH : 512,
    // DESTINATION PROPERTIES
    x : cvs.width/2 - 80/2,
    y : cvs.height/2 - 80/2,
    w : 80,
    h : 80,

    draw : function(){
        if(state.current == state.getReady){
            ctx.drawImage(sudokuBoardImg,0,0,600,600,0,0,cvs.width,cvs.height);
            ctx.drawImage(playBtn,this.sX,this.sY,this.sW,this.sH,this.x,this.y,this.w,this.h);
        }
    }
}

// GAME PAUSE SCREEN
const gamePause = {
    // PROPERTIES OF PLAY BUTTON
    // SOURCE PROPERTIES
    sX : 0,
    sY : 0,
    sW : 512,
    sH : 512,
    // DESTINATION PROPERTIES
    x : cvs.width/2 - 80/2,
    y : cvs.height/2 - 80/2,
    w : 80,
    h : 80,

    draw : function(){
        if(state.current == state.gamePause){
            ctx.drawImage(sudokuBoardImg,0,0,600,600,0,0,cvs.width,cvs.height);
            ctx.drawImage(playBtn,this.sX,this.sY,this.sW,this.sH,this.x,this.y,this.w,this.h);
        }
    }
}

// GAME OVER SCREEN
const gameOver = {
    // GAME OVER STATE
    state : {
        current : 0,
        success : 0,
        failure :1
    },
    
    // SOURCE PROPERTIES
    sX : 0,
    sY : 0,
    sW : 512,
    sH : 512,
    // DESTINATION PROPERTIES
    x : cvs.width/2 - 150/2,
    y : cvs.height/2 - 150/2,
    w : 150,
    h : 150,

    draw : function(){
        if(state.current == state.gameOver){

            ctx.fillStyle = "#eaeef4";
            ctx.fillRect(0,0,cvs.width,cvs.height);

            if(this.state.current == this.state.success){
                ctx.drawImage(successImg,this.sX,this.sY,this.sW,this.sH,this.x,this.y,this.w,this.h);
            }else if(this.state.current == this.state.failure){
                ctx.drawImage(failureImg,this.sX,this.sY,this.sW,this.sH,this.x,this.y,this.w,this.h);
            }
        }
    }
}

// SUDOKU BOARD CELL (EACH INDIVIDUAL CELL) (ON CANVAS)
const cell = {
    //PROPERTIES OF CELL THAT IS ON CANVAS
    width : 46,
    height : 46,

    getLocationOnCanvas : function(i,j){
        const location = {
            x : j*this.width + 2 + j,
            y : i *this.height + 2 +i
        }

        return location;
    }

}

// CONSTRUCTOR FUNCTION FOR GRID CELL , WHICH HOLDS ACTUAL DATA IN MEMORY
// TYPE OF CELL:
// HARD CELL - 1 - USER CAN'T CHANGE
// SOFT CELL - 0 - USER CAN CHANGE
function GridCell(data = 0,type = 0){
    this.data = data;
    this.type = type;
}

// SUDOKU BOARD (IN GAME STATE)
const sudokuBoard = {
    // SOURCE PROPERTIES
    sX : 0,
    sY : 0,
    sW : 600,
    sH : 600,
    // DESTINATION PROPERTIES
    x : 0,
    y : 0,
    w : cvs.width,
    h : cvs.height,

    // CURRENTLY SELECTED CELL
    currentCell : {
        i : 0,
        j : 0
    },

    grid : [ [] , [] , [] , [] , [] , [] , [] , [] , [] ],

    // METHOD TO CREATE EMPTY GRID IN MEMORY
    createGrid : function(){

        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                let gc = new GridCell();
                this.grid[i].push(gc);
            }
        }
    },

    // METHOD TO FILL IN THE CREATED GRID IN MEMORY BY THE GIVEN GRID AS QUESTION
    // question : QUESTION GRID. (QUESTION GRID IS SIMPLE GRID , NOT MADE OF OBJECTS JUST SIMPLE 2D ARRAY.)
    // IN QUESTION EMPTY CELLS(SOFT CELLS) ARE REPRESENTED WITH 0
    fillGrid : function(question){
        
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                this.grid[i][j].data = question[i][j];
                if(question[i][j] == 0){
                    this.grid[i][j].type = 0;
                }else{
                    this.grid[i][j].type = 1;
                }
            }
        }
    },

    draw : function(){
        if(state.current == state.game){
            // DRAWS EMPTY SUDOKU BOARD ON CANVAS
            ctx.drawImage(sudokuBoardImg,this.sX,this.sY,this.sW,this.sH,this.x,this.y,this.w,this.h);
            
            // HIGHLIGHTS CURRENTLY SELECTED CELL
            const currentCellCoord = cell.getLocationOnCanvas(this.currentCell.i,this.currentCell.j);
            ctx.fillStyle = "rgba(162, 210, 255, 0.6)";
            ctx.fillRect(currentCellCoord.x,currentCellCoord.y,cell.width,cell.height);

            // DRAWS grid DATA ON TO THE sudoku board (ON CANVAS).
            ctx.font = "bold 34px Roboto";

            for(let i=0;i<9;i++){
                for(let j=0;j<9;j++){
                    let currentCellCoord = cell.getLocationOnCanvas(i,j);
                    if(this.grid[i][j].type == 1){
                        ctx.fillStyle = "#000000";
                        ctx.fillText(this.grid[i][j].data,currentCellCoord.x+13,currentCellCoord.y+35);
                    }else if(this.grid[i][j].type == 0 && this.grid[i][j].data != 0){
                        ctx.fillStyle = "#0072e3";
                        ctx.fillText(this.grid[i][j].data,currentCellCoord.x+13,currentCellCoord.y+35);
                    }
                }
            }
            
        }
    },

    reset : function(){
        this.currentCell.i=this.currentCell.j=0;
        this.grid =  [ [] , [] , [] , [] , [] , [] , [] , [] , [] ] ;
        this.createGrid();
        // sudokuBoard.createGrid();
    },

    isCompletelyFilled : function(){
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                if(this.grid[i][j].data==0){
                    return false;
                }
            }
        }

        return true;
    },

    // METHOD TO CHECK WHETHER USER HAS CORRECTLY FILLED THE SUDOKU GRID OR NOT.
    isCorrectlyFilled : function(answer){
        for(let i=0;i<answer.length;i++){
            for(let j=0;j<answer.length;j++){
                if(this.grid[i][j].data !== answer[i][j]){
                    return false;
                }
            }
        }

        return true;
    },

    // TO CHECK GIVEN POSSIBLE VALUE IS VALID FOR (X,Y) LOCATION OF GIVEN BOARD.
    isValid : function(pos,board,x, y){
        let n = board.length;
        for (let i = 0; i < n; i++) {
          if(board[x][i] == pos) {
            return false;
          }
        }
    
        for (let i = 0; i < n; i++) {
          if (board[i][y] == pos) {
            return false;
          }
        }
    
        x = Math.trunc(x / 3) * 3;
        y = Math.trunc(y / 3) * 3;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[x + i][y + j] == pos) {
              return false;
            }
          }
        }
    
        return true;
    },
    

    solve : function(question,i=0,j=0){
        if(j==9)
        {
            i=i+1;
            j=0;
        }
      
        if(i==9)
        {
            for(let m=0;m<9;m++)
            {
                for(let n=0;n<9;n++)
                {
                    answer[m].push(question[m][n]);
                    // console.log(question[m][n]);
                }
            }
            // you found the dolution
            // for(let m=0;m<9;m++)
            // {
            //     for(let n=0;n<9;n++)
            //     {
            //         console.log(question[m][n]);
            //     }
            // }
            return;
        }
      
        if(question[i][j]!=0)
        {
            this.solve(question,i,j+1);
        }
        else
        {
            for(let pos=1;pos<=9;pos++)
            {
                if(this.isValid(pos,question,i,j) === true)
                {
                    question[i][j]=pos;
                    this.solve(question,i,j+1);
                    question[i][j]=0;
                }
            }
        }
    }
    
}

// PLAY/PAUSE CONTROL BUTTON
const playPauseControlButton = {
    state : {
        current : 1,
        pause : 0,
        play : 1
    },

    draw : function(){
        if(state.current == state.getReady || state.current == state.gameOver){
            // MAKE PLAY/PAUSE BUTTON INVISIBLE.
            playPauseButton.style.visibility = "hidden";
        }else{
            // MAKE PLAY/PAUSE BUTTON VISIBLE.
            playPauseButton.style.visibility = "visible";
            // IF CURRENT STATE IS PAUSE STATE MAKE PLAY IMAGE VISIBLE ELSE PAUSE IMAGE.
            if(this.state.current == this.state.pause){
                playIcon.style.display = "block";
                pauseIcon.style.display = "none";
            }else{
                playIcon.style.display = "none";
                pauseIcon.style.display = "block";
            }
        }
    }
}

// TIMER
const timer = {
    hh : 0,
    mm : 0,
    ss : 0,
    timerID : 0,

    play : function(){
        timer.timerID=setInterval(function(){
            if(timer.ss==59){
                timer.ss=0;
                if(timer.mm==59){
                    timer.mm=0;
                    timer.hh++;
                }else{
                    timer.mm++;
                }
            }else{ 
              timer.ss++;
            }
            
            // if(timer.hh==0&&timer.mm==0){
            //     if(timer.ss>=0&&timer.ss<=9){
            //         timerText.innerHTML="0"+timer.ss;
            //     }else{
            //         timerText.innerHTML=timer.ss;  
            //     }
            // }else

            if(timer.hh==0){
                if(timer.mm>=0&&timer.mm<=9){
                    timerText.innerHTML="0"+timer.mm;
                }else{
                    timerText.innerHTML=timer.mm;  
                }
              
                if(timer.ss>=0&&timer.ss<=9){
                    timerText.innerHTML=timerText.innerHTML+" : "+"0"+timer.ss;
                }else{
                    timerText.innerHTML=timerText.innerHTML+" : "+timer.ss;  
                }
            }else{
                timerText.innerHTML=timer.hh;
              
                if(timer.mm>=0&&timer.mm<=9){
                    timerText.innerHTML=timerText.innerHTML+" : "+"0"+timer.mm;
                }else{
                    timerText.innerHTML=timerText.innerHTML+" : "+timer.mm;  
                }
              
                if(timer.ss>=0&&timer.ss<=9){
                    timerText.innerHTML=timerText.innerHTML+" : "+"0"+timer.ss;
                }else{
                    timerText.innerHTML=timerText.innerHTML+" : "+timer.ss;  
                }
            }
          },1000);
    },

    pause : function(){
        clearInterval(this.timerID);
    },

    reset : function(){
        // newly added line
        clearInterval(this.timerID);
        // newly added line
        timer.hh=0;
        timer.mm=0;
        timer.ss=0;
        timer.timerID=0;
    }
}

// RANDOM NUMBER GENERATOR BETWEEN 0 AND MAX-1
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// RESET FUNCTION : TO RESET THE GAME
function reset(){
    sudokuBoard.reset();
    // GENERATE RANDOM QUESTION GRID.
    currentEmptyCells = 0;
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            question[i][j] = validGrid[i][j];
        }
    }
    while(currentEmptyCells<requiredEmptyCells){
        let i=getRandomInt(9);
        let j=getRandomInt(9);
        if(question[i][j] != 0){
            question[i][j] = 0;
            currentEmptyCells++;
        }
    }
    sudokuBoard.fillGrid(question);
    // TO EMPTY ANSWER ARRAY
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            answer[i].pop();
        }
    }
    sudokuBoard.solve(question);
    timer.reset();
}
reset();

// DRAW
function draw(){
    getReady.draw();
    gamePause.draw();
    gameOver.draw();
    sudokuBoard.draw();
    playPauseControlButton.draw();
}

// LOOP
function loop(){
    draw();

    requestAnimationFrame(loop);
}
loop();


// AFTER COMPLETELY LOADING THE IMAGE , DRAW IMAGE
// LOOP
// state.current=state.game;
// sudokuBoard.createGrid();
// sudokuBoard.fillGrid([ [ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
//     [ 5, 2, 0, 0, 8, 0, 0, 0, 0 ],
//     [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
//     [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
//     [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
//     [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
//     [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
//     [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
//     [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ] ]);
// function loop(){
//    sudokuBoard.draw();

//     requestAnimationFrame(loop);
// }
// loop();


