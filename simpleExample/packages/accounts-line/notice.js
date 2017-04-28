if (Package['accounts-ui']
  && !Package['service-configuration']
  && !Package.hasOwnProperty('fline-config-ui')) {
  console.warn(
    "Note: You're using accounts-ui and accounts-line,\n" +
    "but didn't install the configuration UI for the Line\n" +
    "OAuth. You can install it with:\n" +
    "\n" +
    "    meteor add line-config-ui" +
    "\n"
  );
}