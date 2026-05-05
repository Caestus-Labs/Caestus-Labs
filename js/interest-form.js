// Caestus Labs — Coming Soon interest form
// Posts to the same Supabase `contacts` table the previous site used,
// so existing rows stay queryable. Only collects email + name + use_case.

const SUPABASE_URL = window.SUPABASE_URL
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY

const form = /** @type {HTMLFormElement|null} */ (document.getElementById('interestForm'))
const statusEl = document.getElementById('formStatus')
const submitBtn = /** @type {HTMLButtonElement|null} */ (document.getElementById('submitBtn'))

if (!form || !statusEl || !submitBtn) {
  // Form is missing from the DOM — bail rather than throwing in production.
  // (This file is only included on index.html; the guard exists so accidental
  // inclusion elsewhere doesn't break those pages.)
} else {
  form.addEventListener('submit', onSubmit)
}

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
const VALID_USE_CASES = new Set(['training', 'medical', 'industrial', 'gaming', 'research', 'other'])

/**
 * @param {SubmitEvent} ev
 */
async function onSubmit(ev) {
  ev.preventDefault()
  if (!form || !statusEl || !submitBtn) return

  const fd = new FormData(form)
  const email = String(fd.get('email') || '').trim().toLowerCase()
  const name = String(fd.get('name') || '').trim()
  const use_case = String(fd.get('use_case') || '').trim()

  if (!EMAIL_RE.test(email) || email.length > 254) return setStatus('Enter a valid email.', 'error')
  if (!name || name.length > 100) return setStatus('Add your name.', 'error')
  if (!VALID_USE_CASES.has(use_case)) return setStatus('Pick an interest.', 'error')

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return setStatus('Form not configured. Email hello@caestuslabs.com instead.', 'error')
  }

  setLoading(true)
  setStatus('Sending…', '')

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        email,
        name,
        use_case,
        source: 'coming-soon',
        user_agent: navigator.userAgent.slice(0, 500)
      })
    })

    if (res.ok) {
      form.reset()
      setStatus("You're on the list. We'll be in touch.", 'success')
    } else {
      const text = await safeText(res)
      if (res.status === 409 || /duplicate|already/i.test(text)) {
        setStatus("You're already on the list.", 'success')
      } else if (/wait|rate/i.test(text)) {
        setStatus('Please wait a moment before resubmitting.', 'error')
      } else {
        setStatus('Submission failed. Try again or email us.', 'error')
      }
    }
  } catch (err) {
    setStatus('Network error. Try again.', 'error')
  } finally {
    setLoading(false)
  }
}

/**
 * @param {Response} res
 * @returns {Promise<string>}
 */
async function safeText(res) {
  try { return await res.text() } catch { return '' }
}

/**
 * @param {string} msg
 * @param {''|'success'|'error'} kind
 */
function setStatus(msg, kind) {
  if (!statusEl) return
  statusEl.textContent = msg
  statusEl.classList.remove('success', 'error')
  if (kind) statusEl.classList.add(kind)
}

/**
 * @param {boolean} on
 */
function setLoading(on) {
  if (!submitBtn) return
  submitBtn.disabled = on
  const label = submitBtn.querySelector('.label')
  if (label) label.textContent = on ? 'Sending…' : 'Notify me'
}
