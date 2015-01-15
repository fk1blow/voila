###
###
class Config

  apiUrl: null

  apiToken: null

  _captureClicks: false

  _captureSubmits: false

  # @_apiUrl, @_apiToken, willCapture = []
  constructor: (options = {}) ->
    @[item] = options[item] for item of options


configuration = null

setConfig = (config) ->
  configuration = new Config(config) unless configuration

getConfig = ->
  configuration or throw new Error "unable to find the configuration!"


exports.setConfig = setConfig

exports.getConfig = getConfig

