// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by accounts-line.js.
import { name as packageName } from "meteor/input-output-hk:accounts-line";

// Write your tests here!
// Here is an example.
Tinytest.add('accounts-line - example', function (test) {
  test.equal(packageName, "accounts-line");
});
