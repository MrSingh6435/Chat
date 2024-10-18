document.addEventListener('DOMContentLoaded', function () {
    const chatBody = document.getElementById('chat-body');

    // Fetch the chat data from the text file
    fetch('WhatsApp Chat with Bani.txt')
        .then(response => response.text())
        .then(data => {
            const messages = data.split('\n'); // Split the data by new lines

            messages.forEach(message => {
                const parsedMessage = parseMessage(message);
                if (parsedMessage) {
                    const messageElement = createMessageElement(parsedMessage);
                    chatBody.appendChild(messageElement);
                }
            });
        })
        .catch(error => console.error('Error fetching chat data:', error));
});

// Function to parse the message from the format "date, time - sender: message"
function parseMessage(line) {
    const messagePattern = /(\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2}) - (.*?): (.*)/;
    const match = line.match(messagePattern);

    if (match) {
        return {
            date: match[1],
            time: match[2],
            sender: match[3],
            text: match[4]
        };
    }
    return null;
}

// Function to create a message element based on the parsed data
function createMessageElement({ sender, text, time, date }) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    // Different styles for received vs sent messages
    if (sender === 'Bani') {
        messageDiv.classList.add('message-received');
    } else {
        messageDiv.classList.add('message-sent');
    }

    const messageText = document.createElement('p');
    messageText.classList.add('message-text');
    messageText.innerText = text;

    const messageTime = document.createElement('span');
    messageTime.classList.add('message-time');
    messageTime.innerText = `${time}, ${date}`;

    messageDiv.appendChild(messageText);
    messageDiv.appendChild(messageTime);

    return messageDiv;
}

// change color

const toggleButton = document.getElementById('toggleMode');
const body = document.body;

// Check for saved theme preference in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    // Update button text based on saved theme
    toggleButton.innerText = savedTheme === 'dark-mode' ? 'Light Mode' : 'Dark Mode';
}

toggleButton.addEventListener('click', () => {
    // Toggle between light and dark mode
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        toggleButton.innerText = 'Dark Mode'; // Update button text
        localStorage.setItem('theme', 'light-mode'); // Save preference
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        toggleButton.innerText = 'Light Mode'; // Update button text
        localStorage.setItem('theme', 'dark-mode'); // Save preference
    }
});
