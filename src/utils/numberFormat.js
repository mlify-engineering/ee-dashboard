const numberFormat = (num, dec, pnt, thou, curr1 = "", curr2 = "", n1 = "", n2 = "") => {
  const x = Math.round(num * Math.pow(10, dec));
  if (x >= 0) n1 = n2 = "";
  const y = `${Math.abs(x)}`.split("");
  let z = y.length - dec;
  if (z < 0) z--;
  for (let i = z; i < 0; i++) y.unshift("0");
  if (z < 0) z = 1;
  y.splice(z, 0, pnt);
  if (y[0] === pnt) y.unshift("0");
  while (z > 3) {
    z -= 3;
    y.splice(z, 0, thou);
  }
  const r = curr1 + n1 + y.join("") + n2 + curr2;
  return r;
};

export default numberFormat;
