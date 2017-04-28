Package.describe({
  name: 'input-output-hk:accounts-line',
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
  api.use('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('input-output-hk:line-oauth');
  api.imply('input-output-hk:line-oauth');
  api.use(['underscore', 'service-configuration'], ['client', 'server']);
  api.use(['random', 'templating'], 'client');
    
  api.addFiles('line-common.js', ['client', 'server']);
  api.addFiles('line-server.js', 'server');
  api.addFiles('notice.js', 'server');
  api.addFiles('line-client.js', 'client');
});
