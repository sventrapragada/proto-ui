document.addEventListener("DOMContentLoaded", function() {
  const messages = document.getElementById("chatbot-messages");
  const input = document.getElementById("chatbot-input");
  const sendBtn = document.getElementById("chatbot-send");

  const page = window.location.pathname;

  function botReply(text) {
    const botMsg = document.createElement("div");
    botMsg.textContent = "Bot: " + text;
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;
  }

  sendBtn.addEventListener("click", function() {
    if (input.value.trim() === "") return;

    const userMsg = document.createElement("div");
    userMsg.textContent = "You: " + input.value;
    messages.appendChild(userMsg);

    messages.scrollTop = messages.scrollHeight;

    // Example reply logic
    if (page.includes("about")) {
      botReply("You're on the About page. What feedback do you have?");
    } else if (page.includes("contact")) {
      botReply("You're on the Contact page. Please share your thoughts!");
    } else {
      botReply("This is the Home page. We'd love your feedback!");
    }

    // Send feedback to Formspree (replace with your Formspree endpoint!)
    fetch("https://formspree.io/f/mgvybqpg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: input.value,
        page: page
      })
    }).then(() => {
      botReply("Thanks! Your feedback was sent.");
    }).catch(() => {
      botReply("Oops! Failed to send feedback.");
    });

    input.value = "";
  });
});
