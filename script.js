"use strict";

const daysCountdown = document.querySelector(".countdown__number--days");
const hoursCountdown = document.querySelector(".countdown__number--hours");
const minuteCountdown = document.querySelector(".countdown__number--minutes");
const secondsCountdown = document.querySelector(".countdown__number--seconds");
const submitButton = document.querySelector(".button");
const resetButton = document.querySelector(".reset");
const inputField = document.querySelector(".input");
const yearInput = document.getElementById("year");
const monthInput = document.getElementById("month");
const dayInput = document.getElementById("day");
const yearError = document.querySelector(".year__error");
const monthError = document.querySelector(".month__error");
const dayError = document.querySelector(".day__error");
const error = document.querySelector(".error");
const inputs = document.querySelectorAll("input");

dayInput.addEventListener("input", function () {
  dayInput.value = dayInput.value.replace(/[^0-9]/g, "");
});

monthInput.addEventListener("input", function () {
  const month = monthInput.value;
  monthInput.value = month.replace(/[^0-9]/g, "");
});
yearInput.addEventListener("input", function () {
  const year = yearInput.value;

  yearInput.value = year.replace(/[^0-9]/g, "");
});

let updateCountdown;

const getLaunchDate = function () {
  clearInterval(updateCountdown);

  const now = new Date();

  // this is the day input
  const day = dayInput.value;
  dayInput.value = dayInput.value.replace(/[^0-9]/g, "");

  if (day === "" || dayInput.value !== day) {
    dayError.style.display = "block";
    dayInput.style.border = "2px solid #ff5252";
    // return false;
  } else if (day < 1 || day > 31 || day === 0) {
    dayError.style.display = "block";
    dayInput.style.border = "2px solid #ff5252";
    return false;
  } else {
    dayError.style.display = "none";
    dayInput.style.border = "initial";
  }

  // this is for the month input
  const month = monthInput.value;
  monthInput.value = month.replace(/[^0-9]/g, "");
  const nowMonth = now.getMonth();
  if (month === "") {
    monthError.style.display = "block";
    monthInput.style.border = "2px solid #ff5252";
    // return false;
  } else if (month < 1 || month > 12) {
    monthError.style.display = "block";
    monthInput.style.border = "2px solid #ff5252";
    return false;
  } else if (month < nowMonth) {
    monthError.style.display = "block";
    monthInput.style.border = "2px solid #ff5252";
    return false;
  } else {
    monthError.style.display = "none";
    monthInput.style.border = "initial";
  }

  // this is for the year input
  const year = yearInput.value;
  yearInput.value = year.replace(/[^0-9]/g, "");

  // const now = new Date();
  const nowYear = now.getFullYear();
  if (year === "") {
    yearError.style.display = "block";
    yearInput.style.border = "2px solid #ff5252";
    return false;
  } else if (year < nowYear) {
    yearError.style.display = "block";
    yearInput.style.border = "2px solid #ff5252";
    return false;
  } else if (year.length !== 4) {
    yearError.style.display = "block";
    yearInput.style.border = "2px solid #ff5252";
    return false;
  } else {
    yearError.style.display = "none";
    yearInput.style.border = "initial";
  }

  updateCountdown = setInterval(() => {
    const countdownDate = new Date(year, month - 1, day).getTime();
    const present = new Date().getTime();
    const timeRemaining = countdownDate - present;
    if (countdownDate < present) {
      error.style.display = "block";
      return false;
    } else {
      error.style.display = "none";
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) {
      dayError.style.display = "block";
      return false;
    } else {
      dayError.style.display = "none";
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    daysCountdown.textContent = `${days}`.padStart(2, 0);
    hoursCountdown.textContent = `${hours}`.padStart(2, 0);
    minuteCountdown.textContent = `${minutes}`.padStart(2, 0);
    secondsCountdown.textContent = `${seconds}`.padStart(2, 0);
  }, 1000);
};
submitButton.addEventListener("click", getLaunchDate);

const resetCountdown = function () {
  clearInterval(updateCountdown);
  // Reset all input fields to their default values
  dayInput.value = "";
  monthInput.value = "";
  yearInput.value = "";

  // Hide all error messages and reset borders
  dayError.style.display = "none";
  dayInput.style.border = "initial";
  monthError.style.display = "none";
  monthInput.style.border = "initial";
  yearError.style.display = "none";
  yearInput.style.border = "initial";
  error.style.display = "none";

  // Enable all input fields
  inputs.forEach((input) => {
    input.disabled = false;
  });

  // Reset countdown values
  daysCountdown.textContent = "00";
  hoursCountdown.textContent = "00";
  minuteCountdown.textContent = "00";
  secondsCountdown.textContent = "00";
};

resetButton.addEventListener("click", resetCountdown);
