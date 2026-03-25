const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const sendBtn = document.getElementById("send");
const output = document.getElementById("output");

let user = null;

// ✅ CHECK SESSION ON LOAD (THIS FIXES YOUR ISSUE)
window.onload = async () => {
  try {
    user = await puter.auth.getUser();
    if (user) {
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
    }
  } catch {
    console.log("Not logged in");
  }
};

// ✅ LOGIN (FIXED)
loginBtn.onclick = async () => {
  try {
    user = await puter.auth.signIn(); // important
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } catch (err) {
    console.error(err);
  }
};

// ✅ LOGOUT
logoutBtn.onclick = async () => {
  await puter.auth.signOut();
  location.reload();
};

// ✅ SEND PROMPT
sendBtn.onclick = async () => {
  const prompt = document.getElementById("prompt").value;
  const model = document.getElementById("model").value;

  output.textContent = "Thinking...";

  try {
    const res = await puter.ai.chat({
      model: model,
      messages: [
        { role: "user", content: prompt }
      ]
    });

    output.textContent = res.message.content;

  } catch (err) {
    output.textContent = "Error: " + err.message;
  }
};
