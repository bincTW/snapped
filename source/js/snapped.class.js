/*
    snapped
    version 0.1.0
    a minimal native fullpage scroller
    written by thomas weber
    copyright 2022 binaries included
    MIT License
*/
class Snapped {
  paginationClickDelegate(evt) {
    if (!evt.target.classList.contains("snap-pagination-dot")) return;
    if (evt.target.dataset.view) {
      if (!document.querySelectorAll(`.snap-view[data-view="${evt.target.dataset.view}"]`).length) {
        return false;
      }
      document.querySelector(`.snap-view[data-view="${evt.target.dataset.view}"]`).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  setPaginationIndex(viewId) {
    if (this.activeViewId === viewId) {
      return false;
    }

    if (this.activeViewId) {
      document.querySelector(`.snap-pagination-dot[data-view="${this.activeViewId}"]`).classList.remove("active");
    }

    document.querySelector(`.snap-pagination-dot[data-view="${viewId}"]`).classList.add("active");

    this.activeViewId = viewId;
  }

  createPagination() {
    let views = document.querySelectorAll(".snap-view");
    const numberOfDots = views.length;
    if (numberOfDots < 1) {
      return false;
    }

    const div = document.createElement("div");
    div.classList.add("snap-pagination");
    if (document.querySelector(".snap-container").classList.contains("horizontal")) {
      div.classList.add("horizontal");
    }

    for (let i = 0; i < numberOfDots; i++) {
      const dot = document.createElement("div");
      dot.classList.add("snap-pagination-dot");
      dot.dataset.view = views[i].dataset.view;
      div.append(dot);
    }

    div.addEventListener("click", evt => this.paginationClickDelegate(evt));
    document.querySelector("body").append(div);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.dataset.visible = "yes";
          this.setPaginationIndex(entry.target.dataset.view);


        } else {
          entry.target.dataset.visible = "no";

        }
      });


    }, {
      threshold: 0.7
    });

    views.forEach((v) => {
      observer.observe(v);
    });

    views = null;
  }

  initAnimationObserver() {
    let views = document.querySelectorAll("*[data-animation]");
    if (!views.length) return false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add(entry.target.dataset.animation);
        } else {
          entry.target.classList.remove(entry.target.dataset.animation);

        }
      });


    }, {
      threshold: 0.5
    });

    views.forEach((v) => {
      observer.observe(v);
    });

    views = null;
  }

  createUI() {
    if (this.showPagination) {
      this.createPagination();
    }
    if (this.triggerAnimations) {
      this.initAnimationObserver();
    }
  }

  constructor(param = null) {
    this.activeViewId = null;
    this.showPagination = (param && param.showPagination);
    this.triggerAnimations = (param && param.triggerAnimations);
    this.createUI();
  }
}

export {
  Snapped
}
