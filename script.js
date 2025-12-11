document.getElementById("carbon-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let km = parseFloat(document.getElementById("km").value);
    let electricity = parseFloat(document.getElementById("electricity").value);
    let meat = parseInt(document.getElementById("meat").value);
    let waste = parseFloat(document.getElementById("waste").value);

    // Simple emission factors
    let transportCO2 = km * 0.21 * 365;
    let electricityCO2 = electricity * 0.92 * 12;
    let meatCO2 = meat * 300;
    let wasteCO2 = waste * 50 * 52;

    let total = transportCO2 + electricityCO2 + meatCO2 + wasteCO2;

    let resultBox = document.getElementById("result");
    resultBox.style.display = "block";
    resultBox.innerHTML = `
        Your estimated yearly carbon footprint is:
        <br><br>
        <strong>${total.toFixed(0)} kg CO₂</strong>
    `;
});


