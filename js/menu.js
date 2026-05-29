       
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