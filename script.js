/*
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
*/
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("carbon-form");
  const resultBox = document.getElementById("result");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect user inputs
    const electricity = Number(document.getElementById("electricity").value);
    const gas = Number(document.getElementById("gas").value);
    const travel = Number(document.getElementById("travel").value);
    const waste = Number(document.getElementById("waste").value);

    // Simple emission factors (per unit)
    const EF_electricity = 0.233; // kg CO2 per kWh
    const EF_gas = 2.03;          // kg CO2 per m³
    const EF_travel = 0.12;       // kg CO2 per km
    const EF_waste = 0.7;         // kg CO2 per kg waste

    // Calculate total daily footprint
    const totalDaily =
      electricity * EF_electricity +
      gas * EF_gas +
      travel * EF_travel +
      waste * EF_waste;

    // Convert to weekly, monthly, yearly (optional)
    const totalWeekly = totalDaily * 7;
    const totalMonthly = totalDaily * 30;
    const totalYearly = totalDaily * 365;

    // Show result
    resultBox.innerHTML = `
      <h3>Your Carbon Footprint</h3>
      <p><strong>Daily:</strong> ${totalDaily.toFixed(2)} kg CO₂</p>
      <p><strong>Weekly:</strong> ${totalWeekly.toFixed(2)} kg CO₂</p>
      <p><strong>Monthly:</strong> ${totalMonthly.toFixed(2)} kg CO₂</p>
      <p><strong>Yearly:</strong> ${totalYearly.toFixed(2)} kg CO₂</p>
    `;

    resultBox.style.display = "block";
  });
});



