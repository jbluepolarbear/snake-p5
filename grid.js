/*
 * Jeremy Robert Anderson
 */
function Grid(inWidth, inHeight, minNumber) {
    if (inHeight < inWidth) {
        this.squareSize = floor(inHeight / minNumber);
    } else {
        this.squareSize = floor(inWidth / minNumber);
    }
    this.width = floor(inWidth / this.squareSize);
    this.height = floor(inHeight / this.squareSize);
    this.xOffset = (inWidth % this.squareSize) / 2 - 1;
    this.yOffset = (inHeight % this.squareSize) / 2 - 1;
}

Grid.prototype = Object.create(Grid.prototype);
Grid.prototype.constructor = Grid;
Grid.prototype.render = function() {
    push();
    translate(this.xOffset, this.yOffset);
    stroke(128, 128, 255);
    for (var x = 1; x < this.width; ++x) {
        line(x * this.squareSize, 0, x * this.squareSize, this.height * this.squareSize);
    }
    for (var y = 1; y < this.height; ++y) {
        line(0, y * this.squareSize, this.width * this.squareSize, y * this.squareSize);
    }
    pop();
}

Grid.prototype.gridToWorld = function(xGrid, yGrid) {
    return createVector(xGrid * this.squareSize + this.xOffset, yGrid * this.squareSize + this.yOffset);
}

Grid.prototype.fillSquare = function(xGrid, yGrid, inColor) {
    push();
    var position = this.gridToWorld(xGrid, yGrid);
    translate(position.x, position.y);
    fill(inColor);
    var dimming = 0;
    rect(dimming, dimming, this.squareSize - dimming*2, this.squareSize - dimming*2, 5);
    pop();
}
