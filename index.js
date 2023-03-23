// Get the confirm button and camera view elements
const confirmButton = document.getElementById('confirmButton');
const cameraView = document.getElementById('cameraView');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Get the upload button
const uploadButton = document.getElementById('uploadButton');

// Get the API key and user token from MediaFire
const apiKey = 'your_api_key_here';
const userToken = 'your_user_token_here';

// Set the upload URL for MediaFire API
const uploadUrl = 'https://www.mediafire.com/api/upload/upload.php';

// Set the upload options for MediaFire API
const uploadOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: null
};

// Add click event listener to confirm button
confirmButton.addEventListener('click', function() {
  // Check if user has granted camera permission
  navigator.mediaDevices.getUserMedia({ video: {facingMode: { exact: "environment" }}})
    .then(function(stream) {
      // Hide camera view
      cameraView.style.display = 'none';

      // Play video stream in video element
      video.srcObject = stream;
      video.play();

      // Show canvas element
      canvas.style.display = 'block';

      // Set canvas dimensions to match video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame on canvas
      setInterval(function() {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      }, 0);

      // Convert canvas to image data URL
      const imageDataUrl = canvas.toDataURL();

      // Set the upload options body with the image data and other required parameters
      uploadOptions.body = 'action_on_duplicate=keep&session_token=' + userToken + '&key=' + apiKey + '&file=@' + imageDataUrl;

      // Upload the image to MediaFire
      fetch(uploadUrl, uploadOptions)
        .then(function(response) {
          return response.text();
        })
        .then(function(data) {
          console.log(data);
        })
        .catch(function(error) {
          console.error('Could not upload file: ' + error.message);
        });

      // Stop video stream and track
      stream.getVideoTracks()[0].stop();
    })
    .catch(function(error) {
      console.error('Could not access camera: ' + error.message);
    });
});

// Add beforeunload event listener to window object
window.addEventListener('beforeunload', function(e) {
  // Prevent default behavior of closing browser window/tab
  e.preventDefault();
  // Return empty string to prompt confirmation dialog box
  e.returnValue = '';
});
