'use strict'

const choices = document.querySelectorAll('.choice')
const scorePlayer = document.querySelector('.score p:first-child span')
const scoreComputer = document.querySelector('.score p:last-child span')
const result = document.getElementById('result')
const restart = document.getElementById('restart')
const modal = document.querySelector('.modal')
const scoreBoard = {
  player: 0,
  computer: 0
}

function play(e) {
  restart.style.display = 'inline-block'
  const playerChoice = e.target.id
  const computerChoice = getComputerChoice()
  const winner = getWinner(playerChoice, computerChoice)
  showWinner(winner, computerChoice)
}

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors']
  const index = Math.floor(Math.random() * (choices.length))
  return choices[index]
}
function getWinner(p, c) {
  const winner = {
    'rock': 'scissors',
    'scissors': 'paper',
    'paper': 'rock'
  }
  return p === c ? 'draw' : winner[p] === c ? 'player' : 'computer'
}
function showWinner(winner, computerChoice) {
  if (winner === 'player') {
    scoreBoard.player++
    result.innerHTML = `<h1 class="text-win">You Win!</h1>`
  } else if (winner === 'computer') {
    scoreBoard.computer++
    result.innerHTML = `<h1 class="text-lose">You Lose!</h1>`
  } else {
    result.innerHTML = `<h1>Draw!</h1>`
  }
  result.innerHTML += `
    <i class="fas fa-hand-${computerChoice} fa-10x"></i>
    <p>Computer Chose <strong>${computerChoice[0].toUpperCase() + computerChoice.slice(1)}</strong></p>
    `
  scorePlayer.innerHTML = scoreBoard.player
  scoreComputer.innerHTML = scoreBoard.computer
  modal.style.display = 'unset'
}
function clearModel(e) {
  if (e.target === modal)
    modal.style.display = 'none'
}
function restartGame() {
  scoreBoard.computer = 0
  scoreBoard.player = 0
  scoreComputer.innerHTML = scoreBoard.computer
  scorePlayer.innerHTML = scoreBoard.player
}
// event listeners
choices.forEach(choice => choice.addEventListener('click', play))
window.addEventListener('click', clearModel)
restart.addEventListener('click', restartGame)