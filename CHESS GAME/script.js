let chessContainer = document.querySelector('.chessContainer')
let chessBox = document.querySelectorAll('.chessBox')
let n = 0;
let z = 0;
let selected = [];
let currentTurn = 'W';
for (let index = 1; index <= 8; index++) {
    for (let j = 1; j <= 8; j++) {
        let numberIndex = n + 1;
        if ((numberIndex % 2) == z) {
            chessBox[n].style.backgroundColor = '#f9e4bc';
        } else {
            chessBox[n].style.backgroundColor = '23a86a';
        }
        chessBox[n].id = `${index},${j}`;
        n++
    }
    if (z == 0) {
        z = 1
    } else {
        z = 0;
    }
}
chessBox.forEach((value, index) => {
    let x_Coordinate = parseInt(chessBox[index].id.split(',')[0]);
    let y_Coordinate = parseInt(chessBox[index].id.split(',')[1]);

    if (x_Coordinate == 2) {
        let pawnImg = document.createElement('img');
        pawnImg.id = 'B_pawn';
        pawnImg.src = 'black_Images/Pawn.png';
        chessBox[index].appendChild(pawnImg);
    }
    
    if (x_Coordinate == 7) {
        let pawnImg = document.createElement('img');
        pawnImg.id = 'W_pawn';
        pawnImg.src = 'white_Images/Pawn.png';
        chessBox[index].appendChild(pawnImg);
    }
    
})

let pieceDisplay = (X, Y, pieceName, pColor) => {
    let pieceImg = document.createElement('img');
    if (pColor == 'white') {
        pieceImg.id = 'W_piece';
        pieceImg.src = `white_Images/${pieceName}.png`;
    } else {
        pieceImg.id = 'B_piece';
        pieceImg.src = `black_Images/${pieceName}.png`;
    }
    
    let tempChessBox = document.getElementById(`${X},${Y}`);
    tempChessBox.appendChild(pieceImg);

}

let pieceArr = ['Rook', 'Knight', 'Bishop', 'Kings', 'Queen'];
let altrN = [1, 8];
altrN.forEach((value, index) => {
    pieceArr.forEach((val, ind) => {
        let x_Axis = altrN[index];
        let y_Axis = ind + 1;
        let pieceColor = '';
        if (altrN[index] == 1) {
            pieceColor = 'black';
        } else {
            pieceColor = 'white';
        }
        pieceDisplay(x_Axis, y_Axis, pieceArr[ind], pieceColor)
        if (ind <= 2) {
            let copyYAxis = 8 - ind;
            pieceDisplay(x_Axis, copyYAxis, pieceArr[ind], pieceColor)
        }
    })
})

//Kya valid move pe click hua?

//Kya kisi piece pe click hua?

//Kya move karna hai?

//Kya enemy ko hataana hai?



chessBox.forEach((value, index) => {
    chessBox[index].addEventListener('click', (e) => {
        let classlength = chessBox[index].classList;
        let chessBoxChild = chessBox[index].children;
        for (let ind = 0; ind < classlength.length; ind++) {
            if (classlength[ind] == 'nextSelected') {
                if (chessBoxChild.length != 0) {
                    let x_Axis = parseInt(chessBox[index].id.split(',')[0]);
                    let y_Axis = parseInt(chessBox[index].id.split(',')[1]);
                    let pieceId = `${x_Axis},${y_Axis}`
                    pieceMover(pieceId)
                    pieceEliminate(x_Axis, y_Axis)
                    pieceRemover()
                    cleaner();
                    return
                } else {
                    let pieceid = e.target.id;
                    pieceMover(pieceid);
                    pieceRemover()
                }
            }

        }
        cleaner()

        if (e.target.src != undefined) {
            let pieceName = e.target.src.split('/').slice(-1)[0]
            let colorPiece = chessBox[index].children[0].id.split('_')[0];
            let x_Axis = parseInt(chessBox[index].id.split(',')[0])
            let y_Axis = parseInt(chessBox[index].id.split(',')[1])
            // first hand the pawn Movement
            if (pieceName == 'Pawn.png') {
                pawnHandler(x_Axis, y_Axis, colorPiece, pieceName)
            }
            if (pieceName == 'Rook.png') {
                rookHandler(x_Axis, y_Axis, colorPiece, pieceName)
            }
            if(pieceName == 'Knight.png'){
                knightHandler(x_Axis, y_Axis, colorPiece, pieceName)
            }
            if(pieceName == 'Bishop.png'){
                bishopHandler(x_Axis, y_Axis, colorPiece, pieceName)
            }
            if(pieceName == 'Queen.png'){
                queenHandler(x_Axis, y_Axis, colorPiece, pieceName)
            }
            if(pieceName == 'Kings.png'){
                kingHandler(x_Axis, y_Axis, colorPiece, pieceName)
            }
            
            
        }
    })
})



