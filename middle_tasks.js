// №1
let arr = [0,1];
function fib(n) {
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


// №5
function sort(arr) {
  if(arr.length < 2) return arr;

  let pivotIndex = Math.floor(arr.length / 2),
      pivot = arr[pivotIndex],
      less = [],
      greater = [];

  arr.forEach((item, index) => {
    if(index != pivotIndex && item <= pivot) less.push(item);

    if(item > pivot) greater.push(item);
  });

  return [...sort(less), pivot, ...sort(greater)];
}


//№6
function includes(arr, number) {
  let middle = Math.floor(arr.length / 2);
  let elem = arr[middle];

  if(number === elem) return true;

  if(number < elem) {
    return includes(arr.slice(0, middle), number);
  }

  if(number > elem) {
    return includes(arr.slice(middle + 1, arr.length - 1), number);
  }

  return false;
};


// №7
function assignDeep(obj1, obj2) {
  for (let key in obj2) {
    let value = obj2[key];

    if(typeof(value) === 'object' && typeof(obj1[key]) === 'object') {
      value = assignDeep(obj1[key], value);
    }

    obj1[key] = value;
  }

  return obj1;
};


//№8
