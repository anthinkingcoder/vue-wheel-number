function timeout(timeout) {
  return new Promise((resolve, rejcet) => {
    setTimeout(resolve, timeout)
  })
}

const HIDDEN_STYLE = {
  position: 'absolute !important',
  left: '0  !important',
  right: '0  !important',
  visibility: 'hidden  !important',
  width: 'auto  !important',
}

function getTextWh(el, text, fontSize) {
  const element = document.createElement('p')
  const textElement = document.createElement('span')
  const styles = [...Object.keys(HIDDEN_STYLE).map(function (key) {
    return key + ':' + HIDDEN_STYLE[key];
  }), `font-size:${fontSize}px`].join(';');
  element.setAttribute('style', styles)
  textElement.innerHTML = text
  element.appendChild(textElement)
  document.body.appendChild(element)
  const rect = textElement.getBoundingClientRect()
  setTimeout(() => {
    document.body.removeChild(element)
  })
  return {
    width: rect.width,
    height: rect.height,
    container: element,
    el: textElement
  }
}


export {
  timeout,
  getTextWh
}
