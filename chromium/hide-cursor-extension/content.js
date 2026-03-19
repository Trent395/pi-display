(() => {
  const style = document.createElement('style');
  style.textContent = '* { cursor: none !important; }';

  const mount = () => {
    if (!style.parentNode) {
      (document.documentElement || document.body || document).appendChild(style);
    }
  };

  mount();
  document.addEventListener('DOMContentLoaded', mount, { once: true });
})();
