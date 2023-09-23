async function fetchCategories() {
  try {
    const response = await fetch("https://backend.getlinked.ai/hackathon/categories-list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Get a reference to the category select input
    const categorySelect = document.getElementById('categoryPicked');

    // Populate the select element with the retrieved categories
    data.categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

window.addEventListener('load', fetchCategories());

document.getElementById("input-fields").addEventListener('submit', async function (e) {
  e.preventDefault();

  const teamName = document.getElementById('teamName').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const emailAddress = document.getElementById('emailAddress').value;
  const projectTopic = document.getElementById('projectTopic').value;
  const categorySelect = document.getElementById('categoryPicked');
  const groupSize = document.getElementById('groupSize').value;
  const checkBox = document.getElementById('checkbox').checked;
  const regBtn = document.getElementById('registerBtn');

  categorySelect.addEventListener('click', () => {
    fetchCategories();
  });

  regBtn.addEventListener("click", async () => {
    try {
      const selectedCategory = categorySelect.value;

      const response = await fetch("https://backend.getlinked.ai/hackathon/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: teamName,
          phone: phoneNumber,
          email: emailAddress,
          topic: projectTopic,
          category: selectedCategory,
          size: groupSize,
          check: checkBox
        })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Response Status:", response.status);
      console.log("Response Text:", await response.text());

      const data = await response.json();

      if (data.id) {
        alert('This ID is already registered. Please use a different one.');
      } else {
        alert('Successful Registration!');
        console.log(data);
      };

    } catch (error) {
      console.error("Error:", error);

      document.getElementById("input-fields").reset();
    };
  });
});
