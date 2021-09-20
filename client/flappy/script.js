document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdLeft = 220
    let birdBottom = 100
    //the bird move down with gravity
    let gravity = 2
    let isGameOver = false
    //400 pixels between top obstacle and bottom obstacle  
    let gap = 430
    

    function startGame(){

        //each time invoke this fuction, we want to minus ravity from the bird bottom
        birdBottom -= gravity
        //changing bird position, let bird go down and left
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    //set interval by passing through a function and a time
    //start gain function to invoke every 20 milliseconds 
    let gameTimerId = setInterval(startGame, 20)

    //control and password e for ebent
    function control(e){
        //if it deeply equal 32 which means space bar
        //so when we enter space key then we jump
        if (e.keyCode === 32){
            jump()
        }
    }

    //can stop set interval from running
    //clearInterval(timerId)

    function jump(){
        //each time we invoke the jump function it add 50 pixels 
        //to whatever bad bottom is before stylling the bird with this new bad bottom
        if(birdBottom < 500) 
        birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }

    //add event listener, need to pass throught 2 things - the event
    //each time the finger leaves a key on the keyboard, will inboke the jump function
    //using('keyup', jump) by using up arrow key
    document.addEventListener('keyup', control)

    //creat obstacles
    function generateObstacle(){
        let obstacleLeft = 500
        //let topObstacleLeft = 500
        //random from 0 to 60
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
       
        //creat elements and pass through into it the string of div
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        //if game is over no more obstacle disappare
        if(!isGameOver){
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        //pass through the created obstacle we just made
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle(){
            //move the obstacle, let it minus 2 from that variable each time we excute this 
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            //deeply equal to -60 means whole obstacle to be out of view
            //if obstacle equal to -60, we clear interval and pass through the timer id
            if(obstacleLeft === -60){
                //we stop this set interval from excusing
                clearInterval(timerId)
                //then grab game display, we remove child obstacle
                //pass through the obstacle to remove it
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }

            //if obstacle left lager than 200 means it's not in the last 200 pixels of its travels
            if(
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && 
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200) || 
                birdBottom === 0){
                gameOver()
                clearInterval(timerId)
            }
        }

        //we want to keep the obstacle moving, until we stop it
        //choose to invoke it every 20 milliseconds
        let timerId = setInterval(moveObstacle, 20)
        
        //generating new obstacles, once the old obstacle has gone off the grid
        //add new obstacle every 3000 milliseconds
        if(!isGameOver) setTimeout(generateObstacle, 5000)

    }
    generateObstacle()

    function gameOver(){
        clearInterval(gameTimerId)
        console.log('game over')
        isGameOver = true
        document.removeEventListener('keyup', control)
    }

})
