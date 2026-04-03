document.addEventListener('DOMContentLoaded', function () {

  var track = document.getElementById('cardTrack');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinksAll = document.querySelectorAll('.nav__links a');

  navLinksAll.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  if (track && prevBtn && nextBtn) {
    var cards = Array.from(track.children);
    var totalCards = cards.length;

    function getVisibleCount() {
      return window.innerWidth >= 768 ? 4 : 2;
    }

    var currentIndex = 0;

    function updateTrack() {
      var visible = getVisibleCount();

      cards.forEach(function (card) {
        card.style.display = 'none';
      });

      for (var i = 0; i < visible; i++) {
        var index = (currentIndex + i) % totalCards;
        cards[index].style.display = '';
      }
    }

    nextBtn.addEventListener('click', function () {
      currentIndex = (currentIndex + 1) % totalCards;
      updateTrack();
    });

    prevBtn.addEventListener('click', function () {
      currentIndex = (currentIndex - 1 + totalCards) % totalCards;
      updateTrack();
    });

    updateTrack();

    window.addEventListener('resize', updateTrack);
  }

  var header = document.querySelector('.header');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(10, 10, 10, 0.98)';
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.4)';
    } else {
      header.style.background = 'rgba(10, 10, 10, 0.95)';
      header.style.boxShadow = 'none';
    }
  });

  var filterBtns = document.querySelectorAll('.series-filter__btn');
  var seriesCards = document.querySelectorAll('.series-grid .card');

  if (filterBtns.length > 0 && seriesCards.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = this.getAttribute('data-filter');

        filterBtns.forEach(function (b) {
          b.classList.remove('series-filter__btn--active');
        });
        this.classList.add('series-filter__btn--active');

        seriesCards.forEach(function (card) {
          var timeline = card.getAttribute('data-timeline');
          if (filter === 'all' || timeline === filter) {
            card.style.display = '';
            card.style.animation = 'none';
            card.offsetHeight;
            card.style.animation = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  var revealElements = document.querySelectorAll('.timeline-card, .spotlight__card');
  
  if (revealElements.length > 0) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(function (el) {
      el.classList.add('reveal-on-scroll');
      revealObserver.observe(el);
    });
  }

});
