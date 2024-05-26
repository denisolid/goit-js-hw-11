import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector('form');
const delayEl = formEl.elements['delay'];
const stateEls = formEl.elements['state'];

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    const delay = parseInt(delayEl.value, 10);
    const state = [...stateEls].find(el => el.checked).value;
    const shouldResolve = state === 'fulfilled';

    makePromise(delay, shouldResolve)
        .then(showSuccessMessage)
        .catch(showErrorMessage);

    formEl.reset();
}

function makePromise(delay, shouldResolve) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            shouldResolve ? resolve(delay) : reject(delay);
        }, delay);
    });
}

function showSuccessMessage(delay) {
    iziToast.success({
        message: `✅ Fulfilled promise in ${delay} ms`,
        position: 'topRight',
        timeout: 3000,
        progressBar: false,
    });
}

function showErrorMessage(delay) {
    iziToast.error({
        message: `❌ Rejected promise in ${delay} ms`,
        position: 'topRight',
        timeout: 3000,
        progressBar: false,
    });
}