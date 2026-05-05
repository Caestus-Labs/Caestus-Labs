// Caestus Labs — sign-up modal toggle
(function () {
  const modal = document.getElementById('signupModal')
  const opener = document.getElementById('signupOpen')
  if (!modal || !opener) return

  const closers = modal.querySelectorAll('[data-close]')
  let lastFocus = null

  function open() {
    lastFocus = document.activeElement
    modal.hidden = false
    requestAnimationFrame(() => modal.classList.add('open'))
    document.body.classList.add('modal-open')
    const firstInput = modal.querySelector('input,select,button')
    if (firstInput) firstInput.focus()
  }

  function close() {
    modal.classList.remove('open')
    document.body.classList.remove('modal-open')
    setTimeout(() => { modal.hidden = true }, 200)
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus()
  }

  opener.addEventListener('click', open)
  closers.forEach(c => c.addEventListener('click', close))
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) close()
  })

  // Auto-close after a successful submission
  const form = document.getElementById('interestForm')
  const status = document.getElementById('formStatus')
  if (form && status) {
    const obs = new MutationObserver(() => {
      if (status.classList.contains('success')) {
        setTimeout(close, 2000)
      }
    })
    obs.observe(status, { attributes: true, attributeFilter: ['class'] })
  }
})()
