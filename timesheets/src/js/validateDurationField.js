module.exports = string => {

  const colon = string.indexOf(':');
  if (colon) {
    const charsAfterColon = string.substring(colon + 1);
    const charCountAfterColon = charsAfterColon.length;
    const charsBeforeColon = string.substring(0, colon);

    if (charCountAfterColon > 2){
      return 'invalid';
    }
    const charsBeforeColonArray = charsBeforeColon.split('');
    charsBeforeColonArray.map(char => {
      if (char != 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9 || 0) {
        return 'invalid';
      }
    });
  }

  return string;

}
