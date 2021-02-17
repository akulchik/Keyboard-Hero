'use strict'

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla lacus, suscipit et placerat a, tempus ac dolor. Donec auctor, ligula id viverra consequat, nunc tellus sagittis metus, vitae tincidunt ante nisl vel tellus. Vestibulum id nibh commodo, sodales risus vitae, gravida orci.'

function KeyUpListener(letterElements) {
  const letters = lettersGenerator(letterElements)
  return function (e) {
    const { done, value: el } = letters.next()
    if (done) return
    console.log(`released ${e.key} when required ${el.textContent}`)
  }
}

function* lettersGenerator(letterElements) {
  for (const el of letterElements) {
    yield el
  }
}

function mount(text) {
  const mountedText = mountTypingText(text)
  document.addEventListener('keyup', KeyUpListener(mountedText))
}

function mountTypingText(text) {
  const typingField = document.querySelector('#kbHeroTypingField')
  const typingText = document.createElement('div')
  for (const letter of text) {
    const span = document.createElement('span')
    span.className = 'kb-hero-typing-field__letter'
    span.innerText = letter
    typingText.appendChild(span)
  }
  typingField.appendChild(typingText)
  return (document.querySelector('#kbHeroTypingField')
    .querySelectorAll('span.kb-hero-typing-field__letter'))
}

document.addEventListener('DOMContentLoaded', () => {
  mount(text)
})