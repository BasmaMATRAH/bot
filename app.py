from flask import Flask, request, jsonify, render_template, url_for
import openai

app = Flask(__name__, static_url_path='/static')

# Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
openai.api_key = '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'

# Reading the knowledge base
file_path = "example- kb.txt"

   # Initialize an empty variable to store the content
knowledge_base = ""

  # Open the file in read mode and read its content
with open(file_path, "r") as file:
    knowledge_base = file.read()

  # Initialize the conversation with the bot's introduction and the knowledge base
conversation = {
    'messages': [
        {"role": "system", "content": "You are an assistant called Bisa from Strategic Solutions Consulting, you use documents to help answer the user's questions , use always  three sentences or less with very simple words ,you are a part of the team so always answer with we ..."},
        {"role": "assistant", "content": knowledge_base}
    ]
}

#send the user's input to the api and get the bot's response 
def CustomChatGPT(user_input):
    conversation['messages'].append({"role": "user", "content": user_input})
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=conversation['messages'],
        temperature=0.2 
    )
    chatgpt_reply = response["choices"][0]["message"]["content"]
    conversation['messages'].append({"role": "assistant", "content": chatgpt_reply})
    return jsonify({'response': chatgpt_reply})

@app.route('/')
def index():
    return render_template('index.html', css_file=url_for('static', filename='styles.css'))

@app.route('/send-user-input', methods=['POST'])
def send_user_input():
    user_input = request.form.get('user_input', '')
    bot_reply = CustomChatGPT(user_input)
    return bot_reply

if __name__ == "__main__":
    app.run(debug=True)
