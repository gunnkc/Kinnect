// Function to fetch posts
async function fetchPosts(userId) {
    const response = await fetch(`https://ym4j51mkp6.execute-api.us-east-1.amazonaws.com/kinnect-v01/kinnect-api/posts?user_id=${userId}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

// Function to create a post element
function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'feed-post';

    const title = document.createElement('h2');
    title.textContent = `Post ${post.post_id}`;

    const content = document.createElement('p');
    content.textContent = post.post_text;

    const time = document.createElement('time');
    time.setAttribute('datetime', post.date_val);
    time.textContent = `Posted on ${new Date(post.date_val).toLocaleDateString()}`;

    postElement.appendChild(title);
    postElement.appendChild(content);
    postElement.appendChild(time);

    return postElement;
}

// Function to load posts
async function loadPosts() {
    try {
        const session_data = localStorage.getItem('familyData');
        const userId = session_data.userName;
        const posts = await fetchPosts(userId);

        const feedContainer = document.querySelector('.feed-container');
        
        // Clear existing posts
        feedContainer.innerHTML = '';

        // Add new posts
        posts.forEach(post => {
            const postElement = createPostElement(post);
            feedContainer.appendChild(postElement);
        });

        document.getElementById('display-user-name').textContent = session_data.userRealName;
        document.getElementById('display-family-name').textContent = session_data.familyName;

    } catch (error) {
        console.error('Error loading posts:', error);
        // You might want to display an error message to the user here
    }
}

// Load posts when the page loads
window.addEventListener('load', loadPosts);