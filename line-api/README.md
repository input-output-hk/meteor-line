# line-js-api

## Overview

This package provides a Meteor wrapper for the LINE Message APIs.

## Dependencies

This package depends on ```input-output-hk```'s [oauth-line](https://github.com/input-output-hk/line-oauth) package, as well as ```accounts```, ```service-configuration``` and ```oauth``` Meteor packages.

## Message API

All message methods are wrapped inside ```LineApi``` object.

### Getting Started

First we need to configure the service. To do so, we must use the method ```registerService``` defined inside the LineApi object.
This method expects to receive two params, which are the channelSecret and the channelAccessToken. Please take into account that the Login and the Message channels are different, and each has different keys.

So, from the server side you must invoke that method in your app like this.

```LineApi.registerService( <your_channel_secret>, <your_channel_access_token>);```

### Usage

Once the service has been initialized, then we are able to use these two methods:

- ```sendMessage(lineUserId, messages)```: Sends to a determinate user, an array of one or more messages. Refer to the [official documentation](https://devdocs.line.me/en/?go#send-message-object) to see how the messages array should be set.

**NOTE**: the first param ```lineUserId``` refers to the internal LINE userId, not the username. [Line-OAuth](https://github.com/input-output-hk/line-oauth) package provides an useful API to get the userData, from which you can retrieve the userId. We've added it as a dependency into this very package, so you should be able to use it.

- ```validateMessage(requestBody, signature)```: Checks if a message received in the webhook URL is valid or not returns true or false). It validates if the request came from a trusty source, by following [these guidelines](https://devdocs.line.me/en/?go#webhooks).
