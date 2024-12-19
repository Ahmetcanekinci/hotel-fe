export default class Nav {
  constructor() {
    this.navigation = null;
    this.firstContent = null;
    this.scrollTop = null;
    this.navigation = document.getElementById('nav');

    this.toggleScrollClasses();
    this.openDiv(".language-button", ".language-dropdown");
    window.addEventListener('scroll', this.onScroll.bind(this), (passiveSupported ? { passive: true } : false));
  }

  onScroll() {
    this.toggleScrollClasses();
  }

  toggleScrollClasses() {
    let scrollTop = window.scrollY;

    if (window.scrollY === undefined) {
      scrollTop = window.pageYOffset;
    }

    if (scrollTop > 0) {
      document.body.classList.add('scrolled');
      setTimeout(() => {
        if (window.scrollY <= 0) {
          return false;
        }
        return document.body.classList.add('nav-active');
      }, 100);
    } else {
      document.body.classList.remove('nav-active');
      document.body.classList.remove('scrolled');
    }
  }

  openDiv(selector, target) {
    var selectors = document.querySelectorAll(selector);

    document.addEventListener('click', function () {
      document.querySelectorAll(target).forEach(t => t.classList.remove('active'));
    });

    selectors.forEach(item => {
      item.addEventListener('click', function (event) {
        event.stopPropagation();

        var matchedTarget = this.querySelector(target);
        if (matchedTarget) {
          matchedTarget.classList.toggle('active');
        }
      });
    });
  }
}
