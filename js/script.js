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
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-green-500 hover:bg-blue-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.innerHTML = "Save Image";

  link.addEventListener("click", () => {
    // Create a temporary canvas element
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Create an image object to load the QR code
    const qrImage = new Image();
    qrImage.crossOrigin = "anonymous";

    // Set the image source to the QR code URL
    qrImage.src = saveUrl;

    // Wait for the image to load
    qrImage.onload = () => {
      // Set the canvas dimensions to match the QR code image
      canvas.width = qrImage.width;
      canvas.height = qrImage.height;

      // Draw the QR code image onto the canvas
      context.drawImage(qrImage, 0, 0);

      // Convert the canvas content to a data URL
      const dataUrl = canvas.toDataURL("image/png");

      // Create a temporary anchor tag with the data URL
      const downloadLink = document.createElement("a");
      downloadLink.href = dataUrl;
      downloadLink.download = "qrcode.png";

      // Programmatically trigger the click event to initiate the download
      downloadLink.click();
    };
  });

  document.getElementById("generated").appendChild(link);
};

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
