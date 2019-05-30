var eventGym =  require('events');
class Gym extends eventGym{};

var gym = new Gym();

gym.on('boom', (a, b) => {
  setImmediate(() => {
    console.log('athlete is working out');
  });
});

setInterval(function(){gym.emit('boom')},1000);
