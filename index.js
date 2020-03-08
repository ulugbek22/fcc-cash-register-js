
function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  let finalChange = 0;
  let total = 0;
  const list = [["PENNY", 0.01], ["NICKEL", 0.05], ["DIME", 0.1], ["QUARTER", 0.25], ["ONE", 1], ["FIVE", 5], ["TEN", 10], ["TWENTY", 20], ["ONE HUNDRED", 100]];
  
  cid.forEach(item => total += item[1]);
  
  if (change > total) return {status: "INSUFFICIENT_FUNDS", change: []}
  
  if (change == total) return {status: "CLOSED", change: cid }
  
  if (change < total) {
    const arr = [];
    
    for (let i = cid.length - 1; i >= 0; i--) {
      let howMany = Math.floor(change / list[i][1]);
      
      if (howMany >= 1 && cid[i][1] != 0) {
        
        if (cid[i][1] <= howMany * list[i][1]) {
          arr.push([cid[i][0], cid[i][1]]);
          change = change - cid[i][1];
        } else if (cid[i][1] > howMany * list[i][1]) {
          arr.push([cid[i][0], howMany * list[i][1]]);
          change = change - howMany * list[i][1];
        }
        change = change.toFixed(2);
      }
      
    }
    
    arr.forEach((i) => finalChange += i[1]);
    
    finalChange = finalChange.toFixed(2);
    
    if (arr.length && cash - price == finalChange) return { status: "OPEN", change: arr }
    
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }
}

let a = checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

console.log(a);
