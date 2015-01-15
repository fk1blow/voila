xhr = require '../xhr'
Leftovers = require './leftovers'
apiEndpoints = require './endpoints'
configuration = require './configuration'


# @TODO connect this with browser session or local storage
leftoversQueue = new Leftovers()

sendXHR = (uri, data) ->
  console.log 'will send to: ', uri, ' with data: ', data
  xhr
    useXDR: true
    uri: uri
    json: data
    method: 'POST'
    headers:
        "Content-Type": "application/json"
    (err, resp, body) ->
        console.log resp


module.exports =

  sendRequest: (type, data) ->
    apiUrl = configuration.getConfig().apiUrl
    resourceEndpoint = apiEndpoints[type].call apiEndpoints
    reqUrl = apiUrl.concat resourceEndpoint
    sendXHR reqUrl, data
