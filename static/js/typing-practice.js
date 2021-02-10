'use strict'

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla lacus, suscipit et placerat a, tempus ac dolor. Donec auctor, ligula id viverra consequat, nunc tellus sagittis metus, vitae tincidunt ante nisl vel tellus. Vestibulum id nibh commodo, sodales risus vitae, gravida orci.'

function mount() {
  mountTypingText()
  document.addEventListener('keyup', KeyUpListener(text))
}

function mountTypingText() {
  const typingField = document.querySelector('#kbHeroTypingField')
  const typingText = document.createElement('div')
  for (const letter of text) {
    const span = document.createElement('span')
    span.className = 'kb-hero-typing-field__letter'
    span.innerText = letter
    typingText.appendChild(span)
  }
  typingField.appendChild(typingText)
}

function* lettersGenerator(text) {
  for (const letter of text) {
    yield letter
  }
}

function KeyUpListener(text) {
  const letters = lettersGenerator(text)
  return function (e) {
    const { done, value } = letters.next()
    if (done) return
    console.log(`released ${e.key} when required ${value}`)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  mount()
})