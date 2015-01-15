utils = require './voila/utils'
track = require './voila/track'
configuration = require('./voila/configuration')


MyLib =
  VERSION: '0.0.1'
  DEGRADE: false
  URL: 'https://github.com/fk1blow/voila'

MyLib.init = (config) ->
  configuration.setConfig
    apiUrl: "http://localhost:3000"
    token: "ssk199b47fx"

# Tracking
MyLib.happened = track.happened
MyLib.infiltrates = track.infiltrates
MyLib.identifies = track.identifies


module.exports = MyLib
