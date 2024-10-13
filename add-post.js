// Function to convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}

// Function to handle form submission
async function handleSubmit(event) {
    event.preventDefault();

    const response = document.getElementById('response').value;
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];

    const session_data = localStorage.getItem('familyData');
    const userId = session_data.userName;

    let imageBase64 = null;
    if (file) {
        imageBase64 = await fileToBase64(file);
    }

    const postData = {
        user_id: userId,
        post_text: response,
        image: imageBase64
    };

    try {
        const result = await fetch('https://ym4j51mkp6.execute-api.us-east-1.amazonaws.com/kinnect-v01/kinnect-api/add-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        });

        const data = await result.json();

        if (result.status === 201) {
            alert(`Post added successfully! Post ID: ${data.post_id}`);
            // Optionally, reset the form or redirect the user
            document.querySelector('.response-form').reset();
            document.getElementById('image-preview').style.display = 'none';
        } else {
            alert(data.message || 'An error occurred while adding the post.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the post. Please try again.');
    }
}

// Function to handle image preview
function handleImagePreview(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('image-preview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none';
    }
}

// Add event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.response-form').addEventListener('submit', handleSubmit);
    document.getElementById('file-upload').addEventListener('change', handleImagePreview);
});