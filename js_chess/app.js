const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8
let playerGo = 'black'
playerDisplay.textContent = 'black'

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn, 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
]

function createBoard() {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPiece
        square.firstChild?.setAttribute('draggable', true)
        square.setAttribute('square-id', i)
        // square.classList.add('gray')
        const row = Math.floor( (63-i)/8) + 1
        if (row %2 == 0){
            square.classList.add(i % 2 == 0 ? "gray" : "red")
        } else {
            square.classList.add(i % 2 == 0 ? "red" : "gray")
        }

        if (i <= 15){
            square.firstChild.firstChild.classList.add("black")
        }

        if (i >= 48){
            square.firstChild.firstChild.classList.add("white")
        }
        gameBoard.append(square)
    })
}

createBoard()

const allSquares = document.querySelectorAll(".square")

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})

let startPositionId 
let draggedElement

function dragStart (e) {
    startPositionId = (e.target.parentNode.getAttribute('square-id'))
    draggedElement = e.target
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) {
   e.stopPropagation()
   const correctGo = draggedElement.firstChild.classList.contains(playerGo)
   const taken = e.target.classList.contains('piece')
   const valid = checkIfValid(e.target)
   const opponentGo = playerGo == "white" ? "black": "white"
   const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)

   if(correctGo) {
    // must check this first
    if(takenByOpponent && valid) {
        e.target.parentNode.append(draggedElement)
        e.target.remove()
        changePlayer()
        return
    }
    //then check this 
    if(taken && !takenByOpponent) {
        infoDisplay.textContent = "you cannot go here!"
        setTimeout(() => infoDisplay.textContent = "", 2000)
        return
    }
    if(valid) {
        e.target.append(draggedElement)
        changePlayer()
        return
    }
   }

}

function changePlayer() {
    if (playerGo == "black") {
        reverseIds()
        playerGo = "white"
        playerDisplay.textContent = "white"
    } else {
        revertIds()
        playerGo = "black"
        playerDisplay.textContent = "black"
    }
}

function reverseIds() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => square.setAttribute('square-id', (width * width - 1) - i))
}

function revertIds() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => square.setAttribute( 'square-id', i))
}

function checkIfValid(target) {
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(startPositionId)
    const piece = draggedElement.id
    console.log(targetId)

    switch(piece) {
        case 'pawn': 
    }
}