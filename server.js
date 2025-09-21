const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(express.json());
app.use(cors());

let port=3000;

app.post("/call", async (req, res) => {
  const { to } = req.body;
  console.log("☎️ Forwarding call to:", to);

  try {
    const response = await axios.post(
      "https://b67c79e3-cfb6-4f4e-be53-5eac63e01189-00-1by1jcno4osr2.sisko.replit.dev/make-outbound-call",
      { to },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("📞 Replit API response:", response.data);
    res.json(response.data);
  } catch (err) {
    console.error("❌ Error contacting Replit API:", err.message);
    res.status(500).json({ message: "Failed to initiate call" });
  }
});

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
});
