###
###
ApiEndpoints =

  # @TODO describe this ?
  _base: ""

  happened: ->
    return "#{@_base}/events"

  identifies: ->
    return "#{@_base}/identity"

  infiltrates: ->
    return "#{@_base}/infiltrate"


module.exports = ApiEndpoints
