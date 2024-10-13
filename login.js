// Get DOM elements
const teamCodeInput = document.getElementById('team-code-input');
const createUserNameInput = document.getElementById('create-user-name');
const createPasswordInput = document.getElementById('create-password');
const submitButton = document.querySelector('button');
const goBackIntroBtn = document.getElementById('go-back-intro-btn');
const createFirstNameInput = document.getElementById('create-first-name');
const createLastNameInput = document.getElementById('create-last-name');

// API URLs
const CREATE_USER_URL = 'https://ym4j51mkp6.execute-api.us-east-1.amazonaws.com/kinnect-v01/kinnect-api/create-user';
const ADD_TO_FAMILY_URL = 'https://ym4j51mkp6.execute-api.us-east-1.amazonaws.com/kinnect-v01/kinnect-api/add-to-family';


const familyData = {
    familyName: '',
    userName: '',
    familyCode: '',
    userRealName: ''
};

// Function to save family data to localStorage
function saveFamilyData() {
    localStorage.setItem('familyData', JSON.stringify(familyData));
}

// Function to create a user
async function createUser(username, password, first, last) {
  const response = await fetch(CREATE_USER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name: first,
      last_name: last,
      username: username,
      password: password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create user');
  }

  return data.user_id;
}

// Function to add user to family
async function addToFamily(userId, familyId) {
  const response = await fetch(ADD_TO_FAMILY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: userId,
      family_id: familyId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to add user to family');
  }

  return data.message;
}

// Event listener for the submit button
submitButton.addEventListener('click', async () => {
  const username = createUserNameInput.value.trim();
  const password = createPasswordInput.value.trim();
  const familyId = teamCodeInput.value.trim();

  const firstname = createFirstNameInput.value.trim();
  const lastname = createLastNameInput.value.trim();

  if (!username || !password || !familyId) {
    alert('Please fill in all fields');
    return;
  }

  try {
    // Create user
    const userId = await createUser(username, password, firstname, lastname);
    console.log('User created successfully');

    // Add user to family
    const message = await addToFamily(userId, familyId);
    console.log(message);

    familyData.userName = userId;
    familyData.familyCode = familyId;
    familyData.userRealName = firstname + " " + lastname;
    familyData.familyName = "Placeholder";

    alert('Account created and joined family successfully!');
    // You might want to redirect the user or clear the form here
  } catch (error) {
    console.error('Error:', error.message);
    alert(`An error occurred: ${error.message}`);
  }
});

// // Event listener for the back button
// goBackIntroBtn.addEventListener('click', () => {
//   // Add functionality to go back to the intro page
//   console.log('Go back to intro clicked');
//   // You might want to redirect the user or show/hide elements here
// });