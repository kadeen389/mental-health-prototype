document.addEventListener("DOMContentLoaded", () => {
  console.log("chat.js loaded and DOM ready");

  const chatBox = document.getElementById("chatBox");
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  sendBtn.addEventListener("click", sendMessage);

  userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    addMessage(message, "user");
    userInput.value = "";

    setTimeout(() => {
      handleBotResponse(message);
    }, 500);
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);

    const messageText = document.createElement("p");
    messageText.textContent = text;

    messageDiv.appendChild(messageText);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function getSupportiveResponse() {
    const responses = [
      "Thank you for sharing that with me. If you’d like, you can tell me a bit more about how you’re feeling.",
      "That sounds like it might be difficult. I’m here to listen if you want to talk about it.",
      "It’s okay to feel this way sometimes. What’s been on your mind recently?",
      "I appreciate you opening up. Take your time — I’m here with you.",
      "You’re not alone, and talking about things can be a helpful first step."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  async function handleBotResponse(userMessage) {
    try {
      const lower = userMessage.toLowerCase();

      // 🚨 IMMEDIATE CRISIS OVERRIDE (ALWAYS FIRST)
      const crisisKeywords = [
        "suicidal",
        "suicide",
        "kill myself",
        "self harm",
        "self-harm",
        "end my life",
        "hopeless",
        "worthless"
      ];

      if (crisisKeywords.some(word => lower.includes(word))) {
        addMessage(
          "Thank you for telling me that. It sounds like you may be going through a very difficult time. While I can’t offer professional advice, support is available and you don’t have to face this alone.",
          "bot"
        );
        addMessage(
          "If you feel at risk or overwhelmed, please consider reaching out to one of the following services:",
          "bot"
        );
        addMessage(
          "• Samaritans: 116 123\n• NHS 111\n• YoungMinds: Text YM to 85258",
          "bot"
        );
        return;
      }

      // 😊 POSITIVE / OK CHECK
      if (
        lower.includes("i'm okay") ||
        lower.includes("im okay") ||
        lower.includes("i am okay") ||
        lower.includes("i'm fine") ||
        lower.includes("im fine")
      ) {
        addMessage(
          "I’m really glad to hear that. If anything does come up later, I’m here to listen.",
          "bot"
        );
        return;
      }

      // 🔗 CALL ML BACKEND
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userMessage })
      });

      const data = await response.json();
      const confidence = data.confidence || 0;
      const textLength = userMessage.trim().length;

      // 🧠 HYBRID DECISION LOGIC
      if (data.risk === "high" && confidence > 0.65 && textLength > 10) {
        addMessage(
          "Thank you for sharing that with me. It sounds like you may be going through a very difficult time. While I can’t offer professional advice, support is available and you don’t have to face this alone.",
          "bot"
        );
        addMessage(
          "If you feel at risk or overwhelmed, please consider reaching out to one of the following services:",
          "bot"
        );
        addMessage(
          "• Samaritans: 116 123\n• NHS 111\n• YoungMinds: Text YM to 85258",
          "bot"
        );
      } else if (data.risk === "medium" && confidence > 0.5) {
        addMessage(
          "It sounds like you’re feeling under pressure. That can come from lots of different things. If you want, you can tell me more about what’s been weighing on you.",
          "bot"
        );
      } else {
        addMessage(getSupportiveResponse(), "bot");
      }

    } catch (error) {
      addMessage(getSupportiveResponse(), "bot");
    }
  }
});



