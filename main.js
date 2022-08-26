let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let paddleWidth = 100;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
const speed =0.05;
let score=0;


class Ball {


    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    drawBall() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }
    drawScore(){
        ctx.font="16px Arial";
        ctx.fillStyle='red';
        ctx.fillText("Score: "+score,8,20)
    }


    draw() {
        this.x += dx;
        this.y += dy;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawBall();
        this.drawScore()
        if (this.x + dx > canvas.width - ballRadius || this.x + dx < ballRadius) {
            dx = -dx;
        }
        if (this.y + dy < ballRadius) {
            if (this.x > paddle3.x && this.x < paddle3.x + paddleWidth) {
                dy = -dy
            } else {
                alert("Woa!!! được hẳn "+score+" cơ đấy.");
                this.x = canvas.width / 2;
                this.y = canvas.height;
                dx = 2;
                dy = -2;
                paddle3.x = paddleX;
                paddle2.x = paddleX;
            }
        }
        if (this.y + dy > canvas.height - ballRadius) {
            if (this.x > paddle2.x && this.x < paddle2.x + paddleWidth) {
                score++
                dy = -(dy+speed*dy);
            } else {
                alert("Có "+score+" điểm thôi à!!!")
                this.x = canvas.width / 2;
                this.y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddle3.x = paddleX;
                paddle2.x = paddleX;
                score=0;
            }
        }
    }
}

class paddle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    drawPaddle() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, paddleWidth, paddleHeight);
        ctx.fillStyle = "#131";
        ctx.fill();
        ctx.closePath();
    }


    moveRight2() {
        if (canvas.width - paddle2.x <= paddleWidth) {
            paddle2.x = canvas.width - paddleWidth
        }
        this.x = this.x + 20;

    }

    moveLeft2() {
        if (paddle2.x <= 0) {
            paddle2.x = 0
        }
        this.x = this.x - 20;

    }
}

class computerPaddle {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    drawPaddleCP() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, paddleWidth, paddleHeight);
        ctx.fillStyle = "#131";
        this.x += dx;
        ctx.fill();
        ctx.closePath();
    }


}

window.addEventListener("keydown", (e) => {


    if (e.keyCode == 39) {
        paddle2.moveRight2();
        paddle2.drawPaddle();
    }
    if (e.keyCode == 37) {
        paddle2.moveLeft2();
        paddle2.drawPaddle();
    }
})
window.addEventListener("keyup", (e) => {

    if (e.keyCode == 39) {
        paddle2.moveRight2();
        paddle2.drawPaddle();
    }
    if (e.keyCode == 37) {
        paddle2.moveLeft2();
        paddle2.drawPaddle();
    }
})
let ball = new Ball(x, y);
let paddle2 = new paddle(paddleX, canvas.height - paddleHeight);
let paddle3 = new computerPaddle(paddleX, 0);

 setInterval(() => {
    ball.draw();
    paddle3.drawPaddleCP();
    paddle2.drawPaddle();
},10)