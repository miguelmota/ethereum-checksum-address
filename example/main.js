var { toChecksumAddress } = require('../')

var address = document.querySelector('#address')
var submit = document.querySelector('#submit')
var output = document.querySelector('#output')

submit.addEventListener('click', update)
address.addEventListener('input', update)

update()

function update(event) {
  if (event) event.preventDefault()
  output.innerHTML = ''
  try {
    output.innerHTML = toChecksumAddress(address.value)
  } catch(err) {
    // noop
  }
}
