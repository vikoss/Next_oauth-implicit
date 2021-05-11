export default function () {
  const hashParams = {};
  const r = /([^&;=]+)=?([^&;]*)/g;
  /*
  | http://www.example.com/test.htm#this_is_the_hash
  |
  */
  const q = window.location.hash.substring(1);

  let e;
  while (e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};