let kingHandler = (x_Axis, y_Axis, colorPiece, pieceName) => {
    selected = [x_Axis, y_Axis, pieceName, colorPiece];


    const directions = [
        [1, 0],  
        [-1, 0], 
        [0, 1],   
        [0, -1], 
        [1, 1], 
        [1, -1], 
        [-1, 1], 
        [-1, -1]  
    ];

    directions.forEach(([dx, dy]) => {
        let newX = x_Axis + dx;
        let newY = y_Axis + dy;

        let tempChessBox = document.getElementById(`${newX},${newY}`);
        if (!tempChessBox) return;

        let child = tempChessBox.firstElementChild;

        if (child === null) {
            tempChessBox.classList.add('nextSelected'); 
        } else {
            let pieceColor = child.id.split('_')[0];
            if (pieceColor !== colorPiece) {
                tempChessBox.classList.add('nextSelected');
            }
        }
    });
};


let queenHandler = (x_Axis, y_Axis, colorPiece, pieceName) => {
    selected = [x_Axis, y_Axis, pieceName, colorPiece];


    const directions = [
        [1, 0],   
        [-1, 0],
        [0, 1],   
        [0, -1],  
        [1, 1],   
        [1, -1],  
        [-1, 1],  
        [-1, -1]  
    ];

    for (let d = 0; d < directions.length; d++) {
        let [dx, dy] = directions[d];
        let stop = false;

        for (let step = 1; step <= 8; step++) {
            let newX = x_Axis + dx * step;
            let newY = y_Axis + dy * step;

            let tempChessBox = document.getElementById(`${newX},${newY}`);
            if (!tempChessBox || stop) break;

            let child = tempChessBox.firstElementChild;

            if (child != null) {
                let pieceColor = child.id.split('_')[0];

                if (pieceColor !== colorPiece) {
                    tempChessBox.classList.add('nextSelected');
                }
                break;
            } else {
                tempChessBox.classList.add('nextSelected');
            }
        }
    }
};




let bishopHandler = (x_Axis, y_Axis, colorPiece, pieceName) => {
    selected = [x_Axis, y_Axis, pieceName, colorPiece];
    let directions = [
        [1, 1],
        [1, -1],  
        [-1, 1],  
        [-1, -1]  
    ];

    for (let d = 0; d < directions.length; d++) {
        let [dx, dy] = directions[d];
        let stop = false;

        for (let step = 1; step <= 8; step++) {
            let newX = x_Axis + dx * step;
            let newY = y_Axis + dy * step;

            let tempChessBox = document.getElementById(`${newX},${newY}`);
            if (!tempChessBox || stop) break;

            let child = tempChessBox.firstElementChild;
            if (child != null) {
                let pieceColor = child.id.split('_')[0];

                if (pieceColor != colorPiece) {
                    tempChessBox.classList.add('nextSelected');
                }
                stop = true; 
            } else {
                tempChessBox.classList.add('nextSelected'); 
            }
        }
    }
};


