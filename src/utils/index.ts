import moment from 'moment';

export const log = (
  logFileName: string,
  logFunctionName: string,
  logMessage: string,
) => {
  if (__DEV__) {
    console.log(
      `[${logFileName}] - [${logFunctionName}] => `,
      `${JSON.stringify(logMessage)}`,
    );
  }
};

export const debounce = (func: any, wait: any, immediate: any) => {
  let timeout: any;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const formatTimeString = (
  time: any,
  noTextPrefix: any,
  breakLines = false,
) => {
  let now = moment();
  let yesterday = moment().subtract(1, 'day');

  let timeMoment = moment(time); //.utcOffset('+0100');
  let hour = timeMoment.get('hour');
  let minute = timeMoment.get('minute');
  let timeString = hour + ':' + (minute < 10 ? '0' + minute : minute);

  let prefix = '';
  let isToday = now.isSame(moment(time), 'day');
  let isYesterday = yesterday.isSame(moment(time), 'day');

  if (noTextPrefix || (!isToday && !isYesterday)) {
    prefix = timeMoment.format('DD.MM');
  } else if (isToday) {
    prefix = '';
  } else if (isYesterday) {
    prefix = 'I GÅR';
  }
  return prefix + (breakLines ? '\n' : ' ') + timeString;
};

export const convertHTMLtoString = (HTMLRaw: any) => {
  if (!HTMLRaw) {
    return '';
  }

  const regexConvertTagBr = /<[br][^>]*>/g;
  var result = HTMLRaw.replace(regexConvertTagBr, `\n`);

  try {
    const anchorRegex = /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g;
    const allAnchors = HTMLRaw.match(anchorRegex);
    if (allAnchors && allAnchors.length) {
      for (let i = 0; i < allAnchors.length; i++) {
        const anchor = allAnchors[i];
        const hrefRegex = /href=["'](.*?)["']/g;
        const hrefMatch = hrefRegex.exec(anchor);
        if (hrefMatch) {
          result = result.replace(anchor, hrefMatch[1]);
        }
      }
    }
  } catch (ex) {
    //untested code so better safe than sorry
    console.debug(ex);
  }

  const regexRemoveTag = /<[a-zA-Z\/][^>]*>/g;
  result = result.replace(regexRemoveTag, ``);
  return result;
};
