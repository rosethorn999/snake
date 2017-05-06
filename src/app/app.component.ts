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
  EventDirect: number;
  interval: Number = 150;
  board = [];
  Snake = {
    direction: Controls.RIGHT,
    position: [
      [0, 0], [0, 1], [0, 2]
    ]
  };
  fruit = {
    position: [0, 0]
  };
  isEating: boolean = false;

  ngOnInit() {
    this.setBoard();
    this.setSnakePosition();

    setInterval(() => {
      this.createFruit(); //todo碰撞到水國時要執行
    }, 1000);
  }

  createFruit(): void {
    let getRandom = function (isRow: boolean): number {
      let ratio: number = isRow ? Board.rowCount : Board.columnCount;
      return Math.floor(Math.random() * ratio);
    }

    let randomX: number = getRandom(true);
    let randomY: number = getRandom(false);

    for (let i = 0; i < this.Snake.position.length; i++) {
      if (randomX == this.Snake.position[i][0] && randomY == this.Snake.position[i][1]) {
        this.createFruit(); //是蛇就重新取一個
        break;
      } else {
        this.fruit.position = [randomX, randomY];
      }
    }
  }

  handleKeyboardEvents(e: KeyboardEvent) {
    if (e.keyCode === Controls.RIGHT) {
      this.Snake.direction = Controls.RIGHT;
    } else if (e.keyCode === Controls.LEFT) {
      this.Snake.direction = Controls.LEFT;
    } else if (e.keyCode === Controls.UP) {
      this.Snake.direction = Controls.UP;
    } else if (e.keyCode === Controls.DOWN) {
      this.Snake.direction = Controls.DOWN;
    }
  }

  setBoard(): void {
    this.board = [];

    for (var i = 0; i < Board.rowCount; i++) {
      this.board[i] = [];
      for (var j = 0; j < Board.columnCount; j++) {
        this.board[i][j] = false;
      }
    }
  }

  setColors(x: Number, y: Number): string {
    let fruitX = this.fruit.position[0];
    let fruitY = this.fruit.position[1];
    let isInSnake: boolean = false;

    if (x == fruitX && y == fruitY) {
      return Colors.fruit;
    }

    for (let i = 0; i < this.Snake.position.length; i++) {
      if (x == this.Snake.position[i][0] && y == this.Snake.position[i][1]) {
        if (i == this.Snake.position.length - 1) return Colors.snake_head;
        return Colors.snake_body;
      };
    }
    return Colors.background;
  }

  setSnakePosition() {
    let tempArray = [];
    switch (this.Snake.direction) {
      case Controls.LEFT:
        if (this.Snake.position[this.Snake.position.length - 1][1] - 1 >= 0) {
          tempArray.push(this.Snake.position[this.Snake.position.length - 1][0]); //x
          tempArray.push(this.Snake.position[this.Snake.position.length - 1][1] - 1); //y
          this.Snake.position.push(tempArray);
          this.Snake.position.shift(); //移除第一個值
        }
        break;
      case Controls.RIGHT:
        if (this.Snake.position[this.Snake.position.length - 1][1] + 1 < this.board.length) {
          tempArray.push(this.Snake.position[this.Snake.position.length - 1][0]); //x
          tempArray.push(this.Snake.position[this.Snake.position.length - 1][1] + 1); //y
          this.Snake.position.push(tempArray);
          this.Snake.position.shift(); //移除第一個值
        }
        break;
      case Controls.UP:
        if (this.Snake.position[this.Snake.position.length - 1][0] - 1 >= 0) {
          tempArray.push(this.Snake.position[this.Snake.position.length - 1][0] - 1); //x
          tempArray.push(this.Snake.position[this.Snake.position.length - 1][1]); //y
          this.Snake.position.push(tempArray);
          this.Snake.position.shift(); //移除第一個值
        }
        break;
      case Controls.DOWN:
        if (this.Snake.position[this.Snake.position.length - 1][0] + 1 < this.board[0].length) {
          tempArray.push(this.Snake.position[this.Snake.position.length - 1][0] + 1); //x
          tempArray.push(this.Snake.position[this.Snake.position.length - 1][1]); //y
          this.Snake.position.push(tempArray);
          this.Snake.position.shift(); //移除第一個值
        }
        break;
    }

    setTimeout(() => {
      this.setSnakePosition();
    }, this.interval);

  }

}