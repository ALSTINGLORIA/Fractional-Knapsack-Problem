
function addItem() {
    const itemsContainer = document.getElementById('items');
    const newItem = document.createElement('div');
    newItem.classList.add('item');
    
    newItem.innerHTML = `
        <input type="number" class="weight" placeholder="Weight">
        <input type="number" class="value" placeholder="Value">
    `;
    itemsContainer.appendChild(newItem);
}


function calculateMaxValue() {
    const capacity = parseFloat(document.getElementById('capacity').value);
    const weights = [];
    const values = [];
    const items = document.querySelectorAll('.item');
    

    items.forEach(item => {
        const weight = parseFloat(item.querySelector('.weight').value);
        const value = parseFloat(item.querySelector('.value').value);
        
        if (!isNaN(weight) && !isNaN(value) && weight > 0 && value > 0) {
            weights.push(weight);
            values.push(value);
        }
    });

    if (isNaN(capacity) || capacity <= 0) {
        alert("Please enter a valid knapsack capacity.");
        return;
    }

    const n = weights.length;
    const itemsArray = [];

    for (let i = 0; i < n; i++) {
        itemsArray.push({ weight: weights[i], value: values[i], ratio: values[i] / weights[i] });
    }


    itemsArray.sort((a, b) => b.ratio - a.ratio);

    let remainingCapacity = capacity;
    let totalValue = 0;

    for (let i = 0; i < n; i++) {
        if (remainingCapacity <= 0) break;

        const currentItem = itemsArray[i];

        if (currentItem.weight <= remainingCapacity) {
            totalValue += currentItem.value;
            remainingCapacity -= currentItem.weight;
        } else {
            totalValue += currentItem.value * (remainingCapacity / currentItem.weight);
            remainingCapacity = 0;
        }
    }


    document.getElementById('result').innerText = `Max Value: ${totalValue.toFixed(2)}`;
}
