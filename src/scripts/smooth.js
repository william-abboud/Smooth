/**
 * Created by William Abboud on 3/26/2016.
 * Description:
 * Features:
 *
 */

let smooth = function smooth() {
  const api = {
    smooth: 'criminal'
  };

  return Object.create(api);
};

let foo = smooth();
let bar = smooth();

console.log(foo === bar);
