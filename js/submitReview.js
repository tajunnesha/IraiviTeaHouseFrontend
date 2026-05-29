
async function submitReview() 
{
    const nameInput = document.getElementById('custName');
    const reviewInput = document.getElementById('custReview');
    const reviewsContainer = document.getElementById('reviews-container');

    const statusMsg = document.getElementById('statusMsg');

    statusMsg.innerText = "";

    if (nameInput.value.trim() === "" || reviewInput.value.trim() === "") 
    {
        statusMsg.innerText = "Error: Please fill in all fields!";
        statusMsg.style.color = "orange";
        return;
    }

    const reviewData = {
        customerName: nameInput.value, 
        feedback: reviewInput.value
    };


    try 
    {
        const response = await fetch(`${BASE_URL}/api/reviews/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        });

        if (response.ok) 
        {
            const savedData = await response.json();
            const newReviewCard = document.createElement('div');
            newReviewCard.className = 'review-card';

            newReviewCard.innerHTML = `
                <p class="review-text">"${reviewInput.value}"</p>
                <h4 class="customer-name">- ${nameInput.value}</h4>
            `;

            reviewsContainer.appendChild(newReviewCard);

            statusMsg.innerText = "Thank you! Your feedback has been added.";
            statusMsg.classList.add("success-text");
            statusMsg.style.color = "green";

            nameInput.value = "";
            reviewInput.value = "";
        } 
        else 
        {
            statusMsg.innerText = "Error: Failed to submit review. Please try again.";
            statusMsg.style.color = "red";
        }
    }
    catch (error) 
    {
        console.error("Network Error:", error);
        statusMsg.innerText = "Error: Server is not reachable!";
        statusMsg.style.color = "red";
    }

    setTimeout(() => {
        statusMsg.innerText = "";
    }, 3000);
}