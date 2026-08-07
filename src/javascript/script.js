$(function () {
  var $header = $("#site-header");
  var $nav = $("#nav");
  var $toggle = $("#nav-toggle");

  // Header background on scroll
  function onScroll() {
    $header.toggleClass("scrolled", $(window).scrollTop() > 40);
    setActiveLink();
  }

  // Mobile menu open/close
  function closeMenu() {
    $nav.removeClass("open");
    $toggle.removeClass("open").attr("aria-expanded", "false").attr("aria-label", "Abrir menu");
  }

  $toggle.on("click", function () {
    var isOpen = $nav.toggleClass("open").hasClass("open");
    $toggle.toggleClass("open", isOpen)
      .attr("aria-expanded", String(isOpen))
      .attr("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  // Smooth navigation + close menu on click
  $(".nav-link, .nav-cta-mobile a").on("click", function () {
    closeMenu();
  });

  // Scrollspy: highlight the current section in the nav
  function setActiveLink() {
    var scrollPos = $(window).scrollTop() + 120;
    var current = "";

    $("main section[id]").each(function () {
      var top = $(this).offset().top;
      if (scrollPos >= top) {
        current = $(this).attr("id");
      }
    });

    if (current) {
      $(".nav-link").removeClass("is-active");
      $('.nav-link[href="#' + current + '"]').addClass("is-active");
    }
  }

  $(window).on("scroll", onScroll);
  onScroll();

  // "Add to order" button feedback
  $(".add-btn").on("click", function () {
    var $btn = $(this);
    if ($btn.hasClass("added")) return;
    $btn.addClass("added").html('<i class="fa-solid fa-check" aria-hidden="true"></i>');
    setTimeout(function () {
      $btn.removeClass("added").html('<i class="fa-solid fa-plus" aria-hidden="true"></i>');
    }, 1400);
  });

  // ScrollReveal entrance animations
  $("body").addClass("sr-ready");

  if (typeof ScrollReveal !== "undefined") {
    var sr = ScrollReveal({
      distance: "42px",
      duration: 850,
      easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      opacity: 0,
      reset: false,
    });

    sr.reveal('[data-reveal="up"]', { origin: "bottom" });
    sr.reveal('[data-reveal="left"]', { origin: "left" });
    sr.reveal('[data-reveal="right"]', { origin: "right" });

    $("[data-delay]").each(function () {
      var delay = parseInt($(this).attr("data-delay"), 10) || 0;
      var origin = $(this).attr("data-reveal") || "up";
      sr.reveal(this, { origin: origin === "up" ? "bottom" : origin, delay: delay });
    });
  }
});
