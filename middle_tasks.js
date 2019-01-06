// №1
let arr = [0,1];
function fib(n){
  if (n == 0) return arr[0];

  if (n == 1) return arr[1];

  if (!arr[n]) {
    arr[n] = fib(n-2) + fib(n-1);
  }
  return arr[n];
};


// №2
function isBalanced(str) {
  let stack = [];
  let brackets = {
  	'(': ')',
    '[': ']',
    '{': '}'
  }

  for (let i = 0; i < str.length; i++) {
  	if (Object.keys(brackets).includes(str[i])) {
      stack.push(str[i]);
    }

    if (Object.values(brackets).includes(str[i])) {
      if (stack.length === 0) return false;

			let closeBracket = str[i];
      let openBracket = stack.pop();
      if (brackets[openBracket] !== closeBracket) return false;
    }
  }

  return stack.length === 0;
};


// №3
function uniq(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let number = arr[i];
    obj[number] = true;
  }

  return Object.keys(obj);
};


// №4
function intersection(arr1, arr2) {
  return arr1.filter((item) => arr2.includes(item));
};
