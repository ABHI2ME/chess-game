const blackPieces = {
    rook : "url(images/blackRook.png)" , 
    pawn : "url(images/blackPawn.png)" ,
    knight : "url(images/blackKnight.png)" ,
    bishop : "url(images/blackBishop.png)" ,
    king : "url(images/blackKing.png)" , 
    queen : "url(images/blackQueen.png)"
} 
const whitePieces = {
    rook : "url(images/WhiteRook.png)" , 
    pawn : "url(images/whitePawn.png)" ,
    knight : "url(images/whiteKnight.png)" ,
    bishop : "url(images/whiteBishop.png)" ,
    king : "url(images/whiteKing.png)" , 
    queen : "url(images/whiteQueen.png)"
} 
let playerToMove = "white" ;

const chessGrid = [] ;
for(let i = 0 ; i < 8 ; i++){
    let row = [] ;
    for(let j = 0 ; j < 8 ; j++){
         
        if(i == 6){
           row.push(`white-PawnMoves`) ;
        }
        else if(i == 1){
            
            row.push("black-PawnMoves") ;
        }
        else if(i == 0 && j == 0 || i == 0 && j == 7){
 
            row.push("black-RookMoves") ;
        }
        else if(i == 7 && j == 0 || i == 7 && j == 7 ){
     
            row.push("white-RookMoves") ;
        }
        else if(i == 0 && j == 1 || i == 0 && j == 6){
            row.push("black-KnightMoves") ;
        }
        else if(i == 7 && j == 1 || i == 7 && j == 6){
            row.push("white-KnightMoves") ;
        }
        else if(i == 0 && j == 2 || i == 0 && j == 5){
            row.push("black-BishopMoves") ;
        }
        else if(i == 7 && j == 2 || i == 7 && j == 5){
            row.push("white-BishopMoves") ;
        }
        else if(i == 0 && j == 3 ){
            row.push("black-QueenMoves") ;
        }
        else if(i == 7 && j == 3){
            row.push("white-QueenMoves") ;
        }
        else if(i == 0 && j == 4){
            row.push("black-KingMoves") ;
        }
        else if(i == 7 && j == 4){
            row.push("white-KingMoves") ;
        }
        else{
            row.push("") ;
        }
    }
    chessGrid.push(row) ;
} ;

let movesPath = [] ;
let whiteMoveCount = 0 ;
let blakMoveCount = 0 ;
let moveCount = 0 ;
let myPreviousMove = [] ;
let readyForSecondMove = false ; // important


