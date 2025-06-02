function createFloatingSymbols() {
  const symbols = ['#', '+', '-', '=', '$'];
  const background = document.querySelector('.background');

  for (let i = 0; i < 40; i++) {
    const symbol = document.createElement('div');
    symbol.classList.add('symbol');
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.left = Math.random() * 100 + 'vw';
    symbol.style.animationDuration = 5 + Math.random() * 10 + 's';
    symbol.style.fontSize = 12 + Math.random() * 30 + 'px';
    symbol.style.top = 100 + Math.random() * 50 + 'vh';
    background.appendChild(symbol);
  }
}

//createFloatingSymbols();

function handleClickEvent() {
  const amountReceived = parseFloat(document.getElementById("amount-received").value);
  const amountDue = parseFloat(document.getElementById("amount-due").value);

  if (isNaN(amountReceived) || isNaN(amountDue)) {
    alert("Please enter valid numbers.");
    return;
  }

  let change = Math.round((amountReceived - amountDue) * 100);
  if (change < 0) {
    alert("Amount received is less than amount due.");
    return;
  }

  // Define denominations (in cents)
  const billDenominations = [10000, 5000, 2000, 1000, 500, 100];
  const billLabels = ["$100 Bills", "$50 Bills", "$20 Bills", "$10 Bills", "$5 Bills", "$1 Bills"];
  let billOutput = "<strong>Bill Breakdown:</strong><br>";
  
  for (let i = 0; i < billDenominations.length; i++) {
    const count = Math.floor(change / billDenominations[i]);
    change %= billDenominations[i];
    billOutput += `${billLabels[i]}: ${count} = $${(count * billDenominations[i] / 100).toFixed(2)}<br>`;
  }

  // Coin denominations
  const quarters = Math.floor(change / 25);
  change %= 25;

  const dimes = Math.floor(change / 10);
  change %= 10;

  const nickels = Math.floor(change / 5);
  change %= 5;

  const pennies = change;

  let coinOutput = "<strong>Coin Breakdown:</strong><br>";
  coinOutput += `Quarters: ${quarters} = $${(quarters * 0.25).toFixed(2)}<br>`;
  coinOutput += `Dimes: ${dimes} = $${(dimes * 0.10).toFixed(2)}<br>`;
  coinOutput += `Nickels: ${nickels} = $${(nickels * 0.05).toFixed(2)}<br>`;
  coinOutput += `Pennies: ${pennies} = $${(pennies * 0.01).toFixed(2)}<br>`;
  

  // Display in separate containers
  document.getElementById("bills-output").innerHTML = billOutput;
  document.getElementById("coins-output").innerHTML = coinOutput;
}




// Attach the event listener after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  createFloatingSymbols();
  document.getElementById("calculate-change").addEventListener("click", handleClickEvent);
});




