Package.describe({
  name: 'input-output-hk:line-config-ui',
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
  api.use('templating', 'client');

  api.addFiles('line_login_button.css', 'client');
  api.addFiles(
    ['line_configure.html', 'line_configure.js'],
    'client');
});