window.onload = ()=>{
    const darkGreen = "#739552" ;
    const lightGreen = "#ebecd0" ;
    const chessBox = document.querySelector('.chess-box') ;
    let switchColumn = true ;

       

    for(let i = 0 ; i < 8 ; i++){
        for(let j = 0 ; j < 8 ; j++){
            const newDiv = document.createElement('div') ;
            newDiv.setAttribute('id' , `${i}${j}`) ;
            chessBox.appendChild(newDiv) ;
            newDiv.dataset.row = i ;
            newDiv.dataset.col = j ;

            //giving images to divs 
            if(i == 6){
                newDiv.style.backgroundImage = whitePieces.pawn ;
                newDiv.style.backgroundSize = "cover" ;
            }
            else if(i == 1){
                newDiv.style.backgroundImage = blackPieces.pawn ;
                newDiv.style.backgroundSize = "cover" ;
            }
            else if(i == 0 && j == 0 || i == 0 && j == 7){
                newDiv.style.backgroundImage = blackPieces.rook  ;
                newDiv.style.backgroundSize = "cover" ;
            }
            else if(i == 7 && j == 0 || i == 7 && j == 7 ){
                newDiv.style.backgroundImage = whitePieces.rook ;
                newDiv.style.backgroundSize = "cover" ;
            }
            else if(i == 0 && j == 1 || i == 0 && j == 6){
                newDiv.style.backgroundImage = blackPieces.knight  ;
                newDiv.style.backgroundSize = "cover" ;
            }
            else if(i == 7 && j == 1 || i == 7 && j == 6){
                newDiv.style.backgroundImage = whitePieces.knight ;
                newDiv.style.backgroundSize = "cover" ;
            }
            else if(i == 0 && j == 2 || i == 0 && j == 5){
                newDiv.style.backgroundImage = blackPieces.bishop ;
                newDiv.style.backgroundSize = "cover" ;
            }
            else if(i == 7 && j == 2 || i == 7 && j == 5){
                newDiv.style.backgroundImage = whitePieces.bishop  ;
                newDiv.style.backgroundSize = "cover" ;
            }
            else if(i == 0 && j == 3 ){
                newDiv.style.backgroundImage = blackPieces.queen  ;
                newDiv.style.backgroundSize = "cover" ;
            }
            else if(i == 7 && j == 3){
                newDiv.style.backgroundImage = whitePieces.queen  ;
                newDiv.style.backgroundSize = "cover" ;
            }
            else if(i == 0 && j == 4){
                newDiv.style.backgroundImage = blackPieces.king  ;
                newDiv.style.backgroundSize = "cover" ;
            }
            else if(i == 7 && j == 4){
                newDiv.style.backgroundImage = whitePieces.king  ;
                newDiv.style.backgroundSize = "cover" ;
            }
            

            //giving click events to the cells 
            newDiv.addEventListener('click' , (e)=>{
                makeMove(e) ;
                secondMove(e) ;
            })

            //giving colors to div
            if(switchColumn){
                newDiv.style.backgroundColor = lightGreen
                switchColumn = false ;
            }
            else{
                newDiv.style.backgroundColor = darkGreen ;
                switchColumn = true ;
            }
        }
        switchColumn = !switchColumn ;

    }
}

function makeMove(e){
    const cell = e.target ;
    const row = cell.dataset.row ;
    const col = cell.dataset.col ;
    if(chessGrid[row][col] !== ""){
        const cellDetails = (chessGrid[row][col]).split('-') ;
        const cellPlayerColor = cellDetails[0] ;
        const cellPlayerPiece = cellDetails[1] ;
        if(cellPlayerColor != playerToMove){
            return ;
        }
        // secondMove(e);
        console.log(cellPlayerColor , cellPlayerPiece , playerToMove) ;
        if(playerToMove === "white" && cellPlayerColor === "white"){
             whiteMoveCount += 1 ;
             const str1 = `white${cellPlayerPiece}` ;
             console.log(str1) ;
             if (typeof window[str1] === "function") {
                window[str1](row , col); // Call the function
            }
        }
        else if(playerToMove === "black" && cellPlayerColor === "black"){
            blakMoveCount += 1 ;
            const str2 = `black${cellPlayerPiece}` ;
            console.log(str2) ;
            if (typeof window[str2] === "function") {
                window[str2](row , col); // Call the function
            }
        }

    }
}

function changeTheDom(row , col){
      
        movesPath.forEach(item =>{
            console.log("the choices" , item) ;
        })
        movesPath.forEach(item =>{
            const first = item[0] ;
            const second = item [1] ;
            if(first == row && second == col){

                const selector1 = `${row}${col}` ;
                const selector2 = `${myPreviousMove[0]}${myPreviousMove[1]}`
                const toChangeCell = document.getElementById(selector1) ;
                const fromCell = document.getElementById(selector2) ;
                toChangeCell.style.backgroundImage = fromCell.style.backgroundImage ; 
                toChangeCell.style.backgroundSize = "cover" ;
                fromCell.style.backgroundImage = "none" ;
                chessGrid[first][second] = chessGrid[myPreviousMove[0]][myPreviousMove[1]] ;
                chessGrid[myPreviousMove[0]][myPreviousMove[1]] = "" ;
                if(playerToMove === "black"){
                    playerToMove = "white" ;
                }
                else if(playerToMove === "white"){
                    playerToMove = "black" ;
                }
                console.log("player to move " , playerToMove) ;
            } 
            
        })

        // movesPath.forEach(item =>{
        //     console.log(item) ;
        // })
        movesPath = [] ;
        moveCount = 0 ;
        myPreviousMove = [] ;
        readyForSecondMove = false ;
    
   
}

