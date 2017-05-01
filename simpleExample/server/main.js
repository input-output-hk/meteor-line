import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  // Not needed if configured with the UI
  if(!Package['input-output-hk:accounts-line']) {
    ServiceConfiguration.configurations.update(
      {"service": "line"},
      {
        $set: {
          "clientId": "your-channel-id",
          "secret": "your-channel-secret",
        }
      },
      {upsert: true}
    );
  }

  LineApi.registerService("messages-channel-secret", "messages-channel-access-token");
});

Meteor.methods({
  'sendLineMessage'(message, lineId) {
    console.log('Send line message', message, lineId);

    LineApi.sendMessage(lineId, [{
      type: 'text',
      text: message,
    }]);

    return 'success';
  },
});
