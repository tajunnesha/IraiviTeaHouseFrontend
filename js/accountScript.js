// DailyAccount.js


document.addEventListener("DOMContentLoaded", () => {

    loadDailySummary();

    loadTodayOrders();
});



function loadDailySummary() {

    const today =
        new Date().toISOString().split("T")[0];

    fetch(`${BASE_URL}/api/accounts/daily-summary?date=${today}`)

        .then(res => res.json())

        .then(data => {

            document.getElementById("sales-amount")
                .textContent =
                `₹${data.totalCredit || 0}`;

            document.getElementById("expenses-amount")
                .textContent =
                `₹${data.totalDebit || 0}`;
        })

        .catch(err => {

            console.error(err);
        });
}



function loadTodayOrders() {

    fetch(`${BASE_URL}/api/accounts/today-orders`)

        .then(res => res.json())

        .then(data => {

            const tableBody =
                document.getElementById("today-orders-body");

            tableBody.innerHTML = "";

            data.forEach(order => {

                const row = `

                    <tr>

                        <td>${order.id}</td>

                        <td>${order.description}</td>

                        <td>₹${order.amount}</td>

                        <td>${order.type}</td>

                        <td>${order.category}</td>

                        <td>
                            ${new Date(order.date)
                                .toLocaleString()}
                        </td>

                    </tr>
                `;

                tableBody.innerHTML += row;
            });
        })

        .catch(err => {

            console.error(err);
        });
}