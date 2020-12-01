exports = typeof window === 'undefined' ? global : window;

function indexOf(arr, item) {
  for (let i in arr) {
    if (arr[i] === item) {
      return +i;
    }
  }
  return -1;
}

exports.arraysAnswers = {
  indexOf,

  sum(arr) {
    return arr.reduce((i, sum) => sum + i);
  },

  remove(arr, item) {
    return arr.filter(i => i !== item);
  },

  removeWithoutCopy(arr, item) {
    let s = [];
    arr.map((i, index) => {
      if (i === item) {
        return index;
      }
    }).forEach(index => arr.splice(index, 1));

    return arr;
  },

  append(arr, item) {
    return arr.concat(item);
  },

  truncate(arr) {
    arr.pop();
    return arr;
  },

  prepend(arr, item) {
    return [item].concat(arr);
  },

  curtail(arr) {
    arr.shift();
    return arr;
  },

  concat(arr1, arr2) {
    return arr1.concat(arr2);
  },

  insert(arr, item, index) {
    return arr.reduce((res, i, idx) => {
      if (idx === index) {
        return res.concat([item, i]);
      }
      return res.concat(i);
    }, []);
  },

  count(arr, item) {
    let s = 0;
    arr.forEach(i => {
      if (i === item) {
        s++;
      }
    });

    return s;
  },

  duplicates(arr) {
    return arr.reduce((res, item, idx) => {
      const ind = indexOf(arr, item);
      if (ind !== -1 && ind !== idx) {
        return res.concat(item);
      }

      return res;
    }, []);
  },

  square(arr) {
    return arr.map(i => i*i);
  },

  findAllOccurrences(arr, target) {
    return arr.map((i, index) => i === target ? index : false).filter(i => i === 0 || i);
  },
};
