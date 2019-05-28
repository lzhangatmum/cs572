/**
explain why do we want sometiomes to use setImmediate instead of using setTimeout?

while setTimeout schedules a callback to run after a specific time,
the function are registered in the timers phase of the event loop.
on the other hand. setImmediate will schedule a callback to run at check phase of
the event loop after IO events callbacks.



explain the difference between process.nextTick and setImmediate?



Use setImmediate if you want to queue the function behind whatever I/O event callbacks
that are already in the event queue. Use process.nextTick to effectively queue the
function at the head of the event queue so that it executes immediately after the
current function completes.


name 10 core modules that Nod provides by default
1.fs operators field
2.TPC  read nad writer flow
3.Global dont need implant
4.http
5.path
6.moudle
7.utils
8v8
9stream
10vm
*/
