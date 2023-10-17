import 'zone.js/dist/zone'; //Zone JS is required by default for Angular itself.

/**********************
 * Note! Dont' forget to add the following:
 * - Add "src/linq.polyfill.ts" to "files" in tsconfig.app.json:   
 *     --> "files": [ "src/main.ts", "src/linq.polyfill.ts" ]
 * - Add "src/linq.polyfill.ts" to architect-->build-->options-->polyfills in angular.json:
 *     --> "polyfills": [ "zone.js", "src/linq.polyfill.ts" ]
 * */

/***************************************************************************************************
 * Array prototypes
 ***************************************************************************************************/
declare global {
  interface Array<T> {
    distinct: () => T[];
    distinctBy: (fct: (element: T) => any) => T[];
    sum: (fct?: (element: T) => number) => number;
    max: (fct?: (element: T) => number) => number;
    min: (fct?: (element: T) => number) => number;
    average: (fct?: (element: T) => number) => number;
    median: () => T;
    select: (fct: (element: T) => any) => any[];
    where: (fct: (element: T) => boolean) => T[];
    first: (fct?: (element: T) => any) => T;
    firstOrDefault: (fct?: (element: T) => any) => T | null;
    last: (fct?: (element: T) => any) => T;
    single: (fct?: (element: T) => any) => T;
    singleOrDefault: (fct?: (element: T) => any) => T | null;
    take: (nr: number) => T[];
    takeWhile: (fct: (element: T) => boolean) => T[];
    skip: (nr: number) => T[];
    skipWhile: (fct: (element: T) => boolean) => T[];
    any: (fct?: (element: T) => any) => boolean;
    orderBy: (fct: (element: T) => any, fct2?: (element: T) => any, fct3?: (element: T) => any) => any[];
    // orderByDescending: (fct: (element: T) => any) => any[];
    orderByDescending: (fct: (element: T) => any, fct2?: (element: T) => any, fct3?: (element: T) => any) => any[];
    range: (nr: number, firstVal?: number) => number[];
    selectMany: (fct: (element: T) => any[]) => any[];
    count: () => number;
    groupBy: (keySelector: (element: T) => any, valueSelector: (element: T) => any) => any;
    toDictionary: (keySelector: (element: T) => any, valueSelector: (element: T) => any) => any;
  }
}

Array.prototype.selectMany = function(fct) {
  const arr = [];
  for (const item of this) {
    for (const s of fct(item)) {
      arr.push(s);
    }
  }
  return arr;
};

Array.prototype.range = function(nr: number, firstVal?: number) {
  if (!firstVal) firstVal = 0;
  // return [...Array(nr).keys()].map(x => x + firstVal);
  // if problems with terser, use next lines:
  const arr = [];
  for (let i = firstVal; i < nr + firstVal; i++) {
    arr.push(i);
  }
  return arr;
};

Array.prototype.distinct = function() {
  // return [...new Set(this)];
  // if problems with terser, use next lines:
  return this.reduce((set, x) => {
    if (set.indexOf(x) < 0) set.push(x);
    return set;
  }, [])

};
Array.prototype.distinctBy = function(fct) {
  const map = new Map<any, any>();
  this.forEach(x => {
    const key = fct(x);
    if (!map.has(key)) map.set(key, x);
  });
  // return [...map.values()];
  // if problems with terser, use next lines:
  const arr = [];
  for (const item of map.values()) {
    arr.push(item);
  }
  return arr;
};
Array.prototype.sum = function(fct) {
  return this.reduce((sum, x) => sum + (fct ? fct(x) : x), 0);
};
Array.prototype.max = function(fct) {
  return this.reduce((max, x) => Math.max(max, fct ? fct(x) : x), -Number.MAX_VALUE);
};
Array.prototype.min = function(fct) {
  return this.reduce((min, x) => Math.min(min, fct ? fct(x) : x), Number.MAX_VALUE);
};
Array.prototype.average = function(fct) {
  const nr = this.length;
  const sum = this.reduce((sum, x) => sum + (fct ? fct(x) : x), 0);
  return sum / nr;
};
Array.prototype.median = function() {
  const nr = this.length;
  const middleIndex = Math.round(nr / 2);
  return [...this].orderBy(x => x)[middleIndex]; //do not change order of this!
};

Array.prototype.select = Array.prototype.map;
Array.prototype.where = Array.prototype.filter;

Array.prototype.first = function(fct) {
  return fct ? fct(this[0]) : this[0];
};
Array.prototype.firstOrDefault = function(fct) {
  if (this.length === 0) return null;
  return fct ? fct(this[0]) : this[0];
};
Array.prototype.last = function(fct) {
  const last = this[this.length - 1];
  return fct ? fct(last) : last;
};

Array.prototype.single = function(fct) {
  if (!fct) fct = _ => true;
  const matched = this.filter(x => fct!(x));
  const nr = matched.length;
  if (nr !== 1) throw { message: `Number of matched elements is ${nr} != 1` };
  return matched[0];
};
Array.prototype.singleOrDefault = function(fct) {
  if (!fct) fct = _ => true;
  const matched = this.filter(x => fct!(x));
  const nr = matched.length;
  if (nr === 0) return null;
  if (nr !== 1) throw { message: `Number of matched elements is ${nr} != 1` };
  return matched[0];
};

Array.prototype.take = function(nr) {
  return this.slice(0, nr);
};
Array.prototype.takeWhile = function(fct) {
  const taken = [];
  for (const element of this) {
    if (!fct(element)) break;
    taken.push(element);
  }
  return taken;
};
Array.prototype.skip = function(nr) {
  return this.slice(nr);
};
Array.prototype.skipWhile = function(fct) {
  let startIndex = 0;
  for (const element of this) {
    if (!fct(element)) break;
    startIndex++;
  }
  return this.slice(startIndex);
};

Array.prototype.any = function(fct) {
  const len = fct ? this.filter(x => fct(x)).length : this.length;
  return len > 0;
};


Array.prototype.orderBy = function(...fcts) {
  const cascadeSorter = (x: any, y: any) => {
    for (const f of fcts) {
      if (f!(x) === f!(y)) continue;
      else return f!(x) > f!(y) ? 1 : -1;
    }
    return 0;
  };
  return this.sort(cascadeSorter);
};

// Array.prototype.orderByDescending = function(fct) {
//   return this.sort((x, y) => fct(x) > fct(y) ? -1 : 1);
// };
Array.prototype.orderByDescending = function(...fcts) {
  const cascadeSorter = (x: any, y: any) => {
    for (const f of fcts) {
      if (f!(x) === f!(y)) continue;
      else return f!(x) > f!(y) ? -1 : 1;
    }
    return 0;
  };
  return this.sort(cascadeSorter);
};

Array.prototype.count = function() {
  return this.length;
};

Array.prototype.groupBy = function(keySelector, valueSelector) {
  const dict: { [key: string | number]: any } = {};
  for (const item of this) {
    const key = keySelector(item);
    const val = valueSelector(item);
    if (!dict[key]) dict[key] = [];
    (dict[key] as any[]).push(val);
  }
  return dict;
};

Array.prototype.toDictionary = function(keySelector, valueSelector) {
  const dict: { [key: string | number]: any } = {};
  for (const item of this) {
    dict[keySelector(item)] = valueSelector(item);
  }
  return dict;
};
