###
###
class Identity

  age: undefined

  gender: undefined

  country: undefined

  region: null

  timezone: null

  # @property [Object] The user identifies with current session
  _who: 'anonymous'

  constructor: ->

  identityDetails: ->
    {@age, @gender, @country, @region, @timezone}


module.exports = Identity
