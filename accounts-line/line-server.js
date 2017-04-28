var OAuth = Package.oauth.OAuth;

Line.whitelistedFields = ['display_name', 'email', 'id', 'uri', 'images'];

/*
  Registers the oauth service.
 */
OAuth.registerService('line', 2, null, function(query) {
  var response = getTokens(query);
  var refreshToken = response.refreshToken;
  var identity = getIdentity(response.accessToken);
  // Set the service data.
  var serviceData = {
    accessToken: response.accessToken,
    expiresAt: response.expiresIn
  };
  // Set refresh token.
  if (refreshToken) {
    serviceData.refreshToken = refreshToken;
  }

  // Set any additional fields.
  var fields = _.pick(identity, Line.whitelistedFields);
  _.extend(serviceData, fields);
  return {
    serviceData: serviceData,
    options: { profile: fields }
  };
});

// checks whether a string parses as JSON
var isJSON = function (str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

/*
  Helper function that returns an object with:
    accessToken (token itself)
    expiresIn (token lifespan in epoch)
    refreshToken
 */
var getTokens = function(query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'line'});
  if (!config)
    throw new ServiceConfiguration.ConfigError();

  var response;
  try {
    // Request access token.
    response = HTTP.post(
      "https://channel-apis.line.naver.jp/v1/oauth/accessToken", { params: {
        requestToken: query.code,
        channelSecret: OAuth.openSecret(config.secret),
      }});
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Line. " + err.message), {response: err.response});
  }

  // Line returns responses like 'E{"error":"server_error","error_description":"Unexpected status: 415"}' on error.
  if (isJSON(response)) {
    throw new Error("Failed to complete OAuth handshake with Line. " + response);
  } else if (!response.data.accessToken) {
    throw new Error("Failed to complete OAuth handshake with Line. No access_token found in response.");
  } else {
    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      expiresIn: response.data.expire
    };
  }
};

// Helper function that fetches and returns the user's Line profile.
var getIdentity = function(accessToken) {
  try {
    var response =  HTTP.get(
      "https://api.line.me/v2/profile",
      { headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      }}).data;
      response.id = response.userId;
      return response;
  } catch (err) {
    throw _.extend(new Error("Failed to fetch identity from Line. " + err.message), { response: err.response });
  }
}

Line.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};


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