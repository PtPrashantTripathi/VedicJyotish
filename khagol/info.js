class InfoView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(
                `InfoView container element with ID '${containerId}' not found.`
            );
            return;
        }
        // Create a table element once
        this.table = document.createElement("table");
        this.table.style.width = "90%"; // Adjust width as needed
        this.table.style.margin = "20px auto"; // Center the table
        this.table.style.borderCollapse = "collapse";
        this.table.style.fontSize = "14px"; // Adjust font size
        this.container.appendChild(this.table);
    }

    displayInfo(planets) {
        if (!this.container || !planets) return;
        // Clear previous table content
        this.table.innerHTML = "";

        // Create table header
        const thead = this.table.createTHead();
        const headerRow = thead.insertRow();
        const headers = ["ग्रह", "राशि", "अंश", "नक्षत्र", "पद", "गत"]; // Add more headers if needed
        headers.forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            th.style.border = "1px solid #ccc";
            th.style.padding = "8px";
            th.style.backgroundColor = "#f2f2f2";
            th.style.textAlign = "left";
            headerRow.appendChild(th);
        });

        // Create table body
        const tbody = this.table.createTBody();
        for (const key in planets) {
            const planet = planets[key];
            if (planet.id == "earth") continue;
            const row = tbody.insertRow();

            const data = [
                planet.name + "  (" + planet.symbol + ")",
                rashiNames[Math.floor(planet.longitude / 30)],
                planet.longitude.toFixed(4) + "°",
                nakshatraNames[Math.floor(planet.longitude / (360 / 27))],
                padaNames[Math.floor(planet.longitude / (360 / 108))],
                planet.retrograde ? "वक्री" : "मार्गी ",
            ];

            data.forEach(text => {
                const cell = row.insertCell();
                cell.textContent = text;
                cell.style.border = "1px solid #ddd";
                cell.style.padding = "8px";
            });
        }
    }
}
