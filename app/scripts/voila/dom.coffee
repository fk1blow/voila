# ArrayUtils = require('./array').ArrayUtils


exports.EventUtils =

  add: (el, eventName, handler) ->
    # if ArrayUtils.isArray el

    if el.addEventListener
      el.addEventListener(eventName, handler)
    else
      el.attachEvent "on#{eventName}", ->
        handler.call(el)
