Package.describe({
  name: 'input-output-hk:line-oauth',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.3.2');
  api.use('ecmascript');
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use(['underscore', 'service-configuration'], ['client', 'server']);
  api.use(['random', 'templating'], 'client');

  api.addFiles('line-oauth.js', ['client', 'server']);
  api.addFiles('line-server.js', 'server');
  api.addFiles('line-client.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('input-output-hk:line-oauth');
  api.mainModule('line-oauth-tests.js');
});
