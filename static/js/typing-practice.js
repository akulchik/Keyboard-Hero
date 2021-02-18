'use strict'

function isSpecialKey(key) {
  return key.length !== 1
}

function KeyUpListener(letterElements) {
  const letters = lettersGenerator(letterElements)
  const scoreCounter = document.querySelector('#kbHeroTypingScoreCounter')
  return function (e) {
    const key = e.key
    if (isSpecialKey(key)) return
    try {
      const { done, value: [cur, next] } = letters.next()
      if (done) return
      cur.classList.remove('kb-hero-typing-field__letter--active')
      if (next) next.classList.add('kb-hero-typing-field__letter--active')
      if (key === cur.textContent) {
        cur.classList.add('kb-hero-typing-field__letter--success')
        scoreCounter.textContent = String(Number(scoreCounter.textContent) + 1)
      } else {
        cur.classList.add('kb-hero-typing-field__letter--warning')
      }
    } catch (e) {
      if (!(e instanceof TypeError)) throw e
    }
  }
}

function* lettersGenerator(letterElements) {
  const letters = Array.from(letterElements)
  for (let i = 0; i < letters.length - 1; ++i) {
    yield letters.slice(i, i + 2)
  }
  const lastLetter = letters[letters.length - 1]
  yield [lastLetter, null]
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
  typingText.firstElementChild.classList.add('kb-hero-typing-field__letter--active')
  typingField.appendChild(typingText)
  return (document.querySelector('#kbHeroTypingField')
    .querySelectorAll('span.kb-hero-typing-field__letter'))
}

document.addEventListener('DOMContentLoaded', () => {
  const lorem = new Lorem()
  const text = lorem.createText(4, Lorem.TYPE.SENTENCE)
  mount(text)
})