//lets make knight 
//handlig the moment of knight
let knightHandler = (x_Axis, y_Axis, colorPiece, pieceName) => {
    selected = [x_Axis, y_Axis, pieceName, colorPiece];
    let changeX = 1;
    let changeY = 1;
    let tempChessBox, n;
    for(let i=1; i<=4;i++){
        if(i % 2 == false){ 
            changeX= (changeX == 1) ? -1 : 1;

        } else{
            changeY= (changeY == 1) ? -1 : 1;
        }
        for(let j =1; j <=4; j++){
           if(i % 2 == 1){
                 if(j <= 2){
                    n = changeX * j 
                   tempChessBox = document.getElementById(`${x_Axis + n},${y_Axis}`);

                 }else{
                    changeY = (changeY == 1) ? -1 : 1;
                    tempChessBox = document.getElementById(`${x_Axis + n},${y_Axis+ changeY}`);
                    if(tempChessBox !=undefined){
                    if ((tempChessBox.firstElementChild != null)&&
                         (tempChessBox.firstElementChild.id.split('_')[0] == selected[3])){

                         } else{
                            tempChessBox.classList.add('nextSelected')
                         }
                 }
                }

           }
           if(i % 2 == 0 ){
               if(j <= 2){
                n = changeY * j;
                tempChessBox = document.getElementById(`${x_Axis},${y_Axis+ n}`);
               }else{
                 changeX = (changeX == 1) ? -1 : 1;
                    tempChessBox = document.getElementById(`${x_Axis + changeX},${y_Axis+ n}`);
                    if(tempChessBox !=undefined){
                    if ((tempChessBox.firstElementChild != null)&&
                         (tempChessBox.firstElementChild.id.split('_')[0] == selected[3])){

                         } else{
                            tempChessBox.classList.add('nextSelected')
                         }
                 }
               }
           }
        }


    }
}



 
let rookHandler = (x_Axis, y_Axis, colorPiece, pieceName) => {
    let changeX = 1;
    let changeY = 1;
    let tempChessBox;
    let checkX = true;
    let checkY = true;
    selected = [x_Axis, y_Axis, pieceName, colorPiece];
    for (let i = 1; i <= 4; i++) {
        if (i % 2 == false) {
            changeX = (changeX == 1) ? -1 : 1
            checkX = true;
        } else {
            changeY = (changeY == 1) ? -1 : 1
            checkY = true;
        }
        for (let j = 1; j <= 8; j++) {
            if (i % 2 == 1) {
                n = changeX * j
                tempChessBox = document.getElementById(`${x_Axis + n},${y_Axis}`)
                if (tempChessBox != undefined) {
                    //if (box ke andar koi piece hai && us piece ka color rook ke color se same hai)
                    if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] == selected[3])) {
                        checkX = false;
                    }
                    if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] != selected[3])) {
                        if (checkX == true) {
                            tempChessBox.classList.add('nextSelected');
                        }
                        checkX = false
                    }
                    if (checkX == true) {
                        tempChessBox.classList.add('nextSelected')
                    }
                }
            }
            if (i % 2 == 0) {
                n = changeY * j
                tempChessBox = document.getElementById(`${x_Axis},${y_Axis + n}`)
                if (tempChessBox != undefined) {
                    if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] == selected[3])) {
                        checkY = false;
                    }
                    if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] != selected[3])) {
                        if (checkY == true) {
                            tempChessBox.classList.add('nextSelected');
                        }
                        checkY = false
                    }
                    if (checkY == true) {
                        tempChessBox.classList.add('nextSelected')
                    }
                }
            }
        }
    }
}

let pawnHandler = (x_Axis, y_Axis, colorPiece, pieceName) => {
    selected = [x_Axis, y_Axis, pieceName, colorPiece];
    if ((x_Axis == 2 && colorPiece == 'B') || (x_Axis == 7 && colorPiece == 'W')) {
        if (colorPiece == 'W') {
            for (let index = 1; index <= 2; index++) {
                let tempChessBox = document.getElementById(`${x_Axis - index},${y_Axis}`)
                if (tempChessBox.children.length != 0) {
                    return
                }
                if (tempChessBox.children.length == 0) {
                    tempChessBox.classList.add('nextSelected');
                }

            }
        } else if (colorPiece == 'B') {
            for (let index = 1; index <= 2; index++) {
                let tempChessBox = document.getElementById(`${x_Axis + index},${y_Axis}`)
                 if (tempChessBox.children.length != 0) {
                    return
                }
                if (tempChessBox.children.length == 0) {
                    tempChessBox.classList.add('nextSelected');
                }

            }
        }
    } else {
        if (colorPiece == 'W') {
            let tempChessBox = document.getElementById(`${x_Axis - 1},${y_Axis}`);


            if (tempChessBox.children.length == 0) {
                tempChessBox.classList.add('nextSelected');
            }
        } else if (colorPiece == 'B') {
            let tempChessBox = document.getElementById(`${x_Axis + 1},${y_Axis}`);
            if (tempChessBox.children.length == 0) {
                tempChessBox.classList.add('nextSelected');
            }
        }
    }
    let n = 1;
    if (colorPiece == 'W') {
        for (let index = 1; index <= 2; index++) {
            let pieceIdSideOpp = `${x_Axis - 1},${y_Axis + n}`
            let tempChessBox = document.getElementById(`${pieceIdSideOpp}`);

            if (tempChessBox.children.length !== 0) {
                let temp = tempChessBox.firstElementChild.id.split('_')[0];
                if (colorPiece !== temp) {
                    tempChessBox.classList.add('nextSelected');
                }
            }
            n = (n == 1) ? -1 : 1
        }
    } else if (colorPiece == 'B') {
        for (let index = 1; index <= 2; index++) {
            let pieceIdSideOpp = `${x_Axis + 1},${y_Axis + n}`
            let tempChessBox = document.getElementById(`${pieceIdSideOpp}`);

            if (tempChessBox.children.length !== 0) {
                let temp = tempChessBox.firstElementChild.id.split('_')[0];
                if (colorPiece !== temp) {
                    tempChessBox.classList.add('nextSelected');
                }
            }
            n = (n == 1) ? -1 : 1
        }
    }
}
let cleaner = () => {
    chessBox.forEach((value, index) => {
        chessBox[index].classList.remove
            ('nextSelected')
    })
}

