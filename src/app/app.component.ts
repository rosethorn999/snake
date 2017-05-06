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

  ngOnInit() {
    this.setBoard();
    this.setSnakePosition();

    setInterval(() => {
      this.creatFruit();
    }, 3000);
  }

  creatFruit(): void {
    let randomX: number = Math.floor(Math.random() * Board.columnCount);
    let randomY: number = Math.floor(Math.random() * Board.rowCount);
    this.fruit.position = [randomX, randomY];
    console.log(this.fruit);

  }


  setColors(col: number, row: number): string {
    let x = this.fruit.position[0];
    let y = this.fruit.position[1];

    // if (x == row && y == col) {
    //   return "#000";
    // } else if (this.snake.parts[0].x == row && this.snake.parts[0].y == col) {
    //   return COLORS.HEAD;
    // } else if (this.board[col][row] === true) {
    //   return COLORS.BODY;
    // }

    return Colors.fruit;
  };

  setBoard(): void {
    this.board = [];

    for (var i = 0; i < Board.rowCount; i++) {
      this.board[i] = [];
      for (var j = 0; j < Board.columnCount; j++) {
        this.board[i][j] = false;
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


  setSnakeColor(x: Number, y: Number): string {

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