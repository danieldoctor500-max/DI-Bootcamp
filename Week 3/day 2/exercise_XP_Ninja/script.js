function createCalendar(year, month) {
    const calendarContainer = document.getElementById("calendar");

    // Clear previous calendar
    calendarContainer.innerHTML = "";

    // Create table
    const table = document.createElement("table");

    // Create table header
    const headerRow = document.createElement("tr");

    const weekdays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    for (let i = 0; i < weekdays.length; i++) {
        const th = document.createElement("th");

        th.textContent = weekdays[i];

        headerRow.appendChild(th);
    }

    table.appendChild(headerRow);

    // Find the first day of the month
    const firstDay = new Date(year, month - 1, 1);

    // Find the last day of the month
    const lastDay = new Date(year, month, 0);

    const numberOfDays = lastDay.getDate();

    // JavaScript:
    // Sunday = 0
    // Monday = 1
    // Tuesday = 2
    // ...
    //
    // We want Monday = 0, Sunday = 6

    let startingDay = firstDay.getDay();

    if (startingDay === 0) {
        startingDay = 6;
    } else {
        startingDay = startingDay - 1;
    }

    let currentDay = 1;

    // Create the calendar weeks
    while (currentDay <= numberOfDays) {
        const row = document.createElement("tr");

        // Create 7 days
        for (let i = 0; i < 7; i++) {
            const cell = document.createElement("td");

            // Empty cells before the first day
            if (startingDay > 0) {
                cell.textContent = "";
                startingDay--;
            } else if (currentDay <= numberOfDays) {
                cell.textContent = currentDay;
                currentDay++;
            }

            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    // Add calendar to the page
    calendarContainer.appendChild(table);
}

createCalendar(2012, 9);