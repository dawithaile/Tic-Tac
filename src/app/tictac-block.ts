export class TictacBlock {

  free: boolean = true;

  value: string = '';
  symbol: string = '';

  setValue(value) {
    this.value = value;

    if (this.value == 'tick') {
      this.symbol = 'done';
    }
    else {
      this.symbol = 'close';
    }

  }


}
