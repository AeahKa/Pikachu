const string = `
* {
	background-color: #ffe600;
}
#border1 {
	width: 100vh;
	height: 345px;
	left: 50%;
	right: 50%;
	top: 30vh;
	margin-left: -50vh;
	position: fixed;
	background: #ffe600;
}
.face {
	width: 500px;
	height: 350px;
	left: 50%;
	right: 50%;
	margin-left: -250px;
	position: relative;
	background: #ffe600;
}
.nose {
	border: 14px solid transparent;
	border-top-color: #000;
	width: 0%;
	border-radius: 50%;
	transform: scaleX(1.2);
	position: relative;
	left: 50%;
	right: 50%;
	margin-left: -14px;
	top: 40px;
}
@keyframes wave {
	0% {
		transform: rotate(5deg);
	}
	25% {
		transform: rotate(0deg);
	}
	50% {
		transform: rotate(-5deg);
	}
	75% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(5deg);
	}
}
.nose:hover {
	animation: wave 100ms infinite linear;
}
.eye {
	border: 4px solid #000;
	background-color: #2e2e2e;
	width: 70px;
	height: 70px;
	border-radius: 50%;
	position: absolute;
	left: 50%;
	right: 50%;
	top: 0;
	margin-left: -30px;
}
.eye::before {
	content: '';
	display: block;
	width: 25px;
	height: 25px;
	background-color: #ffff;
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

#border2 {
	height: 218px;
	width: 210px;
	position: relative;
	left: 50%;
	right: 50%;
	margin-left: -105px;
	top: 60px;
}
.mouth {
	height: 218px;
	width: 210px;
	position: relative;
	left: 50%;
	right: 50%;
	margin-left: -105px;
	overflow: hidden;
	top: -1px;
}

.mouth .upperLip .left {
	border: 4px solid #000;
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
	border: 4px solid #000;
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

#border3 {
	height: 610px;
	width: 168px;
	position: relative;
	left: 50%;
	right: 50%;
	margin-left: -84px;
	bottom: 385px;
}
.underLip {
	border: 4px solid #000;
	background: #a11c1c;
	height: 600px;
	width: 168px;
	bottom: 385px;
	border-radius: 150px / 500px;
	position: relative;
	left: 50%;
	right: 50%;
	margin-left: -84px;
	overflow: hidden;
}
.tongue {
	border: 2px solid rgb(67, 39, 0);
	height: 700px;
	width: 280px;
	border-radius: 500px / 750px;
	background-color: #fd4848;
	position: relative;
	left: 50%;
	right: 50%;
	margin-left: -140px;
	top: 404px;
}

.mouth .dot1 {
	height: 12px;
	width: 35px;
	background-color: #ffe600;
	position: absolute;
	z-index: 2;
}
.mouth .dot2 {
	height: 12px;
	width: 35px;
	background-color: #ffe600;
	position: absolute;
	right: 0%;
	z-index: 2;
}
.cheek {
	border: 3px solid #432700;
	background-color: #ff0000;
	width: 98px;
	height: 95px;
	border-radius: 50%;
	position: absolute;
	left: 50%;
	right: 50%;
	top: 100px;
	margin-left: -49px;
	transform: translateX(-200px);
	z-index: 2;
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
		code: document.querySelector('#code'),
		demo: document.querySelector('#demo'),
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
		player.ui.code.innerText = string.substring(0, player.n);
		player.ui.demo.innerHTML = string.substring(0, player.n);
		player.play();
		player.ui.code.style.display = 'block';
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
		player.ui.code.innerText = string.substring(0, player.n);
		player.ui.demo.innerHTML = string.substring(0, player.n);
		player.ui.code.scrollTop = player.ui.code.scrollHeight;
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
		if (player.ui.code.style.display === 'block') {
			player.ui.code.style.display = 'none';
			btnCode.innerText = '显示代码';
		} else {
			player.ui.code.style.display = 'block';
			btnCode.innerText = '隐藏代码';
		}
	},
	reset: () => {
		location.reload();
	},
};
player.init();
let maxWidth = window.screen.width;
if (maxWidth <= 500) {
	const x = maxWidth / 500;
	document.querySelector('#border1').style.transform = `scale(${x})`;
	document.querySelector('#border1').style.top = '40vh';
	document.querySelector('#code').style.height = '40vh';
}
