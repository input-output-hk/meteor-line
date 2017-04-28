Meteor.loginWithLine = function(options, callback) {
  // support a callback without options
  if (! callback && typeof options === "function") {
    callback = options;
    options = null;
  }
  var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
  Line.requestCredential(options, credentialRequestCompleteCallback);
};


/*
  Request Line credentials for the user.

  @param options (optional)
  @param credentialRequestCompleteCallback (callback *function* to call on completion. Takes one argument: credentialToken
    on success, or Error on error)
 */
Line.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  } else if (!options) {
    options = {};
  }

  // This line is only for control purposes
  var config = ServiceConfiguration.configurations.findOne({service: 'line'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError());
    return;
  }

  // Added on security used for the `state` param.
  var credentialToken = Random.secret();
  var loginStyle = OAuth._loginStyle('line', config, options);
  // Generate the oauth URL.
    
  var loginUrl = Line.getLoginUrl(OAuth._redirectUri('line', config), OAuth._stateParam(loginStyle, credentialToken));

  OAuth.launchLogin({
    loginService: "line",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken
  });
};

Line.getLoginUrl = function(redirectUri, stateParam) {
  var config = ServiceConfiguration.configurations.findOne({service: 'line'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError());
    return
  }
  
  var loginUrl =
    'https://access.line.me/dialog/oauth/weblogin' +
    '?response_type=code' +
    '&client_id=' + config.clientId +
    '&redirect_uri=' + redirectUri +
    '&state=' + stateParam;
    
  return loginUrl;
};
