let form = document.querySelector('#contact')
let button = form.querySelector('button[type=submit]')
let buttonText = button.textContent
form.addEventListener('submit', async function (e) {
  button.disabled = true
  button.textContent = 'Chargement...'
  let errorElements = form.querySelectorAll('.has-error')
  for(let i = 0; i < errorElements.length; i++) {
    errorElements[i].classList.remove('has-error')
    let span = errorElements[i].querySelector('.help-block')
    if (span) {
      span.parentNode.removeChild(span)
    }
  }
  e.preventDefault()
  let data = new FormData(form)
  try {
  let response = await fetch(form.getAttribute('action'), {
    method: 'POST',
    headers: {
      'X-Requested-With': 'xmlhttprequest'
    },
    body: data
  })
  let responseData = await response.json()
  if (response.ok === false) {
    let errors = responseData
    let errorsKey = Object.keys(errors)
    for (let i = 0; i < errorsKey.length; i++) {
      let key = errorsKey[i]
      let error= errors[key]
      let input = document.querySelector('[name='+ key + ']')
      let span = document.createElement('span')
      span.className = 'help-block'
      span.innerHTML = error
      input.parentNode.classList.add('has-error')
      input.parentNode.appendChild(span)
    }
  } else {
    let inputs = form.querySelectorAll('input, textarea')
    for(let i = 0; i < inputs.length; i++) {
      inputs[i].value = ""
    }
  }
} catch (e) {
  alert(e)
}
  button.disabled = false
  button.textContent = buttonText
})