class RovenSelect {
    #ev;
    #select;
    #arrow;
    #title;
    #list;
    #selected;
    #fixed;

    onselect = null;
    value = null;
    current = null;

    constructor(select, fixed = false, width = null) {
        if (!(select instanceof Element) || !select) throw new TypeError('Value must be a document element');
        if (!fixed && width) throw new SyntaxError('Width cannot be set if select is not fixed');
        this.#select = select;
        this.#arrow = select.querySelector('.roven--select_arrow');
        this.#title = select.querySelector('.roven--select_title');
        this.#list = select.querySelector('.roven--select_list');
        this.#selected = select.querySelector('#roven--select_current');
        this.#fixed = fixed;

        this.#ev = new CustomEvent('select', {
            bubbles: true,
            cancelable: true
        });

        this.#title.style.height = this.#title.offsetHeight + 'px';
        if (fixed) this.#title.style.width = (width < this.#title.offsetWidth ? this.#title.offsetWidth : width) + 'px';
        this.#title.onclick = () => {
            this.#arrow.classList.toggle('roven--select_show');
            this.#toogleList();

            Array.from(this.#list.children).forEach(el => {
                el.onclick = () => {
                    this.#click(el);
                }
            })

        }
    }

    #click(el) {
        if (this.current == el) {
            el.removeEventListener('click', this.#click);
            return;
        };
        if (this.current) this.current.classList.toggle('roven--select_selected')
        this.current = el;
        this.#selected.classList.toggle('roven--select_hidden');
        this.#title.children[0].style = 'transform: translate(-8px,-' + (this.#title.offsetHeight / 2) + 'px); font-size: 12px; color: #00B53E; background: #FFF; padding: 0 8px; border-radius: 100px 100px 0 0;';
        this.#arrow.style = 'margin-left: 4px;';
        this.#arrow.classList.toggle('roven--select_show');
        this.#toogleList();
        el.classList.toggle('roven--select_selected')
        setTimeout(() => { 
            this.#selected.innerHTML = el.innerHTML; 
            if (!this.#fixed)
                this.#title.style = 'min-width: ' + 
                (
                    this.#selected.offsetWidth + 
                    this.#arrow.offsetWidth + 
                    15 + 
                    parseInt(window.getComputedStyle(this.#title).paddingLeft) + 
                    parseInt(window.getComputedStyle(this.#title).paddingRight) + 
                    parseInt(window.getComputedStyle(this.#title).borderWidth)
                ) + 'px; height: ' + parseInt(window.getComputedStyle(this.#title).height) + 'px';
            else {
                this.#selected.classList.add('roven--select_curent_fixed');
                this.#selected.style = 'overflow: hidden; width: ' +
                    (this.#title.clientWidth - (
                    parseInt(window.getComputedStyle(this.#title).paddingRight) +
                    parseInt(window.getComputedStyle(this.#title).paddingLeft) +
                    this.#arrow.offsetWidth + 15)) + 'px';
            }
            this.#selected.classList.toggle('roven--select_hidden') 
        }, 200)
        
        this.value = el.dataset.value;
        this.#select.dispatchEvent(this.#ev);

        if (this.onselect) this.onselect.call(this.#select, 'select');

        el.removeEventListener('click', this.#click);
    }

    #toogleList() {
        this.#list.classList.toggle('roven--select_show_list');
        let height = 15;

        if (this.#list.classList.contains('roven--select_show_list')) {
            Array.from(this.#list.children).forEach(el => {
                height += el.offsetHeight;
            })
            this.#list.style.paddingTop = '15px';
            this.#list.style.height = height + 'px';
        }
        else {
            this.#list.style.paddingTop = '0';
            this.#list.style.height = '0';
        }
    }
}
