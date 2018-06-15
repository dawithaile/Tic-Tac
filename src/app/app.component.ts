import {Component} from '@angular/core';
import {GameService} from './game.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GameService]
})
export class AppComponent {

  // Local variable
  lock = false;
  drawHis: number = 0;
  player1His: number = 0;
  computerHis: number = 0;
  totalNumberOfGames: number = 0;


  constructor(public gameService: GameService, public snackBar: MatSnackBar) {


  }

  // Start next game
  nextGame() {
    this.gameService.freeTictacBlocksRemaining = 9;
    this.gameService.initializeTictacBlocks();
    this.lock = false;
    this.gameService.turn = 0;
  }

  // Reset game values
  resetGameValues() {
    this.gameService.freeTictacBlocksRemaining = 9;
    this.gameService.initializeTictacBlocks();
    this.gameService.turn = 0;
    this.gameService.ticTacPlayers[0].score = 0;
    this.gameService.ticTacPlayers[1].score = 0;
    this.gameService.draw = 0;
  }

  // Start new game
  startNewGame() {
    this.resetGameValues();
  }

  // Reset hall game
  resetGame(event) {
    location.reload();
    event.preventDefault();
  }

  // when tic tac block is clicked check block value
  playerClick(i) {
    if (this.gameService.ticTacBlocks[i].free == false || this.lock == true) {
      return;
    }

    // decrement free tick tack blocks remaining
    this.gameService.freeTictacBlocksRemaining -= 1;

    // if free tic tac block is zero with out winner set it to draw
    if (this.gameService.freeTictacBlocksRemaining <= 0) {

      this.gameService.draw += 1;
      this.lock = true;
      this.snackBar.open('Game:', 'Draw', {
        duration: 4000,
      });

      // Increment the number of draws and total number of games
      this.drawHis++;
      this.totalNumberOfGames++;

      this.nextGame();
      return;
    }

    // if player 1 turn set tick
    if (this.gameService.turn == 0) {
      this.gameService.ticTacBlocks[i].setValue('tick');
      this.gameService.ticTacBlocks[i].free = false;


    }
    // if computer turn set cross
    else {
      this.gameService.ticTacBlocks[i].setValue('cross');
      this.gameService.ticTacBlocks[i].free = false;

    }

    var complete = this.gameService.blockSetComplete();

    // If game is complete display the winner
    if (complete == true) {
      this.gameService.ticTacPlayers[this.gameService.turn].score += 1;
      this.snackBar.open('Winner', 'Player ' + (this.gameService.turn + 1), {
        duration: 4000,
      });
      if (this.gameService.turn == 0) {
        this.player1His++;
        this.totalNumberOfGames++;
      }
      else {
        this.computerHis++;
        this.totalNumberOfGames++;
      }
      this.nextGame();
      return;

    }
    else {
      this.switchTurn();
    }

  }

  // check if computer turn or player turn
  compTurn() {
    if (this.gameService.freeTictacBlocksRemaining <= 0) {
      return;
    }

    var comp_selected = this.gameService.findCompMove() - 1;

    if (this.gameService.ticTacBlocks[comp_selected].free == true) {
      this.playerClick(comp_selected);
    }
    else {
      this.compTurn();
      return;
    }

  }

  // switch turns
  switchTurn() {
    this.gameService.switchTurn();
    if (this.gameService.turn == 1) {
      this.compTurn();
    }
  }

  // Get game history
  getGameHistory() {
    alert('Total Number of Games : ' + this.totalNumberOfGames + '\n' + 'Draw :  ' + this.drawHis + '\n' + 'Player 1 Won : ' + this.player1His + '\n' + 'Computer Won :  ' + this.computerHis);
  }
}
