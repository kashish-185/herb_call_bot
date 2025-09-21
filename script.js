const callBtn = document.getElementById("callBtn");
const clearBtn = document.getElementById("clearBtn");
const errorMsg = document.getElementById("errorMsg");
const callLog = document.getElementById("callLog");

// Point frontend → backend
const API_ENDPOINT = "http://localhost:3000/call";

function logMessage(msg) {
  const timestamp = new Date().toLocaleTimeString();
  callLog.textContent += `[${timestamp}]   ${msg}\n`;
  callLog.scrollTop = callLog.scrollHeight;
}

async function startCall() {
  const countryCode = document.getElementById("countryCode").value;
  const phoneNumber = document.getElementById("phoneNumber").value.trim();

  if (!phoneNumber || !/^[0-9]{6,}$/.test(phoneNumber)) {
    errorMsg.textContent = "⚠️ Please enter a valid phone number.";
    return;
  }

  errorMsg.textContent = "";
  const fullNumber = countryCode + phoneNumber;
  logMessage(`Initiating call to ${fullNumber}`);

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: fullNumber }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    logMessage(`✅ Call started successfully → ${JSON.stringify(data)}`);
    alert(`📞 Call started to: ${fullNumber}`);
  } catch (err) {
    logMessage(`❌ Error → ${err.message}`);
    errorMsg.textContent = "⚠️ Failed to start call. Try again.";
  }
}

callBtn.addEventListener("click", startCall);
clearBtn.addEventListener("click", () => {
  document.getElementById("phoneNumber").value = "";
  errorMsg.textContent = "";
  logMessage("Cleared input.");
});

window.onload = () => {
  logMessage("UI ready. Endpoint: " + API_ENDPOINT);
};
