export const isNumber = (value) => {
  if (typeof value === "string") {
    return !isNaN(value);
  }
};

export const isEmail = (value) => {
  const checkvalue = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    value
  );
  return checkvalue;
};
export const isPhonenumber = (value) => {
  const phonenumber = /^(\+\d{1,3}[- ]?)?\d{10}$/.test(value);
  return phonenumber;
};

export const isWebsite = (value) => {
  const url =
    /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/gm;
  url.test(value);

  return url;
};

export const createArray = (value) => {
  let myArray = [];
  for (var i = 1; i <= value; i++) {
    myArray.push(i);
  }
  return myArray;
};
