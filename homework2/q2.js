Array.prototype.pluck = function(yon){
    let arr = this;
    arr.sort(function(a,b){
      return a-b;
    })
    return asyncPluck(arr,function(){
        if(!yon) console.log(arr[0])
        else console.log(arr[arr.length-1]);
    });
}

function asyncPluck(arr,callback){
    process.nextTick(callback);
}



console.log('start');
[1,2,3,4,5,6,7,8].pluck(true); // pluck largest
[1,2,3,4,5,6,7,8].pluck(false);// pluck smallest
console.log('end');
/**
request  start-> end ->8 ->1
*/