function secondMove(e){
    const cell = e.target ;
    const rowSecond = cell.dataset.row ;
    const colSecond = cell.dataset.col ;
    const cellDetails = (chessGrid[rowSecond][colSecond]).split('-') ;
    const cellColor = cellDetails[0] ;
    const cellPiece = cellDetails[1] ;
     
    if(readyForSecondMove){
        if(cellColor != playerToMove){
            const row = parseInt(cell.dataset.row) ;
            const col = parseInt(cell.dataset.col) ;
            if([row , col] != myPreviousMove){
                changeTheDom(row , col) ;
            }
        }
    }
    //  moveCount++ ;
    //  if(moveCount == 2){
        
    //     const row = parseInt(cell.dataset.row) ;
    //     const col = parseInt(cell.dataset.col) ;
    //     changeTheDom(row , col) ;
    //  }
}

function blackPawnMoves(row , col){
    let tempRow = parseInt(row) ;
    let tempCol = parseInt(col) ;
    movesPath = [] ;
    myPreviousMove = [] ;

    const start1 = [tempRow + 1, tempCol - 1]; 
    const start2 = [tempRow + 1, tempCol];     
    const start3 = [tempRow + 1, tempCol + 1]; 
    const start4 = [tempRow + 2, tempCol];

    if(chessGrid[start2[0]][start2[1]] != "" ){
        if(chessGrid[start1[0]][start1[1]] != ""){
            movesPath.push([start1[0] ,  start1[1]]) ;
        }
        if(chessGrid[start3[0]][start3[1]] != ""){
            movesPath.push([start3[0] , start3[1]]) ;
        }
    }
    if(chessGrid[start2[0]][start2[1]] === ""){
        movesPath.push([start2[0] , start2[1]]) ;
        if(chessGrid[start1[0]][start1[1]]){
            movesPath.push([start1[0] ,  start1[1]]) ;
        }
        if(chessGrid[start3[0]][start3[1]]){
            movesPath.push([start3[0] , start3[1]]) ;
        }
        if(row == 1  && chessGrid[start4[0]][start4[1]] === ""){
            movesPath.push([start4[0] , start4[1]]) ;
        }
     }
        readyForSecondMove = true ;
        myPreviousMove.push(parseInt(row)) ;
        myPreviousMove.push(parseInt(col)) ;
}

function whitePawnMoves(row , col){
    let count = 0 ;
    let tempRow = parseInt(row) ;
    let tempCol = parseInt(col) ;
    movesPath = [] ;
    myPreviousMove = [] ;



    const start1 = [tempRow - 1, tempCol - 1]; 
    const start2 = [tempRow - 1, tempCol];     
    const start3 = [tempRow - 1, tempCol + 1]; 
    const start4 = [tempRow - 2, tempCol];

    
 
            if(chessGrid[start2[0]][start2[1]] != ""){
                if(chessGrid[start1[0]][start1[1]] != ""){
                    movesPath.push([start1[0] ,  start1[1]]) ;
                }
                if(chessGrid[start3[0]][start3[1]] != ""){
                    movesPath.push([start3[0] , start3[1]]) ;
                }
            }
            if(chessGrid[start2[0]][start2[1]] === ""){
                movesPath.push([start2[0] , start2[1]]) ;
                if(chessGrid[start1[0]][start1[1]]){
                    movesPath.push([start1[0] ,  start1[1]]) ;
                }
                if(chessGrid[start3[0]][start3[1]]){
                    movesPath.push([start3[0] , start3[1]]) ;
                }
                if(row == 6  && chessGrid[start4[0]][start4[1]] === ""){
                    movesPath.push([start4[0] , start4[1]]) ;
                }
            }
            readyForSecondMove = true ;
            myPreviousMove.push(parseInt(row)) ;
            myPreviousMove.push(parseInt(col)) ;

}

