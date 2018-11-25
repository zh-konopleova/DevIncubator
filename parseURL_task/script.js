"use strict";

function parseUrl(url) {
  var link = document.createElement('a');
  link.href = url;
  return link;
}

var a = parseUrl('http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo');