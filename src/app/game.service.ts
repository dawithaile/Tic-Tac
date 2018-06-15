import {Injectable} from '@angular/core';
import {TictacBlock} from './tictac-block';
import {TictacPlayer} from './tictac-player';

@Injectable()
export class GameService {

  ticTacPlayers = [];
  turn: number = 0;
  draw: number = 0;

  ticTacBlocks = [];
  freeTictacBlocksRemaining = 9;


  constructor() {
    this.initializePlayers();
    this.initializeTictacBlocks();
  }

  // Initialize tic tac blocks
  initializeTictacBlocks() {
    this.ticTacBlocks = [];

    for (var i = 0; i < 9; i++) {
      var tictacBlock = new TictacBlock();

      tictacBlock.symbol = '';
      tictacBlock.value = '';

      this.ticTacBlocks.push(tictacBlock);

    }
  }

  // Initialize Players
  initializePlayers() {

    this.ticTacPlayers = [];

    var player1 = new TictacPlayer();

    player1.comp = false;

    var player2 = new TictacPlayer();

    this.ticTacPlayers.push(player1);
    this.ticTacPlayers.push(player2);
  }

  switchTurn() {
    if (this.turn == 0) {
      this.turn = 1;
    }
    else {
      this.turn = 0;
    }
  }


  findCompMove() {
    // Priortize by checking block that is completing
    var comp_move = this.GetCompletingSet();

    if (comp_move > 0) {
      return comp_move;
    }

    // 2nd Priority Block enemy from completing Set
    var comp_move = this.blockEnemyAttemptCompleteSet();

    if (comp_move > 0) {
      return comp_move;
    }

    return Math.floor(Math.random() * 8) + 1;
  }


  // Check if the block set is complete if complete game is over
  blockSetComplete() {
    var block1 = this.ticTacBlocks[0];
    var block2 = this.ticTacBlocks[1];
    var block3 = this.ticTacBlocks[2];

    var block4 = this.ticTacBlocks[3];
    var block5 = this.ticTacBlocks[4];
    var block6 = this.ticTacBlocks[5];

    var block7 = this.ticTacBlocks[6];
    var block8 = this.ticTacBlocks[7];
    var block9 = this.ticTacBlocks[8];

    if (
      (block1.free == false && block2.free == false && block3.free == false && (block1.value == block2.value) && (block1.value == block3.value)) ||
      (block1.free == false && block4.free == false && block7.free == false && (block1.value == block4.value) && (block1.value == block7.value)) ||
      (block1.free == false && block5.free == false && block9.free == false && (block1.value == block5.value) && (block1.value == block9.value)) ||
      (block2.free == false && block5.free == false && block8.free == false && (block2.value == block5.value) && (block2.value == block8.value)) ||
      (block3.free == false && block6.free == false && block9.free == false && (block3.value == block6.value) && (block3.value == block9.value)) ||
      (block3.free == false && block5.free == false && block7.free == false && (block3.value == block5.value) && (block3.value == block7.value)) ||
      (block4.free == false && block5.free == false && block6.free == false && (block4.value == block5.value) && (block4.value == block6.value)) ||
      (block7.free == false && block8.free == false && block9.free == false && (block7.value == block8.value) && (block7.value == block9.value))
    ) {
      return true;
    }


    return false;
  }

  /*
		Check if any Block Set is completing
	*/
  GetCompletingSet() {

    var block1 = this.ticTacBlocks[0];
    var block2 = this.ticTacBlocks[1];
    var block3 = this.ticTacBlocks[2];

    var block4 = this.ticTacBlocks[3];
    var block5 = this.ticTacBlocks[4];
    var block6 = this.ticTacBlocks[5];

    var block7 = this.ticTacBlocks[6];
    var block8 = this.ticTacBlocks[7];
    var block9 = this.ticTacBlocks[8];

    // Block#1
    if (block1.free == false && block2.free == true && block3.free == false && (block1.value == 'cross' && block1.value == block3.value)) {
      return 2;

    } else if (block1.free == false && block2.free == false && block3.free == true && (block1.value == 'cross' && block1.value == block2.value)) {
      return 3;

    } else if (block1.free == false && block4.free == true && block7.free == false && (block1.value == 'cross' && block1.value == block7.value)) {
      return 4;

    } else if (block1.free == false && block4.free == false && block7.free == true && (block1.value == 'cross' && block1.value == block4.value)) {
      return 7;

    } else if (block1.free == false && block5.free == true && block9.free == false && (block1.value == 'cross' && block1.value == block9.value)) {
      return 5;

    } else if (block1.free == false && block5.free == false && block9.free == true && (block1.value == 'cross' && block1.value == block5.value)) {
      return 9;

      // Block#2
    } else if (block2.free == false && block3.free == false && block1.free == true && (block2.value == 'cross' && block2.value == block3.value)) {
      return 1;

    } else if (block2.free == false && block8.free == false && block5.free == true && (block2.value == 'cross' && block2.value == block8.value)) {
      return 5;

    } else if (block2.free == false && block8.free == true && block5.free == false && (block2.value == 'cross' && block2.value == block5.value)) {
      return 8;

      // Block#3
    } else if (block3.free == false && block6.free == true && block9.free == false && (block3.value == 'cross' && block3.value == block9.value)) {
      return 6;

    } else if (block3.free == false && block9.free == true && block6.free == false && (block3.value == 'cross' && block3.value == block6.value)) {
      return 9;

    } else if (block3.free == false && block5.free == true && block7.free == false && (block3.value == 'cross' && block3.value == block7.value)) {
      return 5;

    } else if (block3.free == false && block7.free == true && block5.free == false && (block3.value == 'cross' && block3.value == block5.value)) {
      return 7;

      // Block#4
    } else if (block4.free == false && block5.free == true && block6.free == false && (block4.value == 'cross' && block4.value == block6.value)) {
      return 5;

    } else if (block4.free == false && block6.free == true && block5.free == false && (block4.value == 'cross' && block4.value == block5.value)) {
      return 6;

      // Block#5
    } else if (block5.free == false && block4.free == true && block6.free == false && (block5.value == 'cross' && block5.value == block6.value)) {
      return 4;

      // Block#7
    } else if (block7.free == false && block8.free == true && block9.free == false && (block7.value == 'cross' && block7.value == block9.value)) {
      return 8;

    } else if (block7.free == false && block9.free == true && block8.free == false && (block7.value == 'cross' && block7.value == block8.value)) {
      return 9;

      // Block#8
    } else if (block8.free == false && block7.free == true && block9.free == false && (block8.value == 'cross' && block8.value == block9.value)) {
      return 7;

    } else {
      return 0;
    }

  }


  /*
		Block Move Attempt to Complete Set
	*/
  blockEnemyAttemptCompleteSet() {

    var block1 = this.ticTacBlocks[0];
    var block2 = this.ticTacBlocks[1];
    var block3 = this.ticTacBlocks[2];

    var block4 = this.ticTacBlocks[3];
    var block5 = this.ticTacBlocks[4];
    var block6 = this.ticTacBlocks[5];

    var block7 = this.ticTacBlocks[6];
    var block8 = this.ticTacBlocks[7];
    var block9 = this.ticTacBlocks[8];


    // Block#1
    if (block1.free == false && block2.free == true && block3.free == false && (block1.value == block3.value)) {
      return 2;

    } else if (block1.free == false && block2.free == false && block3.free == true && (block1.value == block2.value)) {
      return 3;

    } else if (block1.free == false && block4.free == true && block7.free == false && (block1.value == block7.value)) {
      return 4;

    } else if (block1.free == false && block4.free == false && block7.free == true && (block1.value == block4.value)) {
      return 7;

    } else if (block1.free == false && block5.free == true && block9.free == false && (block1.value == block9.value)) {
      return 5;

    } else if (block1.free == false && block5.free == false && block9.free == true && (block1.value == block5.value)) {
      return 9;

      // Block#2
    } else if (block2.free == false && block3.free == false && block1.free == true && (block2.value == block3.value)) {
      return 1;

    } else if (block2.free == false && block8.free == false && block5.free == true && (block2.value == block8.value)) {
      return 5;

    } else if (block2.free == false && block8.free == true && block5.free == false && (block2.value == block5.value)) {
      return 8;

      // Block#3
    } else if (block3.free == false && block6.free == true && block9.free == false && (block3.value == block9.value)) {
      return 6;

    } else if (block3.free == false && block9.free == true && block6.free == false && (block3.value == block6.value)) {
      return 9;

    } else if (block3.free == false && block5.free == true && block7.free == false && (block3.value == block7.value)) {
      return 5;

    } else if (block3.free == false && block7.free == true && block5.free == false && (block3.value == block5.value)) {
      return 7;

      // Block#4
    } else if (block4.free == false && block5.free == true && block6.free == false && (block4.value == block6.value)) {
      return 5;

    } else if (block4.free == false && block6.free == true && block5.free == false && (block4.value == block5.value)) {
      return 6;

      // Block#5
    } else if (block5.free == false && block4.free == true && block6.free == false && (block5.value == block6.value)) {
      return 4;

      // Block#7
    } else if (block7.free == false && block8.free == true && block9.free == false && (block7.value == block9.value)) {
      return 8;

    } else if (block7.free == false && block9.free == true && block8.free == false && (block7.value == block8.value)) {
      return 9;

      // Block#8
    } else if (block8.free == false && block7.free == true && block9.free == false && (block8.value == block9.value)) {
      return 7;

    } else {
      return 0;
    }
  }

}
