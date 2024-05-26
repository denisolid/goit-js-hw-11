import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const dateTimePickerEl = document.getElementById("datetime-picker");
const startButtonEl = document.querySelector('button[data-start]');
const daysFieldEl = document.querySelector('span[data-days]');
const hoursFieldEl = document.querySelector('span[data-hours]');
const minutesFieldEl = document.querySelector('span[data-minutes]');
const secondsFieldEl = document.querySelector('span[data-seconds]');
let userSelectedDate = null;

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate < new Date()) {
            iziToast.show({
                message: 'Please choose a date in the future',
                color: '#FF0000',
                position: 'topRight',
                timeout: 3000,
                messageColor: "white",
                progressBar: false,
                iconUrl: "https://cdn-icons-png.flaticon.com/128/61/61155.png",
            });
            startButtonEl.disabled = true;
        } else {
            startButtonEl.disabled = false;
        }
    },
};

flatpickr(dateTimePickerEl, options);
startButtonEl.disabled = true;


function updateTimer() {
    const now = new Date();
    const timeLeft = userSelectedDate - now;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        startButtonEl.disabled = false;
        dateTimePickerEl.disabled = false;
        return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    daysFieldEl.textContent = addLeadingZero(days);
    hoursFieldEl.textContent = addLeadingZero(hours);
    minutesFieldEl.textContent = addLeadingZero(minutes);
    secondsFieldEl.textContent = addLeadingZero(seconds);
}
let timerInterval;

startButtonEl.addEventListener('click', () => {
    startButtonEl.disabled = true;
    dateTimePickerEl.disabled = true;
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
});



