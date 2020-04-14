var scores,roundScore,activePlayer,gamePlay,lastDice1,lastDice2;

function restart()
{
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlay = true;
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    
    document.querySelector('.final-score').value = null;
}

function nextPlayer()
{
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0'; 
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

restart();

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlay)
        {
            var dice1 = Math.floor(Math.random()*6)+1;
            var dice2 = Math.floor(Math.random()*6)+1;
            var diceDOM1 = document.getElementById('dice-1');
            diceDOM1.style.display = 'block';
            diceDOM1.src = 'dice-'+dice1+'.png';
            var diceDOM2 = document.getElementById('dice-2');
            diceDOM2.style.display = 'block';
            diceDOM2.src = 'dice-'+dice2+'.png';
            if ((dice1 === 6 && lastDice1 === 6) || (dice2 === 6 && lastDice2 === 6))
            {
                scores[activePlayer] = 0;
                document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            }
            else if(dice1 !== 1 && dice2 !==1)
            {
                roundScore = roundScore + dice1 + dice2;
                document.querySelector('#current-'+activePlayer).textContent = roundScore;
            }
            else 
                nextPlayer();
            
            lastDice1 = dice1;
            lastDice2 = dice2;
        }
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlay)
        {
            scores[activePlayer] += roundScore;
            document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
            var finalScore, inputScore = document.querySelector('.final-score').value;
            if(inputScore)
                finalScore = inputScore; 
            else
                finalScore = 100; 
            if (scores[activePlayer] >= finalScore)
            {
                
                document.getElementById('name-'+activePlayer).textContent = 'Winner!';
                document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
                document.getElementById('dice-1').style.display = 'none';
                document.getElementById('dice-2').style.display = 'none';
                document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
                gamePlay = false;
            }
            else
                nextPlayer();
        }
});

document.querySelector('.btn-new').addEventListener('click',restart);







































