document.addEventListener("DOMContentLoaded", () => {
  // 1. seleccionar elementos
  const bird = document.querySelector(".bird");
  const gameDisplay = document.querySelector(".game-container");
  const ground = document.querySelector(".ground-moving");

  // Definir variables del juego
  let birdLeft = 880;
  let birdBottom = 300;
  let gravity = 2;
  let isGameOver = false;
  let gap = 640;

  // 2. Comenzar juego
  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
  }

  let gameTimerId = setInterval(startGame, 20);

  // 4. Volar al dar click a la tecla espacio
  function control(e) {
    if (e.keyCode === 32) {
      jump();
    }
  }

  // 3. Función para que bird vuele
  function jump() {
    //brincar solo si birdBottom es menor a 500px
    if (birdBottom < 700) birdBottom += 40;
    bird.style.bottom = birdBottom + "px";
    console.log(birdBottom);
  }

  // 4. Volar al dar click a la tecla espacio
  document.addEventListener("keyup", control);

  // 5. Generar obstaculos
  function generateObstacle() {
    let obstacleLeft = 1820;
    let randomHeight = Math.random() * 100;
    let obstacleBottom = randomHeight;
    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");

    if (!isGameOver) {
      obstacle.classList.add("obstacle");
      topObstacle.classList.add("topObstacle");
    }
    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);

    obstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    topObstacle.style.left = obstacleLeft + "px";
    topObstacle.style.bottom = obstacleBottom + gap + "px";

    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + "px";
      topObstacle.style.left = obstacleLeft + "px";

      if (obstacleLeft === 1) {
        clearInterval(timerId);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }

      if (
        (obstacleLeft > 800 &&
          obstacleLeft < 940 &&
          birdLeft === 880 &&
          (birdBottom < obstacleBottom + 353 ||
            birdBottom > obstacleBottom + gap - 200)) ||
        birdBottom === 0
      ) {
        gameOver();
        clearInterval(timerId);
        // console.log(obstacleBottom)
        // console.log(obstacleBottom + 303)
        // console.log(obstacleBottom + gap - 253)
      }
    }

    let timerId = setInterval(moveObstacle, 20);
    if (!isGameOver) setTimeout(generateObstacle, 2500);
  }

  generateObstacle();

  function gameOver() {
    clearInterval(gameTimerId);
    console.log("game over");
    isGameOver = true;
    document.removeEventListener("keyup", control);
  }
    
});
