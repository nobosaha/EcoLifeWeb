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

        // DAILY estimates
        let dailyTransport = km * 0.21;              // per km
        let dailyElectricity = (electricity * 0.92) / 30; // monthly → daily
        let dailyMeat = meat * 300 / 7;              // weekly → daily
        let dailyWaste = (waste * 50) / 7;           // weekly → daily

        let dailyTotal = dailyTransport + dailyElectricity + dailyMeat + dailyWaste;

        // weekly / monthly / yearly
        let weeklyTotal = dailyTotal * 7;
        let monthlyTotal = dailyTotal * 30;
        let yearlyTotal = dailyTotal * 365;

        // Display result
        resultDiv.style.display = "block";
        resultDiv.innerHTML = `
            <h3>Your Carbon Footprint</h3>

            <p><strong>Daily:</strong> ${dailyTotal.toFixed(1)} kg CO₂</p>
            <p><strong>Weekly:</strong> ${weeklyTotal.toFixed(1)} kg CO₂</p>
            <p><strong>Monthly:</strong> ${monthlyTotal.toFixed(1)} kg CO₂</p>
            <p><strong>Yearly:</strong> ${yearlyTo



