Meteor.publish('usersWithLineIds', function() {
  return Meteor.users.find({"profile.id": {$exists: true}}, {"profile.id": 1});
});