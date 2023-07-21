const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    // Приводим секунды к формату 00:30:12
    const fullSeconds = ('000000' + seconds).slice(-6)
    // Разбиваем на часы минуты секунды как числа для удобства вычислений
    // Проверка на доступные диапазоны чисел отсутстует, т.к. не оговорено что делать в этом случае
    let [h,m,s] = String(fullSeconds).match(/(\d\d)/g).map(item => Number(item))

    const timer = setInterval(() => {
      // Обновляем таймер, не забывая форматировать нули
      timerEl.textContent = `${('00' + h).slice(-2)}:${('00' + m).slice(-2)}:${('00' + s).slice(-2)}`;

      if(s > 0)
        --s;
      else
        if(m > 0){
          --m;
          s = 59;
        }
        else
          if(h > 0){
            --h;
            m = 59;
            s = 59;
          }
    }, 1000);

    // Удаляем обновление времени когда таймер истёк
    if (h === 0 && m === 0 && s === 0) {
      clearInterval(timer);
    }
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  inputEl.value = inputEl.value.replace(/\D/g, '');
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
