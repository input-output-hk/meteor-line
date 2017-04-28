if (typeof Line === 'undefined') {
  Line = {};
}

var OAuth = Package.oauth.OAuth;

Line.whitelistedFields = ['display_name', 'email', 'id', 'uri', 'images'];

Accounts.addAutopublishFields({
  forLoggedInUser: _.map(
    // publish access token since it can be used from the client
    // refresh token probably shouldn't be sent down.
    Line.whitelistedFields.concat(['accessToken', 'expiresAt']), // don't publish refresh token
    function (subfield) { return 'services.line.' + subfield; }),

  forOtherUsers: _.map(
    // even with autopublish, no legitimate web app should be
    // publishing all users' emails
    _.without(Line.whitelistedFields, 'email', 'id', 'uri'),
    function (subfield) { return 'services.line.' + subfield; })
});