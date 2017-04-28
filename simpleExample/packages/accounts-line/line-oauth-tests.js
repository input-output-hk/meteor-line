// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by line-oauth.js.
import { name as packageName } from "meteor/input-output-hk:line-oauth";

// Write your tests here!
// Here is an example.
Tinytest.add('line-oauth - example', function (test) {
  test.equal(packageName, "line-oauth");
});
