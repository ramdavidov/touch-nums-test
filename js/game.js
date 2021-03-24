'use strict'
var gRows = 4
var gBoardSize = gRows ** 2
var gNums
var clickNext = 1
var gameStartTime = 0
var gTimerInterval = null

function renderBoard(rows, nums) {
    var strHtml = ''
    for (var i = 0; i < rows; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < rows; j++) {
            var currNum = nums.pop(j)
            strHtml +=
                `<td class="board table">
                <button class="button default" onclick="cellClicked(this, ${currNum})">
                ${currNum}</button>
                </td>`
        }
        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHtml
}

function init() {
    gNums = setBoardSize(gRows)
    renderBoard(gRows, gNums)
}

function setBoardSize(size) {
    var length = size ** 2
    var nums = []
    for (var i = 1; i <= length; i++) {
        nums.push(i)
    }
    shuffle(nums)
    return nums
}

function switchDifficulty(size) {
    gRows = size
    gBoardSize = size ** 2
    gNums = setBoardSize(size)
    renderBoard(size, gNums)
    clearInterval(gTimerInterval)
    clickNext = 1
    gameStartTime = 0
    gTimerInterval = null
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a
}

function cellClicked(elButton, clickedNum) {
    var result = false
    if (clickedNum === 1) {
        getStartTime()
        gTimerInterval = setInterval(getIntervalTime, 5)
    }
    if (clickedNum === gBoardSize && clickedNum === clickNext) {
        clearInterval(gTimerInterval)
    }
    if (clickedNum === clickNext) {
        result = true
        clickNext++
        elButton.classList.add('correct')
        elButton.classList.remove('default')
    } else {
    }
    return result
}


function getStartTime() {
    gameStartTime = Date.now()
}

function getIntervalTime() {
    var timeStamp = Date.now()
    var delta = timeStamp - gameStartTime
    formatTime(delta)
}

function formatTime(num) {
    var timeFormat = num / 1000
    var elTimer = document.querySelector('.digits')
    elTimer.innerHTML = `<span>${timeFormat}</span>`
}