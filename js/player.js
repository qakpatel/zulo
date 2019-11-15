//ELEMENT SELECTORS
var player = document.querySelector('.player');
var video = document.querySelector('#video');
var playBtn = document.querySelector('.play-btn');
var volumeBtn = document.querySelector('.volume-btn');
var volumeSlider = document.querySelector('.volume-slider');
var volumeFill = document.querySelector('.volume-filled');
var progressSlider = document.querySelector('.progress');
var progressFill = document.querySelector('.progress-filled');
var textCurrent = document.querySelector('.time-current');
var textTotal = document.querySelector('.time-total');
var speedBtns = document.querySelectorAll('.speed-item');
var fullscreenBtn =document.querySelector('.fullscreen'); 
var volume = document.querySelector('.volume');
var subtitle = document.querySelector('.subtitle');
var backButton = document.querySelector('.back-button');
var informationButton = document.querySelector('.information')
var movieInformation = document.querySelector('.movie-information')
var backward = document.querySelector('.backward');
var forward = document.querySelector('.forward');

//GLOBAL VARS
let lastVolume = 1;
let isMouseDown = false;

//PLAYER FUNCTIONS
function videoInformationTag(){
	var videoPosition = video.getBoundingClientRect();
	if(videoPosition.width>=600 && videoPosition.width==700){
		var information = document.querySelector('.information');
		information.style.width = '15%';
		information.style.right = '13%';
		var information = document.querySelector('.add-to-list');
		information.style.width = '18%';
		volume.style.paddingRight = '17px';
		subtitle.style.paddingRight = '10px';
		fullscreenBtn.style.paddingRight = '0px';
		
	}else{
		var information = document.querySelector('.information');
		information.style.width = '7.7%';
		information.style.right = '10%';
		var information = document.querySelector('.add-to-list');
		information.style.width = '10%';
		volume.style.paddingRight = '30px';
		subtitle.style.paddingRight = '50px';
		fullscreenBtn.style.paddingRight = '10px';
	}
	

}
videoInformationTag();
hideInformation();
function togglePlay() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();	
	}
	playBtn.classList.toggle('paused');
}
function togglePlayBtn() {
	playBtn.classList.toggle('playing');
}

function toggleMute() {
	if(video.volume) {
		lastVolume = video.volume;
		video.volume = 0;
		volumeBtn.classList.add('muted');
		volumeFill.style.width = 0;
	} else {
		video.volume = lastVolume;
		volumeBtn.classList.remove('muted');
		volumeFill.style.width = `${lastVolume*100}%`;
	}
}
function changeVolume(e) {
		volumeBtn.classList.remove('muted');
		let volume = e.offsetX/volumeSlider.offsetWidth;
		volume<0.1 ? volume = 0 : volume=volume; 
		volumeFill.style.width = `${volume*100}%`;
		video.volume = volume;
		if (volume > 0.7) {
			volumeBtn.classList.add('loud');
		} else if (volume < 0.7 && volume > 0) {
			volumeBtn.classList.remove('loud');
		} else if (volume == 0) {
			volumeBtn.classList.add('muted');
		}
		lastVolume = volume;
}
function neatTime(time) {
  var hours = Math.floor((time % 86400)/3600)
  var minutes = Math.floor((time % 3600)/60);
  var seconds = Math.floor(time % 60);
	seconds = seconds>9?seconds:`0${seconds}`;
	return hours==0?`${minutes}:${seconds}`:`${hours}:${minutes}:${seconds}`;
}
function updateProgress(e) {
	progressFill.style.width = `${video.currentTime/video.duration*100}%`;
	textCurrent.innerHTML = `${neatTime(video.currentTime)}`;
	 textTotal.innerHTML = `${neatTime(video.duration)}`;
}
function setProgress(e) {
	const newTime = e.offsetX/progressSlider.offsetWidth;
	progressFill.style.width = `${newTime*100}%`;
	video.currentTime = newTime*video.duration;
}
function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
var fullscreen = false;
function toggleFullscreen() {
	fullscreen? exitFullscreen() : launchIntoFullscreen(player)
	fullscreen = !fullscreen;
	setTimeout(()=>{
		videoInformationTag();
	},100)
	
}
function setSpeed(e) {
	console.log(parseFloat(this.dataset.speed));
	video.playbackRate = this.dataset.speed;
	speedBtns.forEach(speedBtn =>	speedBtn.classList.remove('active'));
	this.classList.add('active');
}
function handleKeypress(e) {
	switch (e.key) {
		case " ":
			togglePlay();
		case "ArrowRight":
			video.currentTime += 5;
		case "ArrowLeft":
			video.currentTime -= 5;
		default:
			return;
	}
}
function showInformation(){
  movieInformation.classList.remove('hide');
  video.pause();	
}
function hideInformation(){
	movieInformation.classList.add('hide');
	video.play();	
}

function backwardFunc(){
	video.currentTime -= 10;
}
function forwardfunc(){
	video.currentTime += 10;
}
//EVENT LISTENERS
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', togglePlayBtn);
video.addEventListener('pause', togglePlayBtn);
video.addEventListener('ended', togglePlayBtn);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
volumeBtn.addEventListener('click', toggleMute);
window.addEventListener('mousedown', () => isMouseDown = true)
window.addEventListener('mouseup', () => isMouseDown = false)
// volumeSlider.addEventListener('mouseover', changeVolume);
volumeSlider.addEventListener('click', changeVolume);
progressSlider.addEventListener('click', setProgress);
fullscreenBtn.addEventListener('click', toggleFullscreen);
speedBtns.forEach(speedBtn => {
	speedBtn.addEventListener('click', setSpeed);
})
window.addEventListener('keydown', handleKeypress);
backButton.addEventListener('click',hideInformation);
informationButton.addEventListener('click',showInformation);
backward.addEventListener('click',backwardFunc);
forward.addEventListener('click',forwardfunc);