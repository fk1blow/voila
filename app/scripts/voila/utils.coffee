EventUtils =

  addEventListener: (el, eventName, handler) ->
    return unless el instanceof HTMLElement
    if el.addEventListener
      el.addEventListener(eventName, handler)
    else
      el.attachEvent "on#{eventName}", ->
        handler.call el

  removeEventListener: (el, eventName, handler) ->
    if el.removeEventListener
      el.removeEventListener(eventName, handler)
    else
      el.detachEvent('on' + eventName, handler)


HtmlUtils =

  isHtmlCollection: (target) ->
    Array::toString.call(target) is "[object HTMLCollection]"

  isHtmlElementObject: (target) ->
    Array::toString.call(target) is "[object HTMLButtonElement]"


ArrayUtils =

  collectionToArray: (collection) ->
    ary = []
    for item in collection
      ary.push item
    ary

  isHtmlCollection: (target) ->
    Array::toString.call(target) is "[object HTMLCollection]"

  isArray: (test) ->
    Object::toString.call(test) is '[object Array]'

  toArray: (target) ->
    Array::slice.call target

  map: (elements, callback) ->
    bucket = []
    for item in elements
      bucket.push callback item
    if bucket.length then bucket else null


module.exports = {EventUtils, ArrayUtils}
