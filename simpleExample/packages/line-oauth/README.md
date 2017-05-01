# line-oauth

## Overview

This package provides a Meteor wrapper for the LINE API methods, including the Login and the Get User Information APIs. Both APIs use OAuth login methodology.


## Login

This feature provides integration with the OAuth LINE Login method. Amongst its main dependencies, you can find ```accounts```, ```service-configuration``` and ```oauth``` Meteor packages.

### Getting Started

Before we can use the login feature, please make sure you've successfully created a Login Channel in LINE. If you haven't yet created the channel, please address to the [official LINE documentation](https://developers.line.me/line-login/overview#line_login_step), and once you've created the channel come back to this point to start setting up the plugin.

First we must configure the service with our keys, by adding them to this snippet inside ```accounts.js``` file.

```
ServiceConfiguration.configurations.update(
  { "service": "line" },
  {
    $set: {
      "clientId": <your_channel_id>,
      "secret": <your_channel_secret>,
    }
  },
  { upsert: true }
);
```
#### Important

Also, take into account that the default redirect uri of this package is ```<YOUR_DOMAIN>/_oauth/line``` so don't forget to add that url to the allowed Callback Urls in the Technical Configuration section for the Line Channel Config.

### Usage

The next step is to integrate the ```loginWithLine``` feature inside the LINE button (Don't forget to follow [these guidelines](https://developers.line.me/web-api/setting-up-login-button) to implement the LINE Login Button).

```
Meteor.loginWithLine(function (err, res) {
  console.log('login callback', err, res);
  if (err) {
    console.log('login failed ' + err);
    return;
  }
  console.log('sucess ' + res);
  return;
});
```

### Get User Information API

This package also provides some methods to get the LINE User profile information without logging that user into your app. 
To do so, we provide the ```getLoginUrl``` method, which will receive the ```redirectUri``` and the ```state``` as params, and it will return the loginUrl.

```
const url = Line.getLoginUrl(redirectUri, stateParam)
```

The last and most important method that this package provides to get the user information, is "getLineUserData", which will receive the authentication code as a param, and will return an object with the necessary data to append to the user in the users collection.

``` Line.getLineUserData(code) ```

will return

```
  return { 
    accessToken: accessToken,
    expiresAt: expiresAt,
    refreshToken: refreshToken,
    userId: userId
  };
  ``` 

We suggest to execute this method server side, since it fetches the data through REST APIs. If done from the client, you'll face CORS issues.

A good flow in which this function should fit is as following:

1- Create a route which will be the redirectUri mentioned earlier.

2- Create a Meteor.method that executes ```Line.getLineUserData``` method.

3- When route defined in step 1 is accessed, trigger the meteor method defined in step 2 through a Meteor.call
