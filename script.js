document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("carbon-form");
    const resultDiv = document.getElementById("result");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent reload

        // Get user inputs
        let km = Number(document.getElementById("km").value);
        let electricity = Number(document.getElementById("electricity").value);
        let meat = Number(document.getElementById("meat").value);
        let waste = Number(document.getElementById("waste").value);

        // Convert to CO2 estimate
        let transportCO2 = km * 0.21 * 365;
        let electricityCO2 = electricity * 0.92 * 12;
        let meatCO2 = meat * 300;
        let wasteCO2 = waste * 50 * 52;

        let total = transportCO2 + electricityCO2 + meatCO2 + wasteCO2;

        // Display result
        resultDiv.style.display = "block";
        resultDiv.innerHTML = `
            Estimated yearly CO₂ footprint:<br><br>
            <strong>${total.toFixed(0)} kg CO₂ per year</strong>
        `;
    });

});




