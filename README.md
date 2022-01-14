# Custom select by Roven
### Install
- Download files from [`deploy`](https://github.com/VladRoven/Roven-Select/tree/main/deploy) folder;
- Import `roven_select_min.js` and `roven_select_min.css` to your project.

### Work
First, create an instance of the `RovenSelect` class.
```javascript
new RovenSelect(select, fixed = false, width = null);
```
The constructor takes the following parameters:
- `select` - Custom select (`instanceof Element`);
- `fixed` - Flag indicating that the size of the select is fixed (Default `false`);
- `width` - If the select is fixed, specify a fixed width. If the width is less than the initial width of the placeholder or not specified at all, then the initial width of the placeholder will be set (Default `null`).

You can register a listener in two ways:
- With `onselect` parameter (`element instanceof RovenSelect`)
```javascript
element.onselect = function() {};
```
- With `addEventListener`
```javascript
document.querySelector('.roven--select').addEventListener('select', function() {});
```

### HTML code RovenSelect
```HTML
<div class="roven--select">
    <div class="roven--select_title">
        <p>Your placholder</p>
        <p id="roven--select_current"></p>
        <div class="roven--select_arrow">
            <div class="roven--select_arrow_line"></div>
            <div class="roven--select_arrow_line"></div>
        </div>
    </div>
    <ul class="roven--select_list">
        <li data-value="Your value">Item 1</li>
        <li data-value="Your value">Item 2</li>
        <li data-value="Your value">Item 3</li>
        <!-- And more -->
    </ul>
</div>
```

### Example
> Example on [`codeopen`](https://codepen.io/vladroven/pen/VwMqobZ).