![snapped](https://user-images.githubusercontent.com/28933274/189217580-b2c8b2bf-6b7a-4ed3-a143-0538d0e8915d.png)

# snapped
A minimal native fullpage scroller for modern browsers
Version 0.1.0

- Uses CSS scrollsnap and JS IntersectionObserver
- Vertical or horizontal full page scrolling
- Pagination navigation (optional)
- Trigger CSS animations (optional)


### HTML Markup

Add `.snap-container` class to your container element. 
Add `.snap-view` class to your slides container.

Add a `data-view` attribute with an *anchor name* to each slide container if you enabled the pagination. 

Sample Markup:
```html
<main class="snap-container">
    <section class="snap-view" data-view="one">It all</section>
    <section class="snap-view" data-view="two"><div data-animation="puffIn">comes</div></section>
    <section class="snap-view" data-view="three">to</section>
    <section class="snap-view" data-view="four"><div>an <span data-animation="spin">e</span>nd</div></section>
</main>
```

### CSS
Attach *snapped.min.css* to your document. 
`<link rel="stylesheet" href="_your_path_to_/snapped.min.css">`
Note: Pagination color defaults to white. To change, resize or reposition overwrite these classes in your css:
```css
.snap-pagination-dot {
  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.35);
  background-blend-mode: multiply;
  border-radius: 50%;
  cursor: pointer;
}
.snap-pagination-dot:not(.active):hover {
  background-color: rgba(255, 255, 255, 0.45);
}
.snap-pagination-dot.active {
  background-color: rgba(255, 255, 255, 0.95);
}
```


### JS
Import and initialize *Snapped* class for pagination and animation triggers.

```js
new Snapped({
        showPagination: true, // show pagination dots
        triggerAnimations: true // only required if you want CSS classes automatically applied to visible slide child elements
});
```


Check out [Examples](snapped/tree/master/examles) for more details.
