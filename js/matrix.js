(function () {
  const textElements = document.querySelectorAll('[data-matrix]')
  const completedElem = []

  function printText() {
    for (let i = 0; i < textElements.length; i++) {
      const elem = textElements[i];
      const isShow = window.innerHeight - elem.getBoundingClientRect().top > window.innerHeight / 20 && elem.getBoundingClientRect().top > 0;
      if (!isShow || completedElem[i]) {
        continue;
      }
      completedElem[i] = true
      const speed = textElements[i].dataset.matrix
      const color = getComputedStyle(textElements[i]).getPropertyValue('--matrix').trim();
      let textContextIndex = 0;
      let counter = 1;
      let out = ''
      const innerHTML = textElements[i].innerHTML;

      for (let ii = 0; ii < innerHTML.length; ii++) {
        const text = elem.textContent[textContextIndex]
        out += innerHTML[ii]

        if (innerHTML[ii + 1] === ' ' && elem.textContent[ii + 1] === ' ') {
          textContextIndex++
          continue
        }
        if (innerHTML[ii] === text) {
          const chunkEnd = innerHTML.slice(ii + 1)
          textContextIndex++
          addSymbol(elem, out, chunkEnd, color, counter * speed)
        }

        counter++
      }
    }

    function addSymbol(elem, textStart, textEnd, color, ms) {
      setTimeout(() => {
        elem.innerHTML = `<span style="color: ${color}"> ${textStart}</span>${textEnd}`
      }, ms)
    }
  }

  window.addEventListener('load', ()=>{
    printText();

    document.addEventListener('scroll', printText)
  })
})()