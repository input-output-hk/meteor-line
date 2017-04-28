Package.describe({
  name: 'input-output-hk:line-api',
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
  api.use('input-output-hk:accounts-line', ['client', 'server']);
  api.export('LineApi');
    
  api.addFiles('line-common.js', ['client', 'server']);
  api.addFiles('line-messaging-api.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('input-output-hk:line-api');
  api.mainModule('line-api-tests.js');
});
