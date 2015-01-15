Identity = require './Identity'
communication = require './communication'


userIdentity = new Identity()


module.exports =

  happened: (what, withDescription) ->
    communication.sendRequest 'happened',
      { what: what, desc: withDescription, at: new Date().getTime() }

  identifies: (who, withDetails) ->
    communication.sendRequest 'identifies',
      who: who, desc: withDetails, at: new Date().getTime(),
      identity: userIdentity.identityDetails()

  infiltrates: (to, withData) ->
    console.log 'should decorate something that happened: ', to,
      ' and some details: ', withData
    communication.sendRequest 'infiltrates', {to: to, withData}
