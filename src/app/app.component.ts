import { Component, OnInit } from '@angular/core';
import { Controls } from './app.consts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class AppComponent implements OnInit {

  board = [];
  EventDirect: number;


  ngOnInit() {
    this.setBoard();
  }

  setBoard(): void {
    this.board = [];

    for (var i = 0; i < 16; i++) {
      this.board[i] = [];
      for (var j = 0; j < 16; j++) {
        this.board[i][j] = false;
      }
    }
  }

  handleKeyboardEvents(e: KeyboardEvent) {
    if (e.keyCode === Controls.RIGHT) {
      this.EventDirect = Controls.RIGHT;
    } else if (e.keyCode === Controls.LEFT) {
      this.EventDirect = Controls.LEFT;
    } else if (e.keyCode === Controls.UP) {
      this.EventDirect = Controls.UP;
    }
    else if (e.keyCode === Controls.DOWN) {
      this.EventDirect = Controls.DOWN;
    }
  }
}