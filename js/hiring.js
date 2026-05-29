     

       // Page load aagum pothu check pannum
        window.onload = function() {
            const overlay = document.getElementById('loginOverlay');
            const role = localStorage.getItem('isLoggedIn'); // admin / user / registered

            if (!role) {
                // login இல்லையென்றால் overlay காட்டவும்
                overlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            } else {
                // login இருந்தால் overlay மறைக்கவும்
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
                console.log("Logged in as:", role);
            }
        };

async function submitForm() 
{

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const position = document.getElementById('position').value;
    const experience = document.getElementById('experience').value;
    const messageBox = document.getElementById('messageBox');

        if (!name || !phone || !position) 
        {
            messageBox.style.color = "#e67e22";
            messageBox.innerText = "⚠️ Please fill in all required fields!";
            
            setTimeout(() => {
                messageBox.innerText = "";
            }, 3000);
            
            return; 
        }

    const hiringData = {
        name: name,
        phone: phone,
        position: position,
        experience: experience
    };

    try 
    {
        const response = await fetch(`${BASE_URL}/api/hiring`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hiringData)
        });

            if (response.ok) {
                messageBox.style.color = "#2ecc71"; 
                messageBox.innerText = "✅ Application submitted successfully!";
                document.querySelector('form').reset();

                setTimeout(() => {
                    messageBox.innerText = "";
                }, 5000);

            } 
            else 
            {
                messageBox.style.color = "#e74c3c"; 
                messageBox.innerText = "❌ Something went wrong. Try again.";
            }
    } 
    catch (error) 
    {
        messageBox.style.color = "#e74c3c";
        messageBox.innerText = "❌ Connection failed!";
    }

}