function whiteBishopMoves(row , col){
    console.log("welcome to white bishop") ;
    let count = 0 ;
    let tempRow = parseInt(row) ;
    let tempCol = parseInt(col) ;
    movesPath = [] ;
    myPreviousMove = [] ;

    const start1 = [tempRow - 1, tempCol - 1]; 
    const start2 = [tempRow - 1, tempCol + 1];     
    const start3 = [tempRow + 1, tempCol - 1]; 
    const start4 = [tempRow  + 1, tempCol + 1];

    for (let i = start1[0], j = start1[1]; i >= 0 && j >= 0; i--, j--) {
        if (i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != "") {
            movesPath.push([i, j]);
            break;
        } else {
            movesPath.push([i, j]);
        }
    }
    
    // Moving diagonally up-right (start2)
    for (let i = start2[0], j = start2[1]; i >= 0 && j < 8; i--, j++) {
        if (i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != "") {
            movesPath.push([i, j]);
            break;
        } else {
            movesPath.push([i, j]);
        }
    }
    
    // Moving diagonally down-left (start3)
    for (let i = start3[0], j = start3[1]; i < 8 && j >= 0; i++, j--) {
        if (i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != "") {
            movesPath.push([i, j]);
            break;
        } else {
            movesPath.push([i, j]);
        }
    }
    
    // Moving diagonally down-right (start4)
    for (let i = start4[0], j = start4[1]; i < 8 && j < 8; i++, j++) {
        if (i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != "") {
            movesPath.push([i, j]);
            break;
        } else {
            movesPath.push([i, j]);
        }
    }
           readyForSecondMove = true ;
           myPreviousMove.push(parseInt(row)) ;
           myPreviousMove.push(parseInt(col)) ;

           movesPath.forEach(item =>{
               console.log(item) ;
           })
}

function blackBishopMoves(row , col){
    console.log("welcome to black bishop") ;
    let count = 0 ;
    let tempRow = parseInt(row) ;
    let tempCol = parseInt(col) ;
    movesPath = [] ;
    myPreviousMove = [] ;

    const start1 = [tempRow - 1, tempCol - 1]; 
    const start2 = [tempRow - 1, tempCol + 1];     
    const start3 = [tempRow + 1, tempCol - 1]; 
    const start4 = [tempRow  + 1, tempCol + 1];
    
    for (let i = start1[0], j = start1[1]; i >= 0 && j >= 0; i--, j--) {
        if (i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != "") {
            movesPath.push([i, j]);
            break;
        } else {
            movesPath.push([i, j]);
        }
    }
    
    // Moving diagonally up-right (start2)
    for (let i = start2[0], j = start2[1]; i >= 0 && j < 8; i--, j++) {
        if (i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != "") {
            movesPath.push([i, j]);
            break;
        } else {
            movesPath.push([i, j]);
        }
    }
    
    // Moving diagonally down-left (start3)
    for (let i = start3[0], j = start3[1]; i < 8 && j >= 0; i++, j--) {
        if (i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != "") {
            movesPath.push([i, j]);
            break;
        } else {
            movesPath.push([i, j]);
        }
    }
    
    // Moving diagonally down-right (start4)
    for (let i = start4[0], j = start4[1]; i < 8 && j < 8; i++, j++) {
        if (i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != "") {
            movesPath.push([i, j]);
            break;
        } else {
            movesPath.push([i, j]);
        }
    }
           readyForSecondMove = true ;
           myPreviousMove.push(parseInt(row)) ;
           myPreviousMove.push(parseInt(col)) ;

           movesPath.forEach(item =>{
            console.log(item) ;
        })

}

