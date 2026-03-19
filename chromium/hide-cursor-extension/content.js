(() => {
  const APPS = [
    {
      name: 'Camera',
      url: 'http://jetson-orin-nano.swordfish-kelvin.ts.net:5000/kiosk',
      matches: [/jetson-orin-nano\.swordfish-kelvin\.ts\.net:5000\/kiosk(?:[/?#]|$)/, /\/kiosk(?:[/?#]|$)/],
    },
    {
      name: 'Home Assistant',
      url: 'http://jetson-orin-nano.swordfish-kelvin.ts.net:8123',
      matches: [/jetson-orin-nano\.swordfish-kelvin\.ts\.net:8123(?:[/?#]|$)/, /homeassistant\.local:8123(?:[/?#]|$)/],
    },
    {
      name: 'Spotify',
      url: 'https://open.spotify.com/',
      matches: [/open\.spotify\.com(?:[/?#]|$)/],
    },
  ];

  const style = document.createElement('style');
  style.textContent = '* { cursor: none !important; }';

  const mount = () => {
    if (!style.parentNode) {
      (document.documentElement || document.body || document).appendChild(style);
    }
  };

  mount();
  document.addEventListener('DOMContentLoaded', mount, { once: true });

  const currentUrl = window.location.href;
  const currentIndex = APPS.findIndex((app) =>
    app.matches.some((pattern) => pattern.test(currentUrl))
  );

  let touchStartX = null;
  let touchStartY = null;
  let touchStartTime = 0;
  let navigating = false;

  const navigateToOffset = (offset) => {
    if (navigating || APPS.length < 2 || currentIndex === -1) {
      return;
    }

    navigating = true;
    const nextIndex = (currentIndex + offset + APPS.length) % APPS.length;
    window.location.assign(APPS[nextIndex].url);
  };

  document.addEventListener(
    'touchstart',
    (event) => {
      if (event.touches.length !== 1) {
        touchStartX = null;
        touchStartY = null;
        return;
      }

      const touch = event.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchStartTime = Date.now();
    },
    { passive: true, capture: true }
  );

  document.addEventListener(
    'touchend',
    (event) => {
      if (touchStartX === null || touchStartY === null || event.changedTouches.length !== 1) {
        return;
      }

      const touch = event.changedTouches[0];
      const dx = touch.clientX - touchStartX;
      const dy = touch.clientY - touchStartY;
      const dt = Date.now() - touchStartTime;

      touchStartX = null;
      touchStartY = null;

      if (dt > 700) {
        return;
      }

      if (Math.abs(dx) < 90 || Math.abs(dx) < Math.abs(dy) * 1.4) {
        return;
      }

      navigateToOffset(dx < 0 ? 1 : -1);
    },
    { passive: true, capture: true }
  );
})();
