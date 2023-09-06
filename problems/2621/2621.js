// 2621. Sleep
// Given a positive integer `millis`, write an asynchronous function 
// that sleeps for `millis` milliseconds. 
// It can resolve any value.



// 1.宣告一個非同步的函式`sleep`並接受一個參數`millis`表示等待時間
// 2.函式內部以 await等待Promise處理結果，
// 當這個 Promise被解析，等待的操作完成，sleep函式會繼續執行。
// (補充)使用 await 關鍵字等待 Promise 解析時，不需要明確使用 return 來返回 Promise 的解析值，
//         因為 await 會自動將解析值設定為該 async 函式的返回值。
// 3.setTimeout(() => {resolve();}, millis);: 
// 在這個匿名函式中，使用 setTimeout 函式來創建一個計時器，
// 計時器將在指定的 millis 毫秒後執行，當計時器到期時會調用 resolve() 函式，
// 這樣這個 Promise 就會被解析。-> Promise為完成，解析值為`undefined、
async function sleep(millis) {
    await new Promise(        
        (resolve)=>{ 
            setTimeout(() => resolve(),millis);
        }
    );
} 

// 程式碼執行過程
// 1.過了`millis`毫秒定時器過期，此時會調用匿名函式`() => resolve()`，
//   程式碼會變成這樣：
```
async function sleep(millis) {
    await new Promise(       
        (resolve)=> resolve()
    );
} 
```

// 2.此時resolve()會立即執行：解析Promise為完成，解析值為`undefined`