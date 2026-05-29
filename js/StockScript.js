
document.addEventListener("DOMContentLoaded", () => {
  const loginStatus = localStorage.getItem('isLoggedIn');
  if (loginStatus !== "user") {
      document.getElementById("orderGuard").style.display = "block";
  } else {
      loadStockDetails();
  }
});


document.addEventListener("DOMContentLoaded", () => {
    loadBalance();
});

async function saveOpeningStock(event) {
    event.preventDefault();

    // 1. Ingu thaan elements-ai define seiyya vendum
    const item = document.getElementById("ingrSelect").value;
    const qty = document.getElementById("openingQuantity").value;
    const statusMsg = document.getElementById("statusMessage"); 
    const saveBtn = event.target.querySelector('button'); // Form-ukku ulla irukka button

    // Initial state setup
    if (statusMsg) {
        statusMsg.innerText = "⏳ Saving data... Please wait.";
        statusMsg.style.color = "#fcf8e3"; // Unga theme-ku yetha light color
    }
    if (saveBtn) saveBtn.disabled = true;

    try {
        // Backend API call
        const response = await fetch(`${BASE_URL}/api/stocks/opening?itemName=${encodeURIComponent(item)}&openingStock=${qty}`,
        {
        method: 'POST'
        });
        if (response.ok) {
            // Success Handling
            if (statusMsg) {
                statusMsg.style.color = "#27ae60"; // Green color
                statusMsg.innerText = `✅ Success: Morning stock for ${item} updated!`;
                loadBalance(); // balance refresh
            }
            
            // Input field-ai clear seiya
            document.getElementById("openingQuantity").value = "";


        } else {
            // Server Side Error (e.g. 404 or 500)
            if (statusMsg) {
                statusMsg.style.color = "#e74c3c"; // Red color
                statusMsg.innerText = "❌ Error: Database-il save seivathil pirachinai!";
            }
        }
    } catch (error) {
        // Network Connection Error
        console.error("Error:", error);
        if (statusMsg) {
            statusMsg.style.color = "#e74c3c";
            statusMsg.innerText = "❌ Error: Server connection failed!";
        }
    } finally {
        // Mudivila button-ai thirumba enable seiya
        if (saveBtn) saveBtn.disabled = false;
    }
}

// Balance load
async function loadBalance() {
    const response = await fetch(`${BASE_URL}/api/stocks`);
    const data = await response.json();

    const tbody = document.getElementById("stockTableBody");
    tbody.innerHTML = "";

    data.forEach(item => {

                // SALES CALCULATION
        const usedStock = item.openingStock - item.currentStock;

        const status = item.currentStock <= item.minThreshold
            ? "⚠️ Refill Required"
            : "Sufficient";

        tbody.innerHTML += `
            <tr>
                <td>${item.itemName}</td>

                <td>
                    ${item.openingStock.toFixed(2)}
                </td>

                <td>
                    ${usedStock.toFixed(2)}
                </td>

                <td>
                    ${item.currentStock.toFixed(2)}
                </td>
                <td style="color:${status.includes('Refill') ? '#e74c3c' : '#27ae60'}">${status}</td>
            </tr>
        `;
    });
}

function switchTab(tabId) {
    // எல்லா tab-content sections‑ஐ hide பண்ணு
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // clicked tab‑ஐ show பண்ணு
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

        // Balance section open aana udane load pannunga
    if (tabId === 'balanceSection') {
        loadBalance(); // backend /api/stock call
    }
}

function finalizeOpeningStock() {
    switchTab('balanceSection');
    loadBalance(); // backend‑ல இருந்து latest stock fetch
}

