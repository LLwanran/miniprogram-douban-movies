const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

function getDate() {
  let time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth();
  month = month < 10 ? '0' + month : month;
  let day = time.getDay();
  day = day < 10 ? '0' + day : day;
  return [year, month, day].join('-');
}

function getTime() {
  let time = new Date();
  let hours = time.getHours();
  hours = hours < 10 ? '0' + hours : hours;
  let minutes = time.getMinutes();
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let second = time.getSeconds();
  second = second < 10 ? '0' + second : second;
  return [hours, minutes, second].join(':');
}

module.exports = {
  formatTime: formatTime,
  getDate: getDate,
  getTime: getTime
};
