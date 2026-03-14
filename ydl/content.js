(function () {
  function debugLog(message, ...optionalParams) {
    console.log(`%c${message}`, "color: cyan; font-weight: bold; font-size: 24px;", ...optionalParams);
  }

  function closePopup() {
    const bg = document.getElementById("popup-bg");
    if (bg) {
      bg.remove();
    }
  }

  function displayPopup(url) {
    // Create background and popup elements in a single step
    const bg = document.createElement("div");
    bg.id = "popup-bg";
    // Close popup when clicking on the background
    bg.onclick = function (e) {
      if (e.target === bg) {
        closePopup();
      }
    };
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

    // Create format selection and radio buttons
    const formatSelection = document.createElement("div");
    formatSelection.id = "popup-format-selection";
    popup.appendChild(formatSelection);

    const formats = [
      { id: "4k-radio", common: "UHD", label: "2160p (4k)", checked: false },
      { id: "2k-radio", common: "QHD", label: "1440p (2k)", checked: false },
      { id: "1k-radio", common: "FHD", label: "1080p", checked: true },
      { id: "72-radio", common: "HD", label: "720p", checked: false },
      { id: "48-radio", common: "SD", label: "480p", checked: false },
      { id: "au-radio", common: "Audio", label: "mp3", checked: false },
    ];

    formats.forEach((format) => {
      const formatBox = document.createElement("div");
      formatBox.className = "popup-format-box";

      const radio = document.createElement("input");
      radio.id = format.id;
      radio.type = "radio";
      radio.name = "mediaFormat";
      radio.checked = format.checked;
      radio.dataset.format = format.common;

      const label = document.createElement("label");
      label.textContent = format.label;

      const common = document.createElement("span");
      common.textContent = format.common;

      // Append radio and label to the formatBox
      formatBox.appendChild(radio);
      formatBox.appendChild(label);
      formatBox.appendChild(common);
      formatSelection.appendChild(formatBox);

      // Add click event listener to toggle the radio
      formatBox.addEventListener("click", (event) => {
        radio.checked = true;
      });
    });

    // Create download button
    const dwnbtn = document.createElement("button");
    dwnbtn.id = "popup-download-button";
    dwnbtn.textContent = "Download";

    dwnbtn.onclick = function () {
      const selected = document.querySelector("input[name='mediaFormat']:checked").dataset.format;
      window.location.href = `ytd:${url}&format=${selected}`;
      closePopup();
    };

    popup.appendChild(dwnbtn);

    // Create close button
    const closebtn = document.createElement("button");
    closebtn.id = "popup-close-button";
    closebtn.onclick = closePopup;
    popup.appendChild(closebtn);
  }

  const buttonSvgInnerHtml = `
  <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.58303 12.8232L9.64172 7.97294C10.7817 5.28719 11.3518 3.94433 10.768 3.32838C10.1842 2.71367 8.96505 3.37576 6.52673 4.70116C6.02209 4.97548 5.77092 5.11264 5.50025 5.11264C5.22957 5.11264 4.97727 4.97548 4.47376 4.70116C2.03546 3.37576 0.815145 2.71367 0.232519 3.32962C-0.352403 3.94433 0.218756 5.28719 1.35878 7.97418L3.41747 12.8232C4.31665 14.9404 4.76624 16.0002 5.50025 16.0002C6.23427 16.0002 6.68385 14.9417 7.58303 12.8232Z" fill="currentColor"/>
  <path d="M6.35114 1.32617C8.37107 0.230703 9.38111 -0.316569 9.86481 0.191408C10.171 0.513732 10.0908 1.07571 9.75348 2.00879C8.97942 2.33322 7.99251 2.85492 6.73883 3.51758L6.73102 3.52149C6.12753 3.84051 5.82568 3.99992 5.50055 4C5.17389 4 4.86895 3.83953 4.26129 3.51758C3.00733 2.85477 2.01999 2.33408 1.24567 2.00977C0.908114 1.07637 0.828508 0.514091 1.13532 0.192384C1.61806 -0.316801 2.62964 0.230496 4.64997 1.32617C5.06705 1.55288 5.27632 1.66602 5.50055 1.66602C5.72373 1.6659 5.93094 1.55381 6.34528 1.3291L6.35114 1.32617Z" fill="currentColor"/>
  </svg>
  `;

  function createButton(container) {
    debugLog("Container found, creating button", container);
    if (container) {
      const buttonLikeDislikeSegment = container.querySelector("segmented-like-dislike-button-view-model");
      if (buttonLikeDislikeSegment) {
        debugLog("Like dislike segment found, creating button", buttonLikeDislikeSegment);
        hideOriginalDownloadButton();
        const downloadButton = document.createElement("button");
        downloadButton.id = "downloadButton";
        downloadButton.innerHTML = `${buttonSvgInnerHtml}<span>Download</span>`;
        downloadButton.onclick = () => displayPopup(window.location.href);
        buttonLikeDislikeSegment.insertAdjacentElement("afterend", downloadButton);
      }
    }
  }

  function hideOriginalDownloadButton() {
    const originalDownloadButton = document.querySelector("#flexible-item-buttons ytd-download-button-renderer");
    if (originalDownloadButton) {
      originalDownloadButton.style.display = "none";
      debugLog("Original download button hidden", originalDownloadButton);
    }
  }

  function setThemeAttributeToHtml() {
    const isDark = window.getComputedStyle(document.documentElement).getPropertyValue("background-color") === "rgb(15, 15, 15)";
    if (isDark) {
      document.documentElement.setAttribute("darky", "");
    } else {
      document.documentElement.setAttribute("lighty", "");
    }
  }

  function addCustomButton() {
    debugLog("Checking for watch or clip page");
    if (!window.location.pathname.includes("/watch") && !window.location.pathname.includes("/clip")) return;
    debugLog("Watch or clip page detected, looking for container");

    const interval = setInterval(() => {
      const container = document.querySelector("ytd-watch-metadata #top-level-buttons-computed");
      if (container) {
        // Skip if custom button already exists
        if (container.querySelector("#downloadButton")) return;
        createButton(container);
        clearInterval(interval);
      }
    }, 100);
  }

  const downloadButtonObserver = new MutationObserver(addCustomButton);
  downloadButtonObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Initial call to set theme attribute
  setThemeAttributeToHtml();
  // Initial call to add the custom button
  addCustomButton();
})();
