/*
 * Jeremy Robert Anderson
 */
function Snake(grid) {
    this.tail = [];
    this.pos = createVector(floor(random(0, grid.width)), floor(random(0, grid.height)));
    this.direction = createVector(0,0);
    this.color = color(255, 255, 255, 255);
    this.isDead = false;
}

Snake.prototype = Object.create(Snake.prototype);
Snake.prototype.constructor = Snake;
Snake.prototype.render = function(grid) {
    for (var i = 0; i < this.tail.length; ++i) {
        grid.fillSquare(this.tail[i].x, this.tail[i].y, this.color);
    }
    grid.fillSquare(this.pos.x, this.pos.y, this.color);
}

Snake.prototype.setDirection = function(direction) {
    if (direction.x != -this.direction.x || direction.y != -this.direction.y) {
        this.direction = direction.copy();
    }
}

Snake.prototype.checkIfDead = function(grid, newPos) {
    var dead = false;
    if (newPos.x >= grid.width) {
        dead = true;
    } else if (newPos.x < 0) {
        dead = true;
    } else if (newPos.y >= grid.height) {
        dead = true;
    } else if (newPos.y < 0) {
        dead = true;
    }

    for (var i = 0; i < this.tail.length; ++i)
    {
        if (this.tail[i].equals(newPos))
        {
            dead = true;
        }
    }

    this.isDead = dead;
}

Snake.prototype.update = function(token, grid) {
    var newPos = this.pos.copy();
    newPos.add(this.direction);
    var hit = false;

    this.checkIfDead(grid, newPos);
    if (this.isDead === true) {
        return hit;
    }

    if (newPos.equals(token)) {
        this.tail.push(this.pos.copy());
        hit = true;
    } else {
        if (this.tail.length > 1) {
            for (var i = 1; i < this.tail.length; ++i) {
                this.tail[i - 1] = this.tail[i];
            }
        }
        if (this.tail.length > 0) {
            this.tail[this.tail.length - 1] = this.pos;
        }
    }
    this.pos = newPos;
    return hit;
}