function whiteRookMoves(row , col){
    console.log("the row and col " , row , col) ;
    console.log("welcome to white rook") ;
    let count = 0 ;
    let tempRow = parseInt(row) ;
    let tempCol = parseInt(col) ;
    movesPath = [] ;
    myPreviousMove = [] ;
    
    const start1 = [tempRow - 1, tempCol]; 
    const start2 = [tempRow , tempCol - 1];     
    const start3 = [tempRow + 1, tempCol]; 
    const start4 = [tempRow , tempCol + 1];

    for(let i = start1[0] , j = start1[1] ; i >= 0 ; i--){
         if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
             movesPath.push([i , j]) ;
             break ;
         }
         movesPath.push([i , j]) ;
    }
    
    for(let i = start2[0] , j = start2[1] ;  j >= 0 ; j--){
        if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
            movesPath.push([i , j]) ;
            break ;
        }
        movesPath.push([i , j]) ;
    }
    
    for(let i = start3[0] , j = start3[1] ; i < 8 ; i++){
        if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
            movesPath.push([i , j]) ;
            break ;
        }
        movesPath.push([i , j]) ;
    }

    for(let i = start4[0] , j = start4[1] ; j < 8 ; j++){
        if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
            movesPath.push([i , j]) ;
            break ;
        }
        movesPath.push([i , j]) ;
    }

           readyForSecondMove = true ;
           myPreviousMove.push(parseInt(row)) ;
           myPreviousMove.push(parseInt(col)) ;

           movesPath.forEach(item =>{
            console.log(item) ;
        })

}

function blackRookMoves(row , col){
        console.log("the row and col " , row , col) ;
        console.log("welcome to white rook") ;
        let count = 0 ;
        let tempRow = parseInt(row) ;
        let tempCol = parseInt(col) ;
        movesPath = [] ;
        myPreviousMove = [] ;
        
        const start1 = [tempRow - 1, tempCol]; 
        const start2 = [tempRow , tempCol - 1];     
        const start3 = [tempRow + 1, tempCol]; 
        const start4 = [tempRow , tempCol + 1];
        
        for(let i = start1[0] , j = start1[1] ; i >= 0 ; i--){
            if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
                movesPath.push([i , j]) ;
                break ;
            }
            movesPath.push([i , j]) ;
       }
       
       for(let i = start2[0] , j = start2[1] ;  j >= 0 ; j--){
           if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
               movesPath.push([i , j]) ;
               break ;
           }
           movesPath.push([i , j]) ;
       }
       
       for(let i = start3[0] , j = start3[1] ; i < 8 ; i++){
           if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
               movesPath.push([i , j]) ;
               break ;
           }
           movesPath.push([i , j]) ;
       }
   
       for(let i = start4[0] , j = start4[1] ; j < 8 ; j++){
           if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
               movesPath.push([i , j]) ;
               break ;
           }
           movesPath.push([i , j]) ;
       }
   
             readyForSecondMove = true ;
              myPreviousMove.push(parseInt(row)) ;
              myPreviousMove.push(parseInt(col)) ;
   
              movesPath.forEach(item =>{
               console.log(item) ;
           })

}

function whiteQueenMoves(row , col){
        console.log("the row and col " , row , col) ;
        console.log("welcome to white queen") ;
        let count = 0 ;
        let tempRow = parseInt(row) ;
        let tempCol = parseInt(col) ;
        movesPath = [] ;
        myPreviousMove = [] ;

        const start1 = [tempRow - 1, tempCol-1]; 
        const start2 = [tempRow - 1 , tempCol];     
        const start3 = [tempRow - 1, tempCol + 1]; 
        const start4 = [tempRow , tempCol - 1];
        const start5 = [tempRow , tempCol + 1];
        const start6 = [tempRow + 1 , tempCol - 1];
        const start7 = [tempRow + 1 , tempCol ];
        const start8 = [tempRow + 1 , tempCol + 1];

        for(let i = start1[0] , j = start1[1] ; i >= 0 , j >= 0 ; i-- , j--){
            if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
                movesPath.push([i , j]) ;
                break ;
            }
            movesPath.push([i , j]) ;
        }
        for(let i = start2[0] , j = start2[1] ; i >= 0 ; i--){
            if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
                movesPath.push([i , j]) ;
                break ;
            }
            movesPath.push([i , j]) ;
        }
        for(let i = start3[0] , j = start3[1] ; i >= 0 , j < 8 ; i-- , j++){
            if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
                movesPath.push([i , j]) ;
                break ;
            }
            movesPath.push([i , j]) ;
        }
        for(let i = start4[0] , j = start4[1] ; j >= 0 ; j--){
            if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
                movesPath.push([i , j]) ;
                break ;
            }
            movesPath.push([i , j]) ;
        }
        for(let i = start5[0] , j = start5[1] ; j < 8 ; j++){
            if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
                movesPath.push([i , j]) ;
                break ;
            }
            movesPath.push([i , j]) ;
        }
        for(let i = start6[0] , j = start6[1] ; i < 8 , j >= 0 ; i++ , j--){
            if( i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
                movesPath.push([i , j]) ;
                break ;
            }
            movesPath.push([i , j]) ;
        }
        for(let i = start7[0] , j = start7[1] ; i < 8 ; i++){
            if( i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
                movesPath.push([i , j]) ;
                break ;
            }
            movesPath.push([i , j]) ;
        }
        for(let i = start8[0] , j = start8[1] ; i < 8 , j < 8 ; i++ , j++){
            if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
                movesPath.push([i , j]) ;
                break ;
            }
            movesPath.push([i , j]) ;
        }

        readyForSecondMove = true ;
        myPreviousMove.push(parseInt(row)) ;
        myPreviousMove.push(parseInt(col)) ;

        movesPath.forEach(item =>{
         console.log(item) ;
     })

}

