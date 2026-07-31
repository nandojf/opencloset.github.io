(function () {
  var KEY = 'openclosetLang';

  function pick() {
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    if (saved === 'pt' || saved === 'en') return saved;
    var nav = (navigator.language || 'pt').toLowerCase();
    return nav.indexOf('pt') === 0 ? 'pt' : 'en';
  }

  function apply(lang) {
    var sections = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < sections.length; i++) {
      sections[i].classList.toggle('is-active', sections[i].getAttribute('data-lang') === lang);
    }
    var buttons = document.querySelectorAll('.langswitch button');
    for (var j = 0; j < buttons.length; j++) {
      buttons[j].setAttribute('aria-pressed', String(buttons[j].getAttribute('data-set') === lang));
    }
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(pick());
    var buttons = document.querySelectorAll('.langswitch button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        apply(this.getAttribute('data-set'));
      });
    }
  });
})();
