document.getElementById("form-contacts").addEventListener("submit", async function (reg) {
  reg.preventDefault()

  const name = document.getElementById("name-input").value;
  const email = document.getElementById("mail-input").value;
  const message = document.getElementById("message-input").value;
  const submitBtn = document.getElementById('submit-btn');

  submitBtn.addEventListener("click", async () => {
    try {
      const result = await fetch("https://backend.getlinked.ai/hackathon/contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          first_name: name,
          message: message
        })
      });
    
      if (!result.ok) {
        throw new Error(`API request failed with status: ${result.status}`);
      }
    
      const data = await result.json();
      
      alert('Message Sent!')
      console.log(data);

    } catch (error) {
      console.error("Error:", error);
    }
    
  });

});