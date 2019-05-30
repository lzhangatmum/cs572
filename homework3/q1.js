
var { promisify } = require("util");

var dns = require("dns");



const getAdd =  promisify(dns.resolve4);


async function main(){
    const text =   await getAdd("www.mum.edu",function resolve4(err,address,family){
  
    })
      console.log(text);
}

main();
