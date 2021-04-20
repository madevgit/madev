window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.counter').forEach(counter => {
      let percent = counter.getAttribute('percent')
      let dashoffset = 163
      counter.firstElementChild.nextElementSibling.animate([
        { strokeDashoffset: dashoffset },
        { strokeDashoffset: `${dashoffset - (percent * dashoffset / 100)}` }
      ], {
        duration: 2000,
        fill: 'forwards',
        easing: 'ease'
      })
    })
  }, 1500);
});