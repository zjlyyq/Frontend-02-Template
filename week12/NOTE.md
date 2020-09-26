### 动画帧
1. setInterval

   ```js
   function tick() {
   }
   setInterval(tick, 16);
   ```

   > setInterval 容易产生积压，每16ms将一个任务推入interval队列

2. setTimeout

   ```
   function tick() {
   	setTimeout(tick, 16);
   }
   ```

   > 不稳定，不一定能16ms后准时出发，比setInterval好在不会有积压问题

3. requestAnimationFrame

   ```js
   function tick() {
   	requestAnimationFrame(tick);  // 要求在浏览器下一帧执行tick函数
   }
   ```

   > api较新，适合新浏览器