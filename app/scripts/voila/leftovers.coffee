###
  If let's say, the user clicks a link that could
  change the href, then, the page might refresh.
  If the refresh happenes, the 'happened' event could
  get lost because it would not complete the action.

  To bypass this, if we assume that the user navigates to
  a page within the same application, we might "cache"
  the triggered action and, once the target page loads,
  it can read the 'leftovers' and try to send the batch
  of events...
###
class Leftovers

  _leftQueue: null

  constructor: ->

  getLeftOvers: ->
    console.log 'should return leftovers queue - events not yet sent!'


module.exports = Leftovers
