"use strict";

const targetDate = new Date(2023, 5, 12);

const getTimeSegmentElements = function (segmentElement) {
  const segmentDisplay = segmentElement.querySelector(".segment__display");
  const segmentDisplayTop = segmentDisplay.querySelector(
    ".segment__display--top"
  );
  const segmentDisplayBottom = segmentDisplay.querySelector(
    ".segment__display--bottom"
  );
  const segmentOverlay = segmentDisplay.querySelector(".segment__overlay");
  const segmentOverlayTop = segmentOverlay.querySelector(
    ".segment__overlay--top"
  );
  const segmentOverlayBottom = segmentOverlay.querySelector(
    ".segment__overlay--bottom"
  );

  return {
    segmentDisplayTop,
    segmentDisplayBottom,
    segmentOverlay,
    segmentOverlayTop,
    segmentOverlayBottom,
  };
};

const updateSegmentValues = function (displayElement, overlayElement) {
  displayElement.textContent = value;
  overlayElement.textContent = value;
};

const updateTimeSegment = function (segmentElement, timeValue) {
  const segmentElements = getTimeSegmentElements(segmentElement);

  segmentElements.segmentOverlay.classList.add("flip");

  updateSegmentValues(
    segmentElements.segmentDisplayTop,
    segmentElements.segmentOverlayBottom,
    timeValue
  );

  const finishAnimation = function () {
    segmentElements.segmentOverlay.classList.remove("flip");
    updateSegmentValues(
      segmentElements.segmentDisplayBottom,
      segmentElements.segmentOverlayTop,
      timeValue
    );

    this.removeEventListener("animationend", finishAnimation);
  };

  segmentElements.segmentOverlay.addEventListener(
    "animationend",
    finishAnimation
  );
};

const updateTimeSection = function (sectionID, timeValue) {
  const firstNumber = Math.floor(timeValue / 10);
  const secondNumber = timeValue % 10;

  const sectionElement = document.getElementById(sectionID);
  const timeSegments = sectionElement.querySelectorAll(".time__segment");

  updateTimeSegment(timeSegments[0], firstNumber);
  updateTimeSegment(timeSegments[1], secondNumber);
};

const getTimeRemaining = function (targetDateTime) {
  const nowTime = Date.now();
  const secondsRemaining = Math.floor((targetDateTime - nowTime) / 1000);
  // const days = Math.floor(secondsRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(secondsRemaining / 60 / 60);
  const minutes = Math.floor(secondsRemaining / 60 - hours * 60);
  const seconds = Math.floor(secondsRemaining % 60);

  return {
    seconds,
    minutes,
    hours,
    // days,
  };
};

const updateAllSegments = function () {
  const targetTimeStamp = new Date(targetDate).getTime();
  const timeRemainingBits = getTimeRemaining(targetTimeStamp);

  updateTimeSection("seconds", timeRemainingBits.seconds);
  updateTimeSection("minutes", timeRemainingBits.minutes);
  updateTimeSection("hours", timeRemainingBits.hours);
  updateTimeSection("seconds", timeRemainingBits.days);
};
const countdownTimer = setInterval(() => {
  updateAllSegments;
}, 1000);

updateAllSegments();

// const daysCountdown = document.querySelector(".countdown__number--days");
// const hoursCountdown = document.querySelector(".countdown__number--hours");
// const minuteCountdown = document.querySelector(".countdown__number--minutes");
// const secondsCountdown = document.querySelector(".countdown__number--seconds");

// const countdownDate = new Date(2023, 5, 12).getTime();

// const updateCountdown = function () {
//   const now = new Date().getTime();
//   const timeRemaining = countdownDate - now;

//   const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
//   const hours = Math.floor(
//     (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//   );
//   const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

//   daysCountdown.textContent = `${days}`.padStart(2, 0);
//   hoursCountdown.textContent = `${hours}`.padStart(2, 0);
//   minuteCountdown.textContent = `${minutes}`.padStart(2, 0);
//   secondsCountdown.textContent = `${seconds}`.padStart(2, 0);
// };

// setInterval(updateCountdown, 1000);
