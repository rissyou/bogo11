// 보고 예술사진관 · 공통 동작
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", function () {
  // 휴대폰 메뉴 열고 닫기
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.querySelector(".menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "CLOSE" : "MENU";
    });
  }

  // 스크롤하면 천천히 나타나기
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // 갤러리 분야별 보기
  var tabs = document.querySelector(".tabs");
  if (tabs) {
    var figs = document.querySelectorAll(".masonry figure");
    var pick = function (v) {
      tabs.querySelectorAll(".tab").forEach(function (t) { t.setAttribute("aria-pressed", t.dataset.v === v ? "true" : "false"); });
      figs.forEach(function (f) { f.hidden = v !== "all" && f.dataset.kind !== v; });
    };
    tabs.addEventListener("click", function (e) {
      var t = e.target.closest(".tab");
      if (t) pick(t.dataset.v);
    });
    var start = (location.hash || "").replace("#", "");
    if (["wedding", "profile", "album"].indexOf(start) > -1) pick(start);
  }

  // 예약·견적 양식: 접수 방법이 정해지기 전이라 보내지 않고 안내만 보여 줌
  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var box = form.querySelector(".form-result");
      box.textContent = "감사합니다. 온라인 접수는 아직 준비 중이라 내용이 전송되지 않았습니다. 전화나 카카오톡으로 문의해 주시면 바로 안내해 드리겠습니다.";
      box.classList.add("show");
      box.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
});
