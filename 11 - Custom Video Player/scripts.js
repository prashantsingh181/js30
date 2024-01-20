// Getting Elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullScreenButton = player.querySelector(".full-screen");

// functions
function togglePlay() {
  video.paused ? video.play() : video.pause();
}
function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}
function skip() {
  const timeSkip = this.dataset.skip;
  video.currentTime += parseFloat(timeSkip);
}
function handleRangeUpdate(event) {
  video[event.target.name] = event.target.value;
}
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
function fullscreen() {
  if (!isFullScreen) {
    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.mozRequestFullScreen) {
      /* Firefox */
      player.mozRequestFullScreen();
    } else if (player.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      player.webkitRequestFullscreen();
    } else if (player.msRequestFullscreen) {
      /* IE/Edge */
      player.msRequestFullscreen();
    }
    isFullScreen = true;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari & Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
    isFullScreen = false;
  }
}
// Hook up event Listeners
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
skipButtons.forEach(function (skipButton) {
  skipButton.addEventListener("click", skip);
});
ranges.forEach(function (range) {
  range.addEventListener("change", handleRangeUpdate);
});
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => {
  mousedown = true;
});
progress.addEventListener("mouseup", () => {
  mousedown = false;
});
let isFullScreen = false;
fullScreenButton.addEventListener("click", fullscreen);