let pieceMover = (pieceid) => {
    let pieceImg = document.createElement('img');
    pieceImg.id = `${selected[3]}_pawn`;
    if (selected[3] == 'W') {
        pieceImg.src = `white_Images/${selected[2]}`;
    } else {
        pieceImg.src = `black_Images/${selected[2]}`;
    }
    let tempChessBox = document.getElementById(`${pieceid}`);
    console.log(tempChessBox);

    tempChessBox.appendChild(pieceImg)
}

let pieceRemover = () => {
    if (selected.length !== 0) {
        const list = document.getElementById(`${selected[0]},${selected[1]}`)
        if (list.hasChildNodes()) {
            list.removeChild(list.children[0]);
        }
    }
}
let pieceEliminate = (x_Axis, y_Axis) => {
    const list = document.getElementById(`${x_Axis},${y_Axis}`);
    if (list.hasChildNodes()) {
        const piece = list.children[0];
        if (piece.src.includes('Kings.png')) {
            const winner = piece.id.startsWith('W') ? 'Black' : 'White';
            setTimeout(() => {
                alert(`♟️ Game Over! ${winner} Wins!`);
                location.reload(); 
            }, 100);
        }

        list.removeChild(piece);
    }
}



//check
function findKingPosition(color) {
    let boxes = document.querySelectorAll('.chess-box');
    for (let box of boxes) {
        let piece = box.firstElementChild;
        if (piece && piece.id === `${color}_piece` && piece.src.includes('King')) {
            return box.id; // e.g., "1,5"
        }
    }
    return null;
}

function isKingInCheck(color) {
    let kingPos = findKingPosition(color);
    if (!kingPos) return false;

    let [kX, kY] = kingPos.split(',').map(Number);
    let opponentColor = color === 'W' ? 'B' : 'W';
    let threatFound = false;

    
    let boxes = document.querySelectorAll('.chess-box');
    for (let box of boxes) {
        let piece = box.firstElementChild;
        if (piece && piece.id.startsWith(opponentColor)) {
            let [x, y] = box.id.split(',').map(Number);
            let name = piece.src.split('/').pop();

            
            if (name === 'Pawn.png') {
                if (pawnThreatensKing(x, y, opponentColor, kX, kY)) {
                    threatFound = true;
                    break;
                }
            }
            
            if (name === 'Rook.png' || name === 'Queen.png') {
                if (rookThreatens(x, y, opponentColor, kX, kY)) {
                    threatFound = true;
                    break;
                }
            }
            
            if (name === 'Bishop.png' || name === 'Queen.png') {
                if (bishopThreatens(x, y, opponentColor, kX, kY)) {
                    threatFound = true;
                    break;
                }
            }
            
            if (name === 'Knight.png') {
                if (knightThreatens(x, y, kX, kY)) {
                    threatFound = true;
                    break;
                }
            }
        }
    }

    return threatFound;
}
if (isKingInCheck(currentTurn)) {
    alert(`${currentTurn === 'W' ? 'White' : 'Black'} is in Check!`);
}

