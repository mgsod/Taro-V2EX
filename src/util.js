export const miniTolarge = (url) => {
  return url && url.replace(/mini/, 'large')
};
export const timeToString = (last) => {
  const now = +Date.now();
  const duration = (now - (last * 1000));
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (duration > day) {
    return `${parseInt(duration / day)}天前`
  }
  if (duration > hour) {
    return `${parseInt(duration / hour)}小时前`
  }

  if (duration > minute) {
    return `${parseInt(duration / minute)}分钟前`
  }
  if (duration > 1000) {
    return `${duration}秒前`
  }

};