function blackQueenMoves(row , col){
    console.log("the row and col " , row , col) ;
    console.log("welcome to black queen") ;
    let count = 0 ;
    let tempRow = parseInt(row) ;
    let tempCol = parseInt(col) ;
    movesPath = [] ;
    myPreviousMove = [] ;

    const start1 = [tempRow - 1, tempCol-1]; 
    const start2 = [tempRow - 1 , tempCol];     
    const start3 = [tempRow - 1, tempCol + 1]; 
    const start4 = [tempRow , tempCol - 1];
    const start5 = [tempRow , tempCol + 1];
    const start6 = [tempRow + 1 , tempCol - 1];
    const start7 = [tempRow + 1 , tempCol ];
    const start8 = [tempRow + 1 , tempCol + 1];

    for(let i = start1[0] , j = start1[1] ; i >= 0 , j >= 0 ; i-- , j--){
        if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
            movesPath.push([i , j]) ;
            break ;
        }
        movesPath.push([i , j]) ;
    }
    for(let i = start2[0] , j = start2[1] ; i >= 0 ; i--){
        if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
            movesPath.push([i , j]) ;
            break ;
        }
        movesPath.push([i , j]) ;
    }
    for(let i = start3[0] , j = start3[1] ; i >= 0 , j < 8 ; i-- , j++){
        if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
            movesPath.push([i , j]) ;
            break ;
        }
        movesPath.push([i , j]) ;
    }
    for(let i = start4[0] , j = start4[1] ; j >= 0 ; j--){
        if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
            movesPath.push([i , j]) ;
            break ;
        }
        movesPath.push([i , j]) ;
    }
    for(let i = start5[0] , j = start5[1] ; j < 8 ; j++){
        if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
            movesPath.push([i , j]) ;
            break ;
        }
        movesPath.push([i , j]) ;
    }
    for(let i = start6[0] , j = start6[1] ; i < 8 , j >= 0 ; i++ , j--){
        if( i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
            movesPath.push([i , j]) ;
            break ;
        }
        movesPath.push([i , j]) ;
    }
    for(let i = start7[0] , j = start7[1] ; i < 8 ; i++){
        if( i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
            movesPath.push([i , j]) ;
            break ;
        }
        movesPath.push([i , j]) ;
    }
    for(let i = start8[0] , j = start8[1] ; i < 8 , j < 8 ; i++ , j++){
        if(i >= 0 && i < 8 && j >= 0 && j < 8 && chessGrid[i][j] != ""){
            movesPath.push([i , j]) ;
            break ;
        }
        movesPath.push([i , j]) ;
    }

            readyForSecondMove = true ;
            myPreviousMove.push(parseInt(row)) ;
            myPreviousMove.push(parseInt(col)) ;

            movesPath.forEach(item =>{
            console.log(item) ;
            }) ;
}







