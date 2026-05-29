
let cart = {};

async function updateCartOnServer(productId, qty) 
{
    try {
        const response = await fetch(`${BASE_URL}/api/update-cart`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, qty })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Check your internet connection", error);
    }
}

async function changeQty(productId,itemName, itemPrice, change) 
{
    const countElement = document.getElementById(productId + "-count");
    if(!countElement)
    {
        return;
    }

        let currentCount = Number(countElement.innerText) || 0;
        currentCount += Number(change);

        if (currentCount < 0)
        {
            currentCount = 0;
        }
        countElement.innerText = currentCount;
    
        if (currentCount > 0) 
        {
            cart[productId] = {
                name: itemName,
                price:  itemPrice,
                qty: currentCount
            };
        } 
        else 
        {
            delete cart[productId];
        }


        try 
        {
        await fetch(`${BASE_URL}/api/update-cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productId: productId,
                name: itemName,
                price: itemPrice,
                qty: currentCount
            })
        });
        } catch (e) 
        {
        console.error("Server sync failed");
        }
        // summary update panna function call
        updateCartUI(); 
        // server ku cart update panna API call
        await updateCartOnServer(productId, currentCount);

}
function updateCartUI() 
{
    let totalItems = 0;
    // key vachu eduthu cart la irukkura items oda qty add panni totalItems la store pannuvom
    for (let key in cart) 
    {
        totalItems += Number(cart[key].qty);
    }
    // cart la items irundha strip show pannuvom, illa na hide pannuvom. 
    // strip la enna info show panna porom na totalItems + " Items added to tray" nu show panna porom
    const strip = document.getElementById('cart-strip');
    // andha strip kula irunkura text dha info
    const info = document.getElementById('cart-info');

    if(strip && info)
    {

        if (totalItems > 0) 
        {
            strip.style.display = "flex";//items irundha strip show panna
            info.innerText = totalItems + " Items added to tray";
        } 
        else 
        {
            strip.style.display = "none";
        }
    }
}


document.addEventListener('DOMContentLoaded', async function() 
{
    
        const response = await fetch(`${BASE_URL}/api/get-cart`); 
        cart = await response.json();

        let rowsHTML = "";
        let grandTotal = 0;

        for (let id in cart) {
            let item = cart[id];
            let total = item.price * item.qty;
            grandTotal += total;
            rowsHTML += `<tr><td>${item.name}</td><td>${item.qty}</td><td>₹${total}</td></tr>`;
        }

        document.getElementById('cart-items-body').innerHTML = rowsHTML;
        document.getElementById('grand-total').innerText = grandTotal;
});
