async function sendChat(e) {
  e.preventDefault();
  const inputChat = document.getElementById("input-chat");
  const inputChatValue = inputChat.value;

  const chatWrapper = document.getElementById("chat-wrapper");

  const chatContainer = document.getElementById("chat-container");
  let chatIndex = chatContainer.childElementCount;
  const isEven = chatIndex % 2;

  // Clone template chat
  const templateChat = document.getElementById("template-chat")
  const clonedTemplateChat = templateChat.cloneNode(true);

  // Modify main alert div
  clonedTemplateChat.classList.remove('d-none')
  clonedTemplateChat.classList.add(isEven ? 'alert-primary' : 'alert-secondary')
  clonedTemplateChat.querySelector("#chat-content").textContent = inputChatValue

  // Modify profile
  const userSatu = localStorage.getItem("user-satu") || "Raffi"
  const userDua = localStorage.getItem("user-dua") || "Ramadhan"
  clonedTemplateChat.querySelector("#profile-name").textContent = isEven ? userSatu : userDua
  clonedTemplateChat.querySelector("#profile-photo").style.backgroundColor = isEven ? "blue" : "grey"

  // Disable submit
  const submitBtn = document.getElementById("submit-btn")
  submitBtn.disabled = true;

  // Show loader
  const chatLoader = document.getElementById("loader-chat")
  chatLoader.classList.remove("d-none")

  // Scroll to bottom
  setTimeout(() => {
    chatWrapper.scrollTop = chatWrapper.scrollHeight;
  }, 0);

  // Give loading before appending .5 - 1 s
  await new Promise(r => setTimeout(r,
    Math.floor(Math.random() * (1000 - 500)) + 500
  ));

  // Enable submit
  submitBtn.disabled = false;

  // Hide loader
  chatLoader.classList.add("d-none")

  // Append to chat container
  chatContainer.appendChild(clonedTemplateChat)

  // Save chat history to localStorage
  localStorage.setItem("chatHistory", chatContainer.innerHTML);

  // Clear input chat value
  inputChat.value = ""

  // Show clear btn
  document.getElementById("clear-chat-btn").classList.remove('d-none')

  // Scroll to bottom
  setTimeout(() => {
    chatWrapper.scrollTop = chatWrapper.scrollHeight;
  }, 0);
}

// Clear chat
function clearChat() {
  if (!confirm("clear semua chat?")) return
  localStorage.removeItem("chatHistory");
  window.location.href = ""
}

// Function to load chat history from localStorage when the page loads
function loadChatHistory() {
  const chatContainer = document.getElementById("chat-container");
  const savedChat = localStorage.getItem("chatHistory");

  if (savedChat) {
    chatContainer.innerHTML = savedChat;
    return true;
  }
  return false
}

async function setupPercakapan(e) {
  e.preventDefault();

  const userSatu = document.getElementById("user-satu").value;
  const userDua = document.getElementById("user-dua").value;

  localStorage.setItem("user-satu", userSatu)
  localStorage.setItem("user-dua", userDua)

  alert("Setup berhasil.")
  document.getElementById("go-modal-chat-btn").click();
}

document.addEventListener("DOMContentLoaded", function () {
  const isChatHistory = loadChatHistory();
  if (isChatHistory) {
    document.getElementById("clear-chat-btn").classList.remove('d-none')
  }

  // document.getElementById("setup-percakapan-btn").click();
})