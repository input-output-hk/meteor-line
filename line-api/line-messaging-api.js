var crypto = require('crypto');

LineApi.registerService = function( channelSecret, channelAccessToken ) {
  this.LineApi = { channelSecret, channelAccessToken };
}

LineApi.sendMessage = function(userId, messages) {
  // Header must contain Channel Access Token
  var headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${this.LineApi.channelAccessToken}`
  };
  // Body must contain the receipient userId and an array of messages
  var data = {
    "to": userId,
    "messages": messages
  };
  HTTP.post('https://api.line.me/v2/bot/message/push', { headers, data });
};

LineApi.validateMessage = function(body, signature) {
  var hmac = crypto.createHmac('sha256', this.LineApi.channelSecret);
  hmac.update(JSON.stringify(body));
  return hmac.digest('base64') === signature;
};

LineApi.getLineUserData = function(code) {
    var params = {
    "channelSecret": ServiceConfiguration.configurations.findOne({service: 'line'}).secret,
    "requestToken":	code,
  };
  var accessTokenResult = HTTP.post('https://channel-apis.line.naver.jp/v1/oauth/accessToken', {
    headers: {
      "Content-Type":	"application/x-www-form-urlencoded",
    },
    params: params
  });
  var profileResult = HTTP.get('https://api.line.me/v2/profile', {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + accessTokenResult.data.accessToken
    }
  });
  return { 
    accessToken: accessTokenResult.data.accessToken,
    expiresAt: accessTokenResult.data.expiresIn,
    refreshToken: accessTokenResult.data.refreshToken,
    userId: profileResult.data.userId
  };
}

export default LineApi;