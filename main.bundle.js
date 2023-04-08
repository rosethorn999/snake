webpackJsonp([1,4],{

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(44)();
// imports


// module
exports.push([module.i, ".container1 {\r\n    margin: 0px auto;\r\n    width: 600px;\r\n    height: 600px;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    right: 0;\r\n}\r\n.board{\r\n    position: absolute;\r\n    bottom: 0;\r\n    right: 0;\r\n}\r\n.badge {\r\n    display: inline-block;\r\n    min-width: 10px;\r\n    padding: 3px 7px;   \r\n    color: #fff;   \r\n    background-color: #777;\r\n    border-radius: 10px;\r\n}\r\n.row {\r\n    height: 30px;\r\n}\r\n\r\n.column {\r\n    border: 1px solid rgba(97, 131, 138, .3);\r\n    width: 28px;\r\n    height: 28px;\r\n    /*background: cadetblue;*/\r\n    display: inline-block;\r\n    cursor: pointer;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 136:
/***/ (function(module, exports) {

module.exports = "<!-- <h3>\n    <a href=\"https://samirhodzic.github.io/ngx-snake/\">https://samirhodzic.github.io/ngx-snake/</a>\n</h3> -->\n\n<div class=\"container\">\n    <div class=\"container1\">\n        <div class=\"board\">\n            <ul>\n                <li>Move:\n                    <span class=\"badge\">↑ ↓ ← →</span>\n                </li>\n                <li>Restart:\n                    <span class=\"badge\">F5</span>\n                </li>\n                <li>Pause:\n                    <span class=\"badge\">SPACE</span>\n                </li>\n                <li>Wall SW:\n                    <span class=\"badge\">W</span>\n                </li>\n                <li>CrazyMode SW:\n                    <span class=\"badge\">B</span>\n                </li>\n                <li>Score:\n                    <span class=\"badge\">{{state.score}}</span>\n                </li>\n            </ul>\n        </div>\n        <div class=\"row\" *ngFor=\"let column of board ; let i = index;\">\n            <div class=\"column\" *ngFor=\"let row of column; let j = index;\" [ngStyle]=\"{'background-color': setColors(i,j)}\"></div>\n        </div>\n\n    </div>"

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(70);


/***/ }),

/***/ 69:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 69;


/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(80);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_consts__ = __webpack_require__(78);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        this.initValues();
        this.setBoard();
        this.setFruit();
        this.setSnakePosition();
    };
    AppComponent.prototype.initValues = function () {
        this.state = {
            pause: false,
            interval: 150,
            storm: { past: 150, new: 50 },
            isEating: false,
            noWall: true,
            gameOver: false,
            score: 0
        };
        this.board = [];
        this.Snake = {
            direction: __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].RIGHT,
            position: [
                [0, 0], [0, 1], [0, 2]
            ]
        };
        this.fruit = {
            position: [0, 0]
        };
    };
    AppComponent.prototype.setBoard = function () {
        this.board = [];
        var isFull = false; //todo bug:滿版蛇會跑不到盡頭
        if (isFull) {
            var maxRowCount = Math.floor(window.innerHeight / 30);
            var maxColumnCount = Math.floor(window.innerWidth / 30);
            __WEBPACK_IMPORTED_MODULE_1__app_consts__["b" /* Board */].rowCount = maxRowCount;
            __WEBPACK_IMPORTED_MODULE_1__app_consts__["b" /* Board */].columnCount = maxColumnCount;
        }
        for (var i = 0; i < __WEBPACK_IMPORTED_MODULE_1__app_consts__["b" /* Board */].rowCount; i++) {
            this.board[i] = [];
            for (var j = 0; j < __WEBPACK_IMPORTED_MODULE_1__app_consts__["b" /* Board */].columnCount; j++) {
                this.board[i][j] = false;
            }
        }
    };
    AppComponent.prototype.setFruit = function () {
        var getRandom = function (isRow) {
            var ratio = isRow ? __WEBPACK_IMPORTED_MODULE_1__app_consts__["b" /* Board */].rowCount : __WEBPACK_IMPORTED_MODULE_1__app_consts__["b" /* Board */].columnCount;
            return Math.floor(Math.random() * ratio);
        };
        var randomX = getRandom(true);
        var randomY = getRandom(false);
        for (var i = 0; i < this.Snake.position.length; i++) {
            if (randomX == this.Snake.position[i][0] && randomY == this.Snake.position[i][1]) {
                this.setFruit(); //水果產生在蛇上 就要 重新生一顆水果
                break;
            }
            else {
                this.fruit.position = [randomX, randomY];
                this.playAudio("poka01");
                this.state.score++;
            }
        }
    };
    AppComponent.prototype.setSnakePosition = function () {
        var _this = this;
        var timer;
        var tempArray = [];
        switch (this.Snake.direction) {
            case __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].LEFT:
                tempArray.push(this.Snake.position[this.Snake.position.length - 1][0]); //x
                tempArray.push(this.Snake.position[this.Snake.position.length - 1][1] - 1); //y
                break;
            case __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].RIGHT:
                tempArray.push(this.Snake.position[this.Snake.position.length - 1][0]); //x
                tempArray.push(this.Snake.position[this.Snake.position.length - 1][1] + 1); //y
                break;
            case __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].UP:
                tempArray.push(this.Snake.position[this.Snake.position.length - 1][0] - 1); //x
                tempArray.push(this.Snake.position[this.Snake.position.length - 1][1]); //y
                break;
            case __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].DOWN:
                tempArray.push(this.Snake.position[this.Snake.position.length - 1][0] + 1); //x
                tempArray.push(this.Snake.position[this.Snake.position.length - 1][1]); //y
                break;
        }
        if (this.state.noWall) {
            if (tempArray[0] >= this.board[0].length)
                tempArray[0] = 0;
            else if (tempArray[0] < 0)
                tempArray[0] = this.board[0].length - 1;
            if (tempArray[1] >= this.board.length)
                tempArray[1] = 0;
            else if (tempArray[1] < 0)
                tempArray[1] = this.board.length - 1;
        }
        if (!this.isCollision(tempArray)) {
            this.Snake.position.push(tempArray); //新的頭
            if (!this.state.isEating)
                this.Snake.position.shift(); //移除第一個值(尾巴)
            else
                this.state.isEating = false;
            if (tempArray[0] == this.fruit.position[0] && tempArray[1] == this.fruit.position[1]) {
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
            timer = setTimeout(function () {
                _this.setSnakePosition();
            }, this.state.interval);
        }
    };
    AppComponent.prototype.isCollision = function (tempArray) {
        var x = tempArray[0];
        var y = tempArray[1];
        if ((y < 0) || (y >= this.board.length) || (x < 0) || (x >= this.board[0].length)) {
            this.state.gameOver = true;
            this.playAudio("jump04");
            return true;
        }
        for (var i = 0; i < this.Snake.position.length - 1; i++) {
            if (this.Snake.position[i][0] == x && this.Snake.position[i][1] == y) {
                this.state.gameOver = true;
                this.playAudio("jump04");
                return true;
            }
        }
        return false;
    };
    AppComponent.prototype.handleKeyboardEvents = function (e) {
        //todo bug:蛇快速切換方向的時間<interval的話會可以掉頭
        var pastDirection = this.Snake.direction;
        if (e.keyCode !== pastDirection) {
            if (e.keyCode === __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].RIGHT && pastDirection !== __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].LEFT) {
                this.Snake.direction = __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].RIGHT;
            }
            else if (e.keyCode === __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].LEFT && pastDirection !== __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].RIGHT) {
                this.Snake.direction = __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].LEFT;
            }
            else if (e.keyCode === __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].UP && pastDirection !== __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].DOWN) {
                this.Snake.direction = __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].UP;
            }
            else if (e.keyCode === __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].DOWN && pastDirection !== __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].UP) {
                this.Snake.direction = __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].DOWN;
            }
        }
        if (e.keyCode == __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].SPACE) {
            if (this.state.pause) {
                this.state.pause = false;
                this.setSnakePosition();
            }
            else {
                this.state.pause = true;
            }
        }
        if (e.keyCode == __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].B) {
            if (this.state.interval == this.state.storm.new) {
                this.state.interval = this.state.storm.past; //一般
            }
            else {
                this.state.interval = this.state.storm.new; //暴衝
            }
        }
        if (e.keyCode == __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].wallSW) {
            this.state.noWall = !this.state.noWall;
        }
        if (e.keyCode == __WEBPACK_IMPORTED_MODULE_1__app_consts__["a" /* Controls */].RESTART && this.state.gameOver) {
            this.ngOnInit();
        }
    };
    AppComponent.prototype.setColors = function (x, y) {
        var fruitX = this.fruit.position[0];
        var fruitY = this.fruit.position[1];
        var isInSnake = false;
        if (x == fruitX && y == fruitY) {
            return __WEBPACK_IMPORTED_MODULE_1__app_consts__["c" /* Colors */].fruit; //水果
        }
        for (var i = 0; i < this.Snake.position.length; i++) {
            if (x == this.Snake.position[i][0] && y == this.Snake.position[i][1]) {
                if (i == this.Snake.position.length - 1)
                    return __WEBPACK_IMPORTED_MODULE_1__app_consts__["c" /* Colors */].snake_head; //蛇頭
                return __WEBPACK_IMPORTED_MODULE_1__app_consts__["c" /* Colors */].snake_body; //蛇身
            }
            ;
        }
        return __WEBPACK_IMPORTED_MODULE_1__app_consts__["c" /* Colors */].background; //背景
    };
    AppComponent.prototype.playAudio = function (v) {
        var audio = new Audio('./assets/' + v + '.mp3');
        audio.volume = 0.3;
        audio.play();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(136),
        styles: [__webpack_require__(134)],
        host: {
            '(document:keydown)': 'handleKeyboardEvents($event)'
        }
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Controls; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Colors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Board; });
var Controls = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    SPACE: 32,
    B: 66,
    wallSW: 87,
    RESTART: 27
};
var Colors = {
    background: 'cadetblue',
    snake_head: 'red',
    snake_body: 'yellow',
    fruit: 'green'
};
var Board = {
    rowCount: 20,
    columnCount: 20
};
//# sourceMappingURL=app.consts.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(77);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ })

},[161]);
//# sourceMappingURL=main.bundle.js.map