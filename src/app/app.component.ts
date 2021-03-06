import { Component, OnInit } from '@angular/core';
import { Controls, Board, Colors } from './app.consts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})

export class AppComponent implements OnInit {
  state;
  board;
  Snake;
  fruit;

  ngOnInit() {
    this.initValues();
    this.setBoard();
    this.setFruit();
    this.setSnakePosition();
  }

  initValues() {
    this.state = {
      pause: false,
      interval: 150,
      storm: { past: 150, new: 50 },
      isEating: false,
      noWall: true,
      gameOver: false,
      score:0
    };
    this.board = [];
    this.Snake = {
      direction: Controls.RIGHT,
      position: [
        [0, 0], [0, 1], [0, 2]
      ]
    };
    this.fruit = {
      position: [0, 0]
    };
  }

  setBoard(): void {
    this.board = [];
    let isFull: boolean = false; //todo bug:滿版蛇會跑不到盡頭
    if (isFull) {
      let maxRowCount: number = Math.floor(window.innerHeight / 30);
      let maxColumnCount: number = Math.floor(window.innerWidth / 30);
      Board.rowCount = maxRowCount;
      Board.columnCount = maxColumnCount;
    }

    for (var i = 0; i < Board.rowCount; i++) {
      this.board[i] = [];
      for (var j = 0; j < Board.columnCount; j++) {
        this.board[i][j] = false;
      }
    }
  }

  setFruit(): void {
    let getRandom = function (isRow: boolean): number {
      let ratio: number = isRow ? Board.rowCount : Board.columnCount;
      return Math.floor(Math.random() * ratio);
    }

    let randomX: number = getRandom(true);
    let randomY: number = getRandom(false);

    for (let i = 0; i < this.Snake.position.length; i++) {
      if (randomX == this.Snake.position[i][0] && randomY == this.Snake.position[i][1]) {
        this.setFruit(); //水果產生在蛇上 就要 重新生一顆水果
        break;
      } else {
        this.fruit.position = [randomX, randomY];
        this.playAudio("poka01");
        this.state.score++;
      }
    }
  }

  setSnakePosition() {
    let timer;
    let tempArray = [];

    switch (this.Snake.direction) {
      case Controls.LEFT:
        tempArray.push(this.Snake.position[this.Snake.position.length - 1][0]); //x
        tempArray.push(this.Snake.position[this.Snake.position.length - 1][1] - 1); //y
        break;
      case Controls.RIGHT:
        tempArray.push(this.Snake.position[this.Snake.position.length - 1][0]); //x
        tempArray.push(this.Snake.position[this.Snake.position.length - 1][1] + 1); //y
        break;
      case Controls.UP:
        tempArray.push(this.Snake.position[this.Snake.position.length - 1][0] - 1); //x
        tempArray.push(this.Snake.position[this.Snake.position.length - 1][1]); //y
        break;
      case Controls.DOWN:
        tempArray.push(this.Snake.position[this.Snake.position.length - 1][0] + 1); //x
        tempArray.push(this.Snake.position[this.Snake.position.length - 1][1]); //y
        break;
    }

    if (this.state.noWall) {
      if (tempArray[0] >= this.board[0].length) tempArray[0] = 0;
      else if (tempArray[0] < 0) tempArray[0] = this.board[0].length - 1;

      if (tempArray[1] >= this.board.length) tempArray[1] = 0;
      else if (tempArray[1] < 0) tempArray[1] = this.board.length - 1;
    }

    if (!this.isCollision(tempArray)) {
      this.Snake.position.push(tempArray); //新的頭
      if (!this.state.isEating) this.Snake.position.shift(); //移除第一個值(尾巴)
      else this.state.isEating = false;

      if (tempArray[0] == this.fruit.position[0] && tempArray[1] == this.fruit.position[1]) { //頭跟水果重疊
        this.setFruit(); //產生新水果
        this.state.isEating = true;
        if (this.state.interval > 50) {
          clearTimeout(timer);
          this.state.interval -= 5;
          this.state.storm.past = this.state.interval;
        }
      }
    }

    if (!this.state.pause && !this.state.gameOver) {
      timer = setTimeout(() => {
        this.setSnakePosition();
      }, this.state.interval);
    }
  }

  isCollision(tempArray: any): boolean {
    let x = tempArray[0];
    let y = tempArray[1];
    if ((y < 0) || (y >= this.board.length) || (x < 0) || (x >= this.board[0].length)) {
      this.state.gameOver = true;
      this.playAudio("jump04");
      return true;
    }

    for (let i = 0; i < this.Snake.position.length - 1; i++) {
      if (this.Snake.position[i][0] == x && this.Snake.position[i][1] == y) {
        this.state.gameOver = true;
        this.playAudio("jump04");
        return true;
      }
    }
    return false;
  }

  handleKeyboardEvents(e: KeyboardEvent) {
    //todo bug:蛇快速切換方向的時間<interval的話會可以掉頭
    let pastDirection = this.Snake.direction;
    if (e.keyCode !== pastDirection) {
      if (e.keyCode === Controls.RIGHT && pastDirection !== Controls.LEFT) {
        this.Snake.direction = Controls.RIGHT;
      } else if (e.keyCode === Controls.LEFT && pastDirection !== Controls.RIGHT) {
        this.Snake.direction = Controls.LEFT;
      } else if (e.keyCode === Controls.UP && pastDirection !== Controls.DOWN) {
        this.Snake.direction = Controls.UP;
      } else if (e.keyCode === Controls.DOWN && pastDirection !== Controls.UP) {
        this.Snake.direction = Controls.DOWN;
      }
    }

    if (e.keyCode == Controls.SPACE) {
      if (this.state.pause) { //已經是暫停的
        this.state.pause = false;
        this.setSnakePosition();
      } else { //遊戲中
        this.state.pause = true;
      }
    }

    if (e.keyCode == Controls.B) {
      if (this.state.interval == this.state.storm.new) { //已經是暴衝模式
        this.state.interval = this.state.storm.past; //一般
      } else { //一般速度模式
        this.state.interval = this.state.storm.new; //暴衝
      }
    }

    if (e.keyCode == Controls.wallSW) { //切換是否會撞牆死亡
      this.state.noWall= !this.state.noWall;
    }

    if (e.keyCode == Controls.RESTART && this.state.gameOver) {
      this.ngOnInit();
    }

  }

  setColors(x: Number, y: Number): string {
    let fruitX = this.fruit.position[0];
    let fruitY = this.fruit.position[1];
    let isInSnake: boolean = false;

    if (x == fruitX && y == fruitY) {
      return Colors.fruit; //水果
    }

    for (let i = 0; i < this.Snake.position.length; i++) {
      if (x == this.Snake.position[i][0] && y == this.Snake.position[i][1]) {
        if (i == this.Snake.position.length - 1) return Colors.snake_head; //蛇頭
        return Colors.snake_body; //蛇身
      };
    }

    return Colors.background; //背景
  }

  playAudio(v): void {
    let audio = new Audio('./assets/' + v + '.mp3');
    audio.volume = 0.3;
    audio.play();
  }
}