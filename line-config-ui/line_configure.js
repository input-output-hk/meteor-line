Template.configureLoginServiceDialogForLine.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl();
  }
});

Template.configureLoginServiceDialogForLine.fields = function () {
  return [
    {property: 'clientId', label: 'Channel ID'},
    {property: 'secret', label: 'Channel Secret'}
  ];
};