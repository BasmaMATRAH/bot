// script.js
const icon = document.getElementById('chatbot-icon');
const chatbot = document.getElementById('chatbot');
const conversationField = document.querySelector('.chatbot-convo');
const user_input_field = document.getElementById('chatbot-input-field');

function toggleChatbot() {
    if (chatbot.style.display === "none") {
        chatbot.style.display = "block";
    } else {
        chatbot.style.display = "none";
    }
}

// adding the user's input into the conversation
function sendMessage() {
    const user_input = user_input_field.value;
    user_input_field.value = '';

    // adding the user's input to the conversation
    userInput(`${user_input}`);

    // sending to the Flask server
    $.ajax({
        type: "POST",
        url: "/send-user-input",
        data: { user_input: user_input },
        success: function (response) {
            // add the bot's response to the conversation
            botResponse(`${response.response}`);
        },
        error: function (error) {
            console.error(error);
        }
    });
}

// add the bot's response to the conversation
function botResponse(response) {
    const new_element = document.createElement('p');
    new_element.classList.add('bot-answer');
    new_element.innerHTML = response;
    conversationField.appendChild(new_element);
    conversationField.scrollTop = conversationField.scrollHeight; // Scroll to bottom
}
function userInput(input) {
    const new_element = document.createElement('p');
    new_element.classList.add('user-input');
    new_element.innerHTML = input;
    conversationField.appendChild(new_element);
    conversationField.scrollTop = conversationField.scrollHeight; // Scroll to bottom
}
// Listen for Enter key press in the input field
user_input_field.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
  

botResponse("Hey there, I am Bissa, your virtual assistant.");
botResponse("How can I help you today?");
