// 2694. Event Emitter 事件發送器

// 設計一個“EventEmitter”類。      
// 該接口與 Node.js 或 DOM 的事件目標接口中的接口類似（但有一些差異）。        
// `EventEmitter` 應該允許訂閱事件並發出它們。     
// Design an `EventEmitter` class.
// This interface is similar (but with some differences) to the one found in Node.js or the Event Target interface of the DOM.
// The `EventEmitter` should allow for subscribing to events and emitting them.        

// 你的`EventEmitter`類應該有以下兩個方法：   
// This method takes in two arguments     

// - subscribe - 此方法接受兩個參數：字符串形式的事件名稱和回調函數。 當事件發出時，稍後將調用此回調函數。     
// 一個事件應該能夠有多個針對同一事件的偵聽器。 當發出具有多個回調的事件時，應按照訂閱的順序調用每個回調。 應返回結果數組。 您可以假設傳遞給“subscribe”的回調沒有引用相同。      
//  the name of an event as a string and a callback function. This callback function will later be called when the event is emitted.      
// An event should be able to have multiple listeners for the same event. When emitting an event with multiple callbacks, each should be called in the order in which they were subscribed. An array of results should be returned. You can assume no callbacks passed to `subscribe` are referentially identical.
   
// “subscribe”方法還應該返回一個帶有“unsubscribe”方法的對象，使用戶能夠取消訂閱。 當它被調用時，回調應該從訂閱列表中刪除，並且應該返回“undefined”。        
// The `subscribe` method should also return an object with an `unsubscribe` method that enables the user to unsubscribe. When it is called, the callback should be removed from the list of subscriptions and `undefined` should be returned.     

// - emit - 此方法接受兩個參數：作為字符串的事件名稱和將傳遞給回調的可選參數數組。 如果沒有訂閱給定事件的回調，則返回一個空數組。 否則，按訂閱順序返回所有回調調用結果的數組。         
// This method takes in two arguments: the name of an event as a string and an optional array of arguments that will be passed to the callback(s). If there are no callbacks subscribed to the given event, return an empty array. Otherwise, return an array of the results of all callback calls in the order they were subscribed.



// 1. 設計一個“`EventEmitter`類，應該允許訂閱事件`subscribe`並觸發`emit`它們。       
// `EventEmitter`類應該有`subscribe`和`emit`兩個方法 

// class EventEmitter {
//   constructor() {
//     //建構函示邏輯
//   }

//   subscribe() {
//     //訂閱方法處理邏輯
//   }

//   emit() {
//     //觸發事件邏輯
//   }
// }

// 2. 基本監聽邏輯
// - 一個事件可以註冊多個監聽器。 
//   - 建構函示應該包含事件清單 使用鍵值對new Map(); [event,cbs]
// /* 
// *
// * events {
// *   'click' => [Function, Function]
// * }
// *
// */
// - `subscribe()`接受兩個參數：字符串形式的事件名稱`event`和回調函數`cb`，當事件觸發時調用此回調函數。     
//   - 當發出多個回調事件時應按照註冊順序調用，應返回結果陣列。 
//   - 可以假設傳遞給`subscribe`的回調不會具有相同的參考(不會將相同的回調函數多次註冊到同一事件上，每個回調函數都是獨立的)。

// - `emit`接受兩個參數：字符串形式的事件名稱`event`和將傳遞給回調的可選參數陣列`args`。 
//   - 如果沒有訂閱給定事件的回調，則返回一個空陣列。 
//   - 否則，按訂閱順序返回所有回調調用結果的陣列。  

// class EventEmitter {
//   constructor() {
//     this.events = new Map();
//   }

//   subscribe(event,cb) {
//     //註冊監聽事件邏輯
//     //若當前事件存在(如果事件不存在，則建立新的鍵)，將回調函示cb添加至陣列內。
//     if (!this.events.has(event)) {
//       this.events.set(event, []);
//     }
//     const cbs = this.events.get(event);
//     cbs.push(cb);
//   }

//   emit(event,args) {
//     //觸發事件邏輯
//     //觸發事件不存在，返回空陣列
//     //當當前事件存在，取得回調函數陣列後逐一呼叫回調函數並將結果依序添加至 results 陣列，然後返回 results陣列。
//     if (!this.events.has(event)) {
//       return [];
//     }

//     const cbs = this.events.get(event);
//     const results = [];

//     for (const e of cbs) {
//       results.push(e(...args));
//     }

//     return results;
//   }
// }




// 3. “subscribe”方法還應該返回一個帶有“unsubscribe”方法的對象，使用戶能夠取消訂閱。
// 當它被調用時，回調應該從訂閱列表中刪除，並且應該返回“undefined”。        

class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  subscribe(event,cb) {
    // 註冊監聽事件的邏輯
    // 如果當前事件不存在，則建立新的鍵並初始化為空陣列
    // 若當前事件存在，將回調函示cb添加至陣列內。
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    const cbs = this.events.get(event);
    cbs.push(cb);

    // 取消註冊監聽事件
    // 取得 cb 在 cbs 陣列中的索引值，並使用 Array.splice(index, num) 方法刪除回調函數
    // 最後返回一個包含 `unsubscribe` 方法的物件，讓 EventEmitter 的實例可以使用 `unsubscribe` 方法
    const unsubscribe = () => {
      const index = cbs.indexOf(cb);
      if (index >= 0 ) {
        cbs.splice(index, 1);
      }
    }
    return { unsubscribe };
  }

  emit(event,args) {
    //觸發事件邏輯
    //觸發事件不存在，返回空陣列
    //當當前事件存在，取得回調函數陣列後逐一呼叫回調函數並將結果依序添加至 results 陣列，然後返回 results陣列。
    if (!this.events.has(event)) {
      return [];
    }

    const cbs = this.events.get(event);
    const results = [];

    for (const e of cbs) {
      results.push(e(...args));
    }

    return results;
  }
}
