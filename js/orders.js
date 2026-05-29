
// LOGIN CHECK
window.onload = function () {

    const overlay =
        document.getElementById('loginOverlay');

    const role =
        localStorage.getItem('isLoggedIn');

    if (!role) {

        overlay.style.display = 'flex';

        document.body.style.overflow = 'hidden';

    } else {

        overlay.style.display = 'none';

        document.body.style.overflow = 'auto';
    }
};

let cart = {};

document.addEventListener('DOMContentLoaded',
    async function () {

        const cartBody =
            document.getElementById('cart-items-body');

        const grandTotalElement =
            document.getElementById('grand-total');

        try {

            // FETCH CART
            const response = await fetch(
                `${BASE_URL}/api/get-cart`
            );

            cart = await response.json();

            // EMPTY CART
            if (!cart ||
                Object.keys(cart).length === 0) {

                document.querySelector('.order-container')
                    .innerHTML =
                    "<h3>Your tray is empty!</h3>";

                return;
            }

            let grandTotal = 0;

            let rowsHTML = '';

            for (let key in cart) {

                let item = cart[key];

                let itemTotal =
                    Number(item.price) *
                    Number(item.qty);

                grandTotal += itemTotal;

                rowsHTML += `
                <tr>
                    <td align="left">${item.name}</td>
                    <td align="center">${item.qty}</td>
                    <td align="right">₹${itemTotal}</td>
                </tr>
            `;
            }

            cartBody.innerHTML = rowsHTML;

            grandTotalElement.innerText =
                grandTotal;

        } catch (error) {

            console.error("Loading failed:", error);
        }
    });


// CONFIRM ORDER
document.querySelector('.confirm-btn')
    .addEventListener('click',
        async function () {

            const statusDiv =
                document.getElementById('orderStatus');

            // EMPTY CART CHECK
            if (!cart ||
                Object.keys(cart).length === 0) {

                statusDiv.style.color = "#e67e22";

                statusDiv.innerText =
                    "⚠️ Your tray is empty!";

                return;
            }

            let grandTotal = 0;

            for (let key in cart) {

                grandTotal +=
                    Number(cart[key].price) *
                    Number(cart[key].qty);
            }

            try {

                // SAVE ORDER
                const orderResponse =
                    await fetch(
                        `${BASE_URL}/api/saveOrder`,
                        {
                            method: 'POST',

                            headers: {
                                'Content-Type':
                                    'application/json'
                            },

                            body: JSON.stringify(cart)
                        }
                    );

                if (!orderResponse.ok) {

                    throw new Error(
                        "Order save failed!"
                    );
                }


                let itemNames = "";

                for(let key in cart) {
 
                    itemNames += cart[key].name + ", ";
                }
                // SAVE SALES INTO DAILY ACCOUNTS
                const accountResponse =
                    await fetch(
                        `${BASE_URL}/api/accounts/add-sale?description=${encodeURIComponent(itemNames)}&amount=${grandTotal}`,
                        {
                            method: 'POST'
                        }
                    );

                if (!accountResponse.ok) {

                    throw new Error(
                        "Accounts save failed!"
                    );
                }

                statusDiv.style.color =
                    "#2ecc71";

                statusDiv.innerText =
                    "✅ Order Placed Successfully!";

                console.log(
                    "Order + Accounts saved"
                );

                // RELOAD
                setTimeout(() => {

                    window.location.reload();

                }, 2000);

            } catch (err) {

                console.error(err);

                statusDiv.style.color =
                    "#e74c3c";

                statusDiv.innerText =
                    "❌ Order placement failed!";
            }
        });