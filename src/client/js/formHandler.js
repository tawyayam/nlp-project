// Replace checkForName with isValid Function
import { isValidUrl } from "./validUrlChecker";

const serverURL = "http://localhost:3000/userPost";

let results = document.querySelector(".results");

const form = document.getElementById("urlForm");
form.addEventListener("submit", handleSubmit);

const handleSubmit = (event) => {
  event.preventDefault();

  // Get the URL from the input field
  const formText = document.getElementById("name").value;

  // Check if the URL is valid
  if (isValidUrl(formText)) {
    // If the URL is valid, send it to the server using the serverURL constant above
    postDataToServer(serverURL, { url: formText }).then((response) => {
      results.innerHTML = "";
      // Choose needed data from API
      const { agreement, irony, score_tag, confidence, model } = response;
      const data = { agreement, irony, score_tag, confidence, model };
      console.log(Object.entries(data));
      Object.entries(data).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
        const infoDiv = document.createElement("div");
        infoDiv.className = "info-box";
        const infoTitle = document.createTextNode(key.toUpperCase());
        infoDiv.appendChild(infoTitle);

        const infoValue = document.createElement("span");
        infoValue.appendChild(document.createTextNode(value));
        infoDiv.appendChild(infoValue);

        results.appendChild(infoDiv);
      });
    });
  } else {
    alert("Plaese Enter a Valid URL");
  }
}

// Function to send data to the server
const postDataToServer = async (url = "", formData = {}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return response.json();
  } catch (error) {
    console.log("Error:", error);
  }
};

// Export the handleSubmit function
export { handleSubmit };
