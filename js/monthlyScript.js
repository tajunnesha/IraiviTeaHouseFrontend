async function loadMonthlySummary() {

    const monthInput =
        document.getElementById('monthInput').value;

    const summaryDiv =
        document.getElementById('monthly-summary');

    const tableBody =
        document.getElementById('category-table-body');

    const categorySection =
        document.getElementById('category-section');

    const statusMessage =
        document.getElementById('statusMessage');

    if (!monthInput) {

        statusMessage.innerText =
            "Please select month";

        statusMessage.style.color = "red";

        return;
    }

    try {

        statusMessage.innerText =
            "Loading...";

        const response = await fetch(
            `${BASE_URL}/api/monthly-summary?month=${monthInput}`
        );

        if (!response.ok) {

            throw new Error("API failed");
        }

        const data = await response.json();

        console.log(data);

        statusMessage.innerText = "";

        summaryDiv.innerHTML = `

            <div style="
                background:#fffbe6;
                padding:20px;
                border-radius:10px;
                border:1px solid #b38b4d;
                margin-top:20px;
            ">

                <h3>
                    Total Income :
                    ₹${data.totalCredit}
                </h3>

                <h3>
                    Total Expense :
                    ₹${data.totalExpense}
                </h3>

                <h2 style="
                    color:
                    ${data.netBalance >= 0
                        ? 'green'
                        : 'red'}
                ">

                    Profit :
                    ₹${data.netBalance}

                </h2>

            </div>
        `;

        tableBody.innerHTML = "";

        if (data.categoryBreakdown &&
            data.categoryBreakdown.length > 0) {

            categorySection.style.display =
                "block";

            data.categoryBreakdown
                .forEach(item => {

                    tableBody.innerHTML += `

                        <tr>

                            <td style="padding:10px;">
                                ${item.category}
                            </td>

                            <td style="
                                color:green;
                                padding:10px;
                            ">
                                ₹${item.credit}
                            </td>

                            <td style="
                                color:red;
                                padding:10px;
                            ">
                                ₹${item.debit}
                            </td>

                        </tr>
                    `;
                });

        } else {

            categorySection.style.display =
                "none";

            statusMessage.innerText =
                "No records found";
        }

    } catch (error) {

        console.error(error);

        statusMessage.innerText =
            "Server connection failed";

        statusMessage.style.color = "red";
    }
}