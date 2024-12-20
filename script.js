<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Xylaz Bot</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <div class="chat-window">
      <div class="chat-header">
        <h2>Xylaz</h2>
      </div>
      <div class="chat-history" id="chat-history"></div>
      <div class="chat-input">
        <input type="text" id="prompt" placeholder="Ask, degen...">
        <button id="submit-btn">></button>
      </div>
    </div>
  </div>

  <script>
    document.addEventListener("DOMContentLoaded", function () {
      const chatHistory = document.getElementById("chat-history");
      const promptInput = document.getElementById("prompt");
      const submitButton = document.getElementById("submit-btn");

     
      function addMessage(message, sender) {
        const messageClass = sender === "user" ? "user-message" : "bot-message";
        const messageElement = document.createElement("div");
        messageElement.classList.add("chat-message", messageClass);
        messageElement.textContent = message;
        chatHistory.appendChild(messageElement);
        chatHistory.scrollTop = chatHistory.scrollHeight;
      }

     
      async function getAIResponse(userMessage) {
        try {
          const response = await fetch("https://xylazbot.xyz/api/chat", { // Ajusta la URL según tu servidor

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: userMessage }),
          });

          const data = await response.json();
          return data.response || "Sorry, I am experiencing some issues."; // Cambié 'message' a 'response'
        } catch (error) {
          console.error("Error fetching AI response:", error);
          return "Coming.";
        }
      }

      // Cuando el usuario haga clic en el botón de enviar
      submitButton.addEventListener("click", async function () {
        const userMessage = promptInput.value;
        if (!userMessage.trim()) return;

        addMessage(userMessage, "user");
        promptInput.value = "";

        addMessage("Xylaz say...", "bot");
        const botResponse = await getAIResponse(userMessage);

        const thinkingMessage = chatHistory.querySelector(".bot-message:last-child");
        thinkingMessage.textContent = `Xylaz: ${botResponse}`;
      });

      // Enviar mensaje al presionar Enter
      promptInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          submitButton.click();
          event.preventDefault();
        }
      });
    });
  </script>
</body>
</html>
