// Function to fetch family members
async function fetchFamilyMembers(userId) {
    try {
        const response = await fetch(`https://ym4j51mkp6.execute-api.us-east-1.amazonaws.com/kinnect-v01/kinnect-api/family-members?user_id=${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching family members:', error);
        return [];
    }
}

// Function to populate member details
function populateMembers(members) {
    const memberElements = document.querySelectorAll('.member');
    members.forEach((member, index) => {
        if (index < memberElements.length) {
            const detailsElement = memberElements[index].querySelector('.details');
            detailsElement.textContent = `${member.first_name} ${member.last_name}`;
            memberElements[index].style.display = 'flex';
        }
    });

    // Hide unused member elements
    for (let i = members.length; i < memberElements.length; i++) {
        memberElements[i].style.display = 'none';
    }
}

// Main function to fetch and populate members
async function loadFamilyMembers() {
    const session_data = localStorage.getItem('familyData');
    const userId = session_data.userName;
    const members = await fetchFamilyMembers(userId);
    populateMembers(members);
}

// Call the main function when the page loads
document.addEventListener('DOMContentLoaded', loadFamilyMembers);