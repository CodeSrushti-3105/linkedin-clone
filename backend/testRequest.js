// testRequest.js
import fetch from "node-fetch"; // if using Node 18+, fetch is built-in, otherwise install: npm i node-fetch

const token = "PASTE_YOUR_TOKEN_HERE"; // your JWT token from login response

async function testProtectedRoute() {
  try {
    const response = await fetch("http://localhost:5000/api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();
    console.log("Response:", data);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

testProtectedRoute();
