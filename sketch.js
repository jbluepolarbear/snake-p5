/*
 * Jeremy Robert Anderson
 */
var grid;
var snake;
var token;
var allowInput;
var scoreBuffer = 40;
var scoreTextSize = 32;
var gameWon;
function setup() {
    createCanvas(720, 400);
    frameRate(5);
    reset();
}

function reset() {
    grid = new Grid(width, height - scoreBuffer, 15);
    snake = new Snake(grid);
    gameWon = false;
    resetToken();
    allowInput = true;
}

function resetToken() {
    if (snake.tail.length + 1 >= grid.width * grid.height) {
        gameWon = true;
        return;
    }
    do {
        token = createVector(floor(random(0, grid.width)), floor(random(0, grid.height)));
    } while (snakeTailContainsToken() && snake.pos.equals(token));
}

function showScore() {
    push();
    stroke(255, 255, 255);
    line(0, height - scoreBuffer, width, height - scoreBuffer);
    fill(255, 255, 255);
    textSize(scoreTextSize);
    textFont("Helvetica");
    text("Score: " + snake.tail.length.toString(), 10, height - (scoreBuffer - scoreTextSize));
    pop();
}

function showGameWon() {
    push();
    fill(255, 255, 255);
    textSize(scoreTextSize);
    textFont("Helvetica");
    text("Game Won! Press R to restart!", 250, height - (scoreBuffer - scoreTextSize));
    pop();
}

function snakeTailContainsToken() {
    for (var i = 0; i < snake.tail.length; ++i) {
        if (snake.tail[i].equals(token)) {
            return true;
        }
    }
    return false;
}

function keyPressed() {
    if (keyCode === 82) {
        reset();
        return;
    }
    if (allowInput === false) {
        return;
    }
    allowInput = false;

    if (keyCode === LEFT_ARROW) {
        snake.setDirection(createVector(-1, 0));
    } else if (keyCode === RIGHT_ARROW) {
        snake.setDirection(createVector(1, 0));
    } else if (keyCode === UP_ARROW) {
        snake.setDirection(createVector(0, -1));
    } else if (keyCode === DOWN_ARROW) {
        snake.setDirection(createVector(0, 1));
    }
}

function draw() {
    background(0);
    //grid.render();
    if (gameWon) {
        snake.render(grid);
        showScore();
        showGameWon();
        return;
    }

    if (snake.update(token, grid) === true) {
        resetToken();
    }
    if (snake.isDead === true) {
        reset();
        return;
    }
    showScore();
    grid.fillSquare(token.x, token.y, color(0, 255, 0, 255));
    snake.render(grid);
    allowInput = true;
}
