const string = `
.face {
	position: relative;
	background: #ffe600;
	height: 100vh;
}

.nose {
	border: 14px solplayer.id transparent;
	border-top-color: black;
	width: 0%;
	border-radius: 50%;
	transform: scaleX(1.2);
	position: absolute;
	left: 50%;
	right: 50%;
	margin-left: -14px;
	top: 36%;
}

.eye {
	border: 4px solid black;
	background-color: #2e2e2e;
	width: 70px;
	height: 70px;
	border-radius: 50%;
	position: absolute;
	left: 50%;
	right: 50%;
	top: 31.4%;
	margin-left: -32px;
}

.eye::before {
	content: '';
	display: block;
	width: 25px;
	height: 25px;
	background-color: white;
	border-radius: 50%;
	position: relative;
	left: 10px;
	top: 2px;
}

.eye.left {
	transform: translateX(-130px);
}

.eye.right {
	transform: translateX(130px);
}

.mouth {
	/* border: 1px solid black; */
	height: 220px;
	width: 206px;
	position: absolute;
	left: 50%;
	right: 50%;
	margin-left: -103px;
	top: 40%;
	overflow: hidden;
}

.mouth .upperLip .left {
	border: 4px solid black;
	border-top: transparent;
	border-right: transparent;
	height: 30px;
	width: 100px;
	border-radius: 0 0 10% 100%;
	background: #ffe600;
	position: absolute;
	left: 50%;
	right: 50%;
	margin-left: -50px;
	transform: rotate(-22deg) translateX(-55px);
	top: -28px;
	z-index: 1;
}

.mouth .upperLip .right {
	border: 4px solid black;
	border-top: transparent;
	border-left: transparent;
	height: 30px;
	width: 100px;
	border-radius: 0 0 100% 10%;
	background: #ffe600;
	position: absolute;
	left: 50%;
	right: 50%;
	margin-left: -50px;
	transform: rotate(22deg) translateX(55px);
	top: -28px;
	z-index: 1;
}

.mouth .underLip {
	border: 4px solid black;
	background: rgb(161, 28, 28);
	height: 600px;
	width: 166px;
	border-radius: 150px / 500px;
	position: absolute;
	left: 50%;
	right: 50%;
	margin-left: -83px;
	bottom: 0;
	overflow: hidden;
}

.mouth .underLip > .tongue {
	border: 2px solid rgb(67, 39, 0);
	height: 700px;
	width: 280px;
	border-radius: 500px / 750px;
	background-color: rgb(253, 72, 72);
	position: absolute;
	left: 50%;
	right: 50%;
	margin-left: -140px;
	top: 405px;
}

.mouth .dot1 {
	border: none;
	height: 10px;
	width: 30px;
	background-color: #ffe600;
	position: absolute;
	z-index: 1;
}
.mouth .dot2 {
	border: none;
	height: 10px;
	width: 30px;
	background-color: #ffe600;
	position: absolute;
	right: 0%;
	z-index: 1;
}

.cheek {
	border: 3px solid rgb(67, 39, 0);
	background-color: #ff0000;
	width: 95px;
	height: 95px;
	border-radius: 50%;
	position: absolute;
	left: 50%;
	right: 50%;
	top: 42.6%;
	margin-left: -44px;
	transform: translateX(-200px);
}

.cheek.left {
	transform: translateX(-190px);
}

.cheek.right {
	transform: translateX(190px);
}
`;

const player = {
	id: undefined,
	time: 90,
	speed: 1,
	ui: {
		demo1: document.querySelector('#demo1'),
		demo2: document.querySelector('#demo2'),
	},
	n: 1,
	events: {
		'#btnPlay': 'play',
		'#btnPause': 'pause',
		'#btnShift': 'shift',
		'#btnCode': 'code',
		'#btnReset': 'reset',
	},
	init: () => {
		player.ui.demo1.innerText = string.substring(0, player.n);
		player.ui.demo2.innerHTML = string.substring(0, player.n);
		player.play();
		player.ui.demo1.style.display = 'block';
		player.bindEvents();
	},
	bindEvents: () => {
		for (let key in player.events) {
			if (player.events.hasOwnProperty(key)) {
				const value = player.events[key];
				document.querySelector(key).onclick = player[value];
			}
		}
	},
	run: () => {
		player.n += 1;
		if (player.n > string.length) {
			window.clearInterval(player.id);
			return;
		}
		player.ui.demo1.innerText = string.substring(0, player.n);
		player.ui.demo2.innerHTML = string.substring(0, player.n);
		player.ui.demo1.scrollTop = player.ui.demo1.scrollHeight;
	},
	play: () => {
		player.id = setInterval(player.run, player.time);
	},
	pause: () => {
		window.clearInterval(player.id);
		return;
	},
	shift: () => {
		player.pause();
		if (player.time > 0) {
			player.speed += 1;
			player.time -= 45;
		} else {
			player.speed = 1;
			player.time = 90;
		}
		btnShift.innerHTML = '变速:' + player.speed + 'x';
		player.play();
	},
	code: () => {
		if (player.ui.demo1.style.display === 'block') {
			player.ui.demo1.style.display = 'none';
			btnCode.innerText = '显示代码';
		} else {
			player.ui.demo1.style.display = 'block';
			btnCode.innerText = '隐藏代码';
		}
	},
	reset: () => {
		location.reload();
	},
};
player.init();
