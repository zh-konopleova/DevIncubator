"use strict";

function dscount(s, s1, s2) {
	var counter = 0;
  s = s.toLowerCase();
  for (var i = 0; i < s.length - 1; i++) {
  	if (s[i] == s1 && s[i+1] == s2) {
    	counter++;
    }
  }
  return counter;
}