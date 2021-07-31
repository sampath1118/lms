import axios from "axios";
const url = "http://localhost:8080";

export function getHeaders() {
  let token = "";
  if (sessionStorage.getItem("token")) {
    token = sessionStorage.getItem("token");
  }
  return {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
}

export function _get(str) {
  return axios.get(`${url}/${str}`, getHeaders()).then((r) => r.data);
}

export function _post(str, data) {
  return axios.post(`${url}/${str}`, data, getHeaders()).then((r) => r.data);
}

export function _patch(str, data) {
  return axios.patch(`${url}/${str}`, data, getHeaders()).then((r) => r.data);
}

export function _delete(str) {
  return axios.delete(`${url}/${str}`, getHeaders()).then((r) => r.data);
}

export function _coursename(b, id) {
  let test = b.some((x) => x._id === id);
  if (test) {
    let obj = b.find((x) => x._id === id);
    return obj.name;
  } else {
    return "unknown course";
  }
}

export function findIArr(a, id, col) {
  let test = a.some((x) => x._id === id);
  if (test) {
    let obj = a.find((x) => x._id === id);
    return obj[col];
  } else {
    return "NA";
  }
}

export function _cal() {
  let curyear = new Date().getFullYear();
  let curmonth = new Date().getMonth() + 1;
  let totaldays = new Date(curyear, curmonth, 0).getDate();
  let a = new Array(totaldays).fill(0);
  a = a.map((item, index) => index + 1);
  a = a.map((x) => (x.toString().length === 2 ? x : `0${x}`));
  return a;
}

export function _batchExists(a, num) {
  return a.some((x) => +x.createdAt.split(" ")[2] === +num);
}

export function _batchCount(a, num) {
  if (_batchExists(a, num)) {
    return a.filter((x) => +x.createdAt.split(" ")[2] === +num).length;
  } else {
    return null;
  }
}
