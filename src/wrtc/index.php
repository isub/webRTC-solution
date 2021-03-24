<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>webRTC - solution</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="application using wetRTC technology">
		<meta name="author" content="Your name here!">

		<link href="css/style.css" rel="stylesheet">
	</head>

	<body>
		<div id="state-offline" style="align:center;width:600px">
			<?php
				include 'php/login.php';
			?>
		</div>
		<div id="state-online" style="align:center;width:600px;display:none">
			<?php
				include 'php/dialpad.html';
			?>
		</div>
		<div id="state-active" style="align:center;width:600px;display: none">
			<?php
				include 'php/call-ctl.php';
			?>
		</div>
		<div id="session-control" style="align:center;width:600px;display: none">
			<?php
				include 'php/logout.php';
			?>
		</div>
		<div>
			<input type="checkbox" id="with-video" checked>with video</input>
			<br>
			<button id="enum-devices-btn" data-inline="true">enum devices</button>
		</div>

		<script type="text/javascript" src="js/device_info.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
	</body>
</html>
