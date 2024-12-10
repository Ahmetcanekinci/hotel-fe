export default class ContentAnimations {
  constructor(delegate = null, hasAnimateBack = false) {
    this.contents = null;
    this.innerWindowHeight = 0;
    this.firstContentPos = 0;
    this.activeContentIndex = -1;
    this.limits = [];
    this.hasAnimateBack = false;
    this.delegate = null;
    this.zoom = 1;

    this.contents = Array.prototype.slice.call(document.body.querySelectorAll('section, div#footer'));
    this.delegate = delegate;
    this.hasAnimateBack = hasAnimateBack;
    this.getLimits();
    window.addEventListener('resize', this.getLimits.bind(this));
    window.addEventListener('scroll', this.checkScroll.bind(this),(passiveSupported ? { passive: true } : false));
    setTimeout(this.onLoad.bind(this), 700);
  }

  getLimits() {
    this.limits = [];

    
    this.zoom = this.getZoom();

    for ( let content of this.contents ) {

      let top = content.offsetTop;

      if ( this.zoom < 1 ) {
          top = top * this.zoom;
      }

      this.limits.push(top);
    }

  }

  getZoom () {
  
      let zoomStyle = parseFloat(window.getComputedStyle(document.body).zoom);
      return zoomStyle;
  
  }

  onLoad() {
    this.innerWindowHeight = window.innerHeight;
    this.firstContentPos = this.contents[0].offsetTop;

    if (this.innerWindowHeight > this.firstContentPos) {
      this.activeContentIndex += 1;
      this.animateOnLoad();
    }

    this.checkScroll();

    const onStartItems = document.body.querySelectorAll('[data-on-animate-start="true"]');
    const items = Array.prototype.slice.call(onStartItems);

    for (const item of items) {
      item.setAttribute('data-animated', true);
    }
  }

  checkScroll() {
    let scrollTop = window.scrollY;

    if ( scrollTop === undefined ) {
        scrollTop = window.pageYOffset;
    }

    if ( (scrollTop + 100) >= (document.body.clientHeight - window.innerHeight) ) {
        scrollTop = document.body.clientHeight - window.innerHeight + 1000;
    }

    for ( let i = 0; i < this.limits.length; i++ ) {

        let limit = this.limits[i];
        let pos = (scrollTop + ((this.innerWindowHeight / 8) * 7.5));

        if ( pos >= limit ) {

            this.activeContentIndex = i;
            this.animateContent();
            
        }


    }

    if ( this.hasAnimateBack ) {
        
        this.animateBackContents();

    }
  }

  animateOnLoad() {
    
    for ( let i = 0; i <= this.activeContentIndex; i++ ) {
      this.activeContentIndex = i;
      this.animateContent();
    }

  }

  animateContent() {
    
    if ( this.contents[this.activeContentIndex].hasAttribute('data-animated') ) {
      this.contents[this.activeContentIndex].setAttribute('data-animated', true);
  }


  let items = this.contents[this.activeContentIndex].querySelectorAll('[data-animated="false"]');
  let itemsArr = Array.prototype.slice.call(items);

  for ( let item of itemsArr ) {
      item.setAttribute('data-animated', true);

      if ( item.hasAttribute('data-count') ) {
          new Counter(item.parentNode);
      }

      let callback = item.getAttribute('data-animate-callback');
      if ( item.getAttribute('data-animate-callback') ) {
          this.runCallback(item, callback);
      }
  }

  this.getLimits();

  }

  runCallback(item, callback) {
    if (typeof window[callback] === 'function') {
      new window[callback](item);
    }
  }

  animateBackContents() {

    for ( let i = 0; i < this.limits.length; i++ ) {

        if ( i > this.activeContentIndex ) {
            this.animateBack(i);
        }

    }

}

animateBack ( index ) {

  if ( this.contents[index].hasAttribute('data-animated') ) {
      this.contents[index].setAttribute('data-animated', false);
  }

  let items = this.contents[index].querySelectorAll('[data-animated="true"]');
  let itemsArr = Array.prototype.slice.call(items);

  for ( let item of itemsArr ) {
      let onStart = item.getAttribute('data-on-animate-start');
      if ( onStart !== 'true' ) {
          item.setAttribute('data-animated', false);
      }
  }

  this.getLimits();

}

}
