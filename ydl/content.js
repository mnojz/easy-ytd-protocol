(function () {
  // Function to display the popup
  function displayPopup(url) {
    // creating a background to make the popup popout XD
    const bg = document.createElement("div");
    bg.id = "popup-bg";
    document.body.appendChild(bg);

    // creating the popup box
    const popup = document.createElement("div");
    popup.id = "popup-box";
    bg.appendChild(popup);

    // creating the top header containing title and icon
    const header = document.createElement("div");
    header.id = "popup-header";
    popup.appendChild(header);

    // creating icon
    const yticon = document.createElement("img");
    yticon.id = "popup-icon";
    yticon.src = "https://prowise-acc.hosted-temp.com/content/uploads/2023/06/logo-youtube.png";
    header.appendChild(yticon);

    // creating the title text
    const dwntitle = document.createElement("div");
    dwntitle.id = "popup-title";
    dwntitle.textContent = "Download Video";
    header.appendChild(dwntitle);

    // creating the input field to select formats
    const formatSelection = document.createElement("div");
    formatSelection.id = "popup-format-selection";
    popup.appendChild(formatSelection);

    //creating the box containing checkbox and label
    const formatBox = document.createElement("div");
    formatBox.className = "popup-format-box";
    formatSelection.appendChild(formatBox);

    //creating the checkbox
    const checkbox = document.createElement("input");
    checkbox.id = "audio-only-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = false;
    formatBox.appendChild(checkbox);

    //creating the label
    const label = document.createElement("label");
    label.textContent = "Audio Only";
    formatBox.appendChild(label);

    //creating the box containing checkbox and label
    const formatBox2 = document.createElement("div");
    formatBox2.className = "popup-format-box";
    formatSelection.appendChild(formatBox2);

    //creating the checkbox
    const checkbox2 = document.createElement("input");
    checkbox2.id = "video-checkbox";
    checkbox2.type = "checkbox";
    checkbox2.checked = true;
    formatBox2.appendChild(checkbox2);

    //creating the label
    const label2 = document.createElement("label");
    label2.textContent = "Video";
    formatBox2.appendChild(label2);

    //dreating a download button
    const dwnbtn = document.createElement("button");
    dwnbtn.id = "popup-download-button";
    dwnbtn.textContent = "Download";
    dwnbtn.onclick = function downloadVideo() {
      let audioOnly = document.getElementById("audio-only-checkbox").checked;
      let video = document.getElementById("video-checkbox").checked;
      if (!audioOnly && !video) {
        alert("Please select at least one format");
      } else {
        const command = `ytd:${url}&audio=${audioOnly}&video=${video}`;
        window.location.href = command;
        closePopup();
      }
    };
    popup.appendChild(dwnbtn);

    // creating close button
    const closebtn = document.createElement("button");
    closebtn.id = "popup-close-button";
    closebtn.onclick = closePopup;
    popup.appendChild(closebtn);

    function closePopup() {
      bg.remove();
    }
  }
  // Function to add the custom button
  function addCustomButton() {
    // Find the container where the button should be placed
    const container = document.querySelector("#flexible-item-buttons");
    if (!container) return;

    // Find if the existing download button is present and hide it
    const existingButton = container.querySelector("ytd-download-button-renderer");
    if (existingButton) {
      existingButton.style.display = "none";
    }

    // Check if the custom button already exists
    if (document.querySelector("#custom-download-button")) {
      return;
    }

    // Create the custom button
    const customButton = document.createElement("button");
    customButton.id = "custom-download-button";
    customButton.textContent = "YTD-Download"; // Change to your desired text

    // Add a click event to trigger the download
    customButton.onclick = function () {
      const videoUrl = window.location.href;
      displayPopup(videoUrl);
    };

    // Insert the custom button after the default download button, if any
    if (existingButton) {
      container.insertBefore(customButton, existingButton.nextSibling);
    } else {
      container.appendChild(customButton); // If no default button, add it at the end
    }
  }

  // Set up MutationObserver to watch for changes in the DOM
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        addCustomButton(); // Add button when necessary nodes are added
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Add the button initially
  addCustomButton();
})();
