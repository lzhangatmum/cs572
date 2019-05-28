
  Array.prototype.removeNum =    Rx.Observable.timer(1000).subscribe( function (num) {
    return this.filter(function(i){return i != num})
  });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var list = [1,3,4,2,1,5,1];

var delNum = 1;


console.log('Start');

console.log( [1,3,4,2,1,5,1].removeNum(1));

console.log('Fiish');
