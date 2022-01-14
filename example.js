const selects = document.querySelectorAll('.roven--select');

const selectFirst = new RovenSelect(selects[0], true, 200);
const selectSec = new RovenSelect(selects[1]);

selectFirst.onselect = () => {
    console.log(selectFirst.value);
    console.log(selectFirst.current);
}

selects[1].addEventListener('select', () => {
    console.log(selectSec.value);
    console.log(selectSec.current);
});