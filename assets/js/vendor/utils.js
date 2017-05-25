export function viewportSize () {
  let viewport = {
    x: window.innerWidth,
    y: window.innerHeight
  }

  window.addEventListener('resize', function () {
    viewport = {
      x: window.innerWidth,
      y: window.innerHeight
    }
  })

  return viewport
}

export function qs (domSelector, doc = document) {
  return doc.querySelector(domSelector)
}

export function qsa (domSelector, doc = document) {
  return Array.from(doc.querySelectorAll(domSelector))
}

export function elementRect (elements) {
  var elementRect = getRectInfo()
  var rectInfo = null

  function getRectInfo () {
    rectInfo = [0]
    var scrollPosition = 0
    for (var i = 1; i < elements.length; i++) {
      var elementHeight = elements[i].clientHeight

      scrollPosition += elementHeight
      rectInfo.push(scrollPosition)
    }
    console.log(rectInfo)
    return rectInfo
  }

  window.addEventListener('resize', function () {
    elementRect = getRectInfo()
  })

  return elementRect
}
