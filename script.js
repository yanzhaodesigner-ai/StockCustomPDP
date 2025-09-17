// Interactivity for gallery, accordions, carousels, and buybox
(function(){
  function selectSlide(index){
    var rail=document.querySelector(".gallery .rail");
    if(!rail) return;
    var imgs=[].slice.call(rail.querySelectorAll("img"));
    var thumbs=[].slice.call(document.querySelectorAll(".thumb"));
    var len=imgs.length;
    var i=((index%len)+len)%len;
    rail.scrollTo({left:i*rail.clientWidth,behavior:"smooth"});
    imgs.forEach(function(img,idx){img.classList.toggle("active", idx===i)});
    thumbs.forEach(function(t,idx){t.classList.toggle("active", idx===i)});
    rail.setAttribute("data-active-index", String(i));
  }

  function initGallery(){
    var rail=document.querySelector(".gallery .rail");
    if(!rail) return;
    rail.setAttribute("data-active-index", "0");
    window.addEventListener("resize", function(){
      var current=Number(rail.getAttribute("data-active-index")||"0");
      rail.scrollLeft=current*rail.clientWidth;
    });
    document.querySelectorAll(".thumb").forEach(function(btn){
      btn.addEventListener("click", function(){ selectSlide(Number(btn.getAttribute("data-index")||"0")); });
    });
    document.querySelectorAll(".rail-btn").forEach(function(btn){
      btn.addEventListener("click", function(){
        var dir=Number(btn.getAttribute("data-dir"));
        var current=Number(rail.getAttribute("data-active-index")||"0");
        selectSlide(current+dir);
      });
    });
  }

  function initAccordions(){
    document.querySelectorAll("[data-accordion]").forEach(function(acc){
      acc.querySelectorAll(".accordion-header").forEach(function(h){
        h.addEventListener("click", function(){
          var expanded=h.getAttribute("aria-expanded")=="true";
          h.setAttribute("aria-expanded", String(!expanded));
          var panel=h.nextElementSibling;
          if(panel) panel.classList.toggle("open");
        });
      });
    });
  }

  function initCarousels(){
    document.querySelectorAll("[data-carousel]").forEach(function(w){
      var track=w.querySelector(".c-track");
      var prev=w.querySelector(".c-btn.prev");
      var next=w.querySelector(".c-btn.next");
      if(!track||!prev||!next) return;
      function delta(){ return Math.max(track.clientWidth*0.8, 240); }
      prev.addEventListener("click", function(){ track.scrollBy({left:-delta(),behavior:"smooth"}); });
      next.addEventListener("click", function(){ track.scrollBy({left: delta(),behavior:"smooth"}); });
    });
  }

  function initBuybox(){
    var form=document.getElementById("buybox");
    if(!form) return;
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var fd=new FormData(form);
      var hand=fd.get("hand");
      var loft=fd.get("loft");
      var shaft=fd.get("shaft");
      alert("Added to cart: PARADYM Driver — "+hand+", "+loft+", "+shaft);
    });
  }

  document.addEventListener("DOMContentLoaded", function(){
    initGallery();
    initAccordions();
    initCarousels();
    initBuybox();
  });
})();
