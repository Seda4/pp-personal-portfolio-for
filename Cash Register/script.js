let price = 19.5; // Ürün fiyatı (test için değiştirilebilir)
let cid = [ // Kasadaki para miktarları
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const currencyUnits = [ // Paraların değeri
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100]
];

document.getElementById("purchase-btn").addEventListener("click", function() {
    let cash = parseFloat(document.getElementById("cash").value); // Kullanıcının verdiği para
    let changeDueElement = document.getElementById("change-due"); 

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    let change = cash - price; // Para üstü
    let totalCid = cid.reduce((sum, money) => sum + money[1], 0).toFixed(2); // Kasadaki toplam para

    if (change === 0) {
        changeDueElement.textContent = "No change due - customer paid with exact cash";
        return;
    }

    if (parseFloat(totalCid) < change) {
        changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    let changeArray = [];
    let reversedCid = [...cid].reverse(); // Büyükten küçüğe sıralı kasadaki para

    for (let [name, value] of reversedCid) {
        let currencyValue = currencyUnits.find(unit => unit[0] === name)[1];
        let amountToReturn = 0;

        while (change >= currencyValue && value > 0) {
            change -= currencyValue;
            change = Math.round(change * 100) / 100; // Yuvarlama hatalarını engellemek için
            value -= currencyValue;
            amountToReturn += currencyValue;
        }

        if (amountToReturn > 0) {
            changeArray.push([name, amountToReturn]);
        }
    }

    if (change > 0) {
        changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    let remainingTotal = changeArray.reduce((sum, money) => sum + money[1], 0);
    if (remainingTotal.toFixed(2) === totalCid) {
        changeDueElement.textContent = "Status: CLOSED " + changeArray.map(item => `${item[0]}: $${item[1]}`).join(" ");
    } else {
        changeDueElement.textContent = "Status: OPEN " + changeArray.map(item => `${item[0]}: $${item[1]}`).join(" ");
    }
});