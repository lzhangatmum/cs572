  Array.prototype.removeNum =  function (num) {
    let arr = this;
    return new Promise(function (resolve, reject) {
        resolve(arr.filter(n => n != num));
    });
  };


var list = [1,3,4,2,1,5,1];

var delNum = 1;


console.log('Start');

[1,3,4,2,1,5,1].removeNum(1).then(console.log);


console.log('Fiish');
