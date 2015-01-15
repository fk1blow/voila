###
###
ApiEndpoints =

  # @TODO describe this ?
  _base: ""

  happened: -> "#{@_base}/events"

  identifies: -> "#{@_base}/identity"

  infiltrates: -> "#{@_base}/infiltrate"


module.exports = ApiEndpoints
