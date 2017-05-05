import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  board = [];

  setBoard(): void {
    this.board = [];

    for (var i = 0; i < 16; i++) {
      this.board[i] = [];
      for (var j = 0; j < 16; j++) {
        this.board[i][j] = false;
      }
    }
  }
  ngOnInit() {
    this.setBoard();
  }
}
