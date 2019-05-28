const fetch = require("node-fetch");
var p = Promise.race([
    fetch("https://randomuser.me/api"),
    new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error('request timeout')), 5000)
    })
  ])
  p.then(response => console.log(response))
  p.catch(error => console.log(error));

  (async ()=>{
    try {
      let res = await fetch("https://randomuser.me/api");//等待fetch被resolve()后才能继续执行
      console.log(res);
    } catch(e) {
      console.log(e);
    }
  })();


  import { Observable } from 'rxjs';

  const data$ = Observable.create(observer => {
    fetch("https://randomuser.me/api")
      .then(response => response.json())
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
  });

data$.subscribe(data => console.log(data));
