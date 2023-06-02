const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  // Validate url
  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);
      showScanner();
      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        // Get save url
        const saveUrl = qr.querySelector("img").src;
        // Create save button
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

// Generate QR code
const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
};

// hide  scanner
const showScanner = () => {
  const scanner = document.getElementById("qrCodeContainer");
  scanner.style.display = "block";
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {
  const button = document.createElement("button");
  button.id = "save-button";
  button.classList =
    "bg-green-500 hover:bg-blue-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  button.innerHTML = "Save Image";

  button.addEventListener("click", () => {
    downloadQRCode(saveUrl);
  });

  document.getElementById("generated").appendChild(button);
};

// Function to download the QR code image
const downloadQRCode = (url) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "qrcode.png";
      a.click();
    });
};

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
