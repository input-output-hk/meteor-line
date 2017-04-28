import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  this.autorun(function(){
    Meteor.subscribe('usersWithLineIds');
  })
});

Template.hello.helpers({
  lineUser() {
    const user = Meteor.users.findOne({ _id: Meteor.userId() });

    if (user && user.services.line) {
      return user.services.line.id;
    } else {
      return '';
    }
  },
  getLineUserIds() {
    return Meteor.users.find({"profile.id": {$exists: true}}).fetch().map((user) => { return user.profile.id});
  },
  userIsLoggedIn() {
    return !!Meteor.user();
  },
  thereAreUsersInDatabase() {
    return Meteor.users.find({"profile.id": {$exists: true}}).count() > 0;
  }
});

Template.hello.events({
  'click .line-login'(event, instace) {
    Meteor.loginWithLine(function (err, res) {
      console.log('login callback', err, res);
      if (err !== 'undefined') {
        console.log('sucess ' + res, err);
      } else {
        console.log('login failed ' + err);
      }
    });
  },
  'click .message-button'(event, instance) {
    event.preventDefault();
    const lineId = $(".message-user").val();
    const message = $(".message-text").val();
    console.log('message', message, lineId);
    Meteor.call('sendLineMessage', message, lineId, (err, res) => {
      if (err) {
        alert('There\'s been an error, please check the terminal');
        console.log(err);
        return;
      }
      alert('Message sent!');
    });
  },
  'click .logout'(event, instance) {
    Meteor.logout();
  }
});
