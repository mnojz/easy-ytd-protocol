(function () {
  function displayPopup(url) {
    // Create background and popup elements in a single step
    const bg = document.createElement("div");
    bg.id = "popup-bg";
    const popup = document.createElement("div");
    popup.id = "popup-box";
    bg.appendChild(popup);
    document.body.appendChild(bg);

    // Create and append header with icon and title
    const header = document.createElement("div");
    header.id = "popup-header";
    const yticon = document.createElement("div");
    yticon.id = "popup-icon";
    yticon.style.backgroundImage =
      "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20x%3D%220px%22%20y%3D%220px%22%20width%3D%2230px%22%20height%3D%2230px%22%20viewBox%3D%220%200%2024%2024%22%20enable-background%3D%22new%200%200%2024%2024%22%20xml%3Aspace%3D%22preserve%22%20focusable%3D%22false%22%20aria-hidden%3D%22true%22%20style%3D%22pointer-events%3A%20none%3B%20display%3A%20inherit%3B%20width%3A%20100%25%3B%20height%3A%20100%25%3B%22%3E%3Cg%3E%3Cpath%20fill%3D%22%23FF0033%22%20d%3D%22M21.58%2C7.19c-0.23-0.86-0.91-1.54-1.77-1.77C18.25%2C5%2C12%2C5%2C12%2C5S5.75%2C5%2C4.19%2C5.42%20C3.33%2C5.65%2C2.65%2C6.33%2C2.42%2C7.19C2%2C8.75%2C2%2C12%2C2%2C12s0%2C3.25%2C0.42%2C4.81c0.23%2C0.86%2C0.91%2C1.54%2C1.77%2C1.77C5.75%2C19%2C12%2C19%2C12%2C19%20s6.25%2C0%2C7.81-0.42c0.86-0.23%2C1.54-0.91%2C1.77-1.77C22%2C15.25%2C22%2C12%2C22%2C12S22%2C8.75%2C21.58%2C7.19z%22%3E%3C%2Fpath%3E%3Cpolygon%20fill%3D%22%23FFFFFF%22%20points%3D%2210%2C15%2015%2C12%2010%2C9%20%22%3E%3C%2Fpolygon%3E%3C%2Fg%3E%3C%2Fsvg%3E')";
    yticon.style.backgroundSize = "cover";
    const dwntitle = document.createElement("div");
    dwntitle.id = "popup-title";
    dwntitle.textContent = "Download Video";
    header.appendChild(yticon);
    header.appendChild(dwntitle);
    popup.appendChild(header);

    // Create format selection and checkboxes
    const formatSelection = document.createElement("div");
    formatSelection.id = "popup-format-selection";
    popup.appendChild(formatSelection);

    const formats = [
      { id: "audio-only-checkbox", label: "Audio Only", checked: false },
      { id: "video-checkbox", label: "Video", checked: true },
    ];

    formats.forEach((format) => {
      const formatBox = document.createElement("div");
      formatBox.className = "popup-format-box";

      const checkbox = document.createElement("input");
      checkbox.id = format.id;
      checkbox.type = "checkbox";
      checkbox.checked = format.checked;

      const label = document.createElement("label");
      label.textContent = format.label;

      // Append checkbox and label to the formatBox
      formatBox.appendChild(checkbox);
      formatBox.appendChild(label);
      formatSelection.appendChild(formatBox);

      // Add click event listener to toggle the checkbox
      formatBox.addEventListener("click", (event) => {
        // Prevent toggling if the click is directly on the checkbox
        if (event.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
      });
    });

    // Create download button
    const dwnbtn = document.createElement("button");
    dwnbtn.id = "popup-download-button";
    dwnbtn.textContent = "Download";
    dwnbtn.onclick = function () {
      const audioOnly = document.getElementById("audio-only-checkbox").checked;
      const video = document.getElementById("video-checkbox").checked;
      if (!audioOnly && !video) {
        alert("Please select at least one format");
      } else {
        window.location.href = `ytd:${url}&audio=${audioOnly}&video=${video}`;
        closePopup();
      }
    };
    popup.appendChild(dwnbtn);

    // Create close button
    const closebtn = document.createElement("button");
    closebtn.id = "popup-close-button";
    closebtn.onclick = closePopup;
    popup.appendChild(closebtn);

    // Close popup function
    function closePopup() {
      bg.remove();
    }
  }

  function addCustomButton() {
    if (!window.location.href.includes("watch")) return;

    const containers = Array.from(document.querySelectorAll("#flexible-item-buttons")).filter(
      (container) => container.children.length > 1
    );
    containers.forEach((container) => {
      // Skip if custom button already exists
      if (container.querySelector("#custom-download-button")) return;

      // Hide default download button if exists
      const existingButton = container.querySelector("ytd-download-button-renderer");
      if (existingButton) existingButton.style.display = "none";

      // Create the custom button
      const customButton = document.createElement("button");
      customButton.id = "custom-download-button";
      customButton.textContent = "Download";
      customButton.onclick = () => displayPopup(window.location.href);
      container.insertBefore(customButton, container.firstChild);
    });
  }

  const observer = new MutationObserver(addCustomButton);
  observer.observe(document.body, { childList: true, subtree: true });

  // Initial call to add the custom button
  addCustomButton();
})();
