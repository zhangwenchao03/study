/* eslint-disable consistent-return */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
const lunarInfo = [
  0x04bd8,
  0x04ae0,
  0x0a570,
  0x054d5,
  0x0d260,
  0x0d950,
  0x16554,
  0x056a0,
  0x09ad0,
  0x055d2,
  0x04ae0,
  0x0a5b6,
  0x0a4d0,
  0x0d250,
  0x1d255,
  0x0b540,
  0x0d6a0,
  0x0ada2,
  0x095b0,
  0x14977,
  0x04970,
  0x0a4b0,
  0x0b4b5,
  0x06a50,
  0x06d40,
  0x1ab54,
  0x02b60,
  0x09570,
  0x052f2,
  0x04970,
  0x06566,
  0x0d4a0,
  0x0ea50,
  0x06e95,
  0x05ad0,
  0x02b60,
  0x186e3,
  0x092e0,
  0x1c8d7,
  0x0c950,
  0x0d4a0,
  0x1d8a6,
  0x0b550,
  0x056a0,
  0x1a5b4,
  0x025d0,
  0x092d0,
  0x0d2b2,
  0x0a950,
  0x0b557,
  0x06ca0,
  0x0b550,
  0x15355,
  0x04da0,
  0x0a5d0,
  0x14573,
  0x052d0,
  0x0a9a8,
  0x0e950,
  0x06aa0,
  0x0aea6,
  0x0ab50,
  0x04b60,
  0x0aae4,
  0x0a570,
  0x05260,
  0x0f263,
  0x0d950,
  0x05b57,
  0x056a0,
  0x096d0,
  0x04dd5,
  0x04ad0,
  0x0a4d0,
  0x0d4d4,
  0x0d250,
  0x0d558,
  0x0b540,
  0x0b5a0,
  0x195a6,
  0x095b0,
  0x049b0,
  0x0a974,
  0x0a4b0,
  0x0b27a,
  0x06a50,
  0x06d40,
  0x0af46,
  0x0ab60,
  0x09570,
  0x04af5,
  0x04970,
  0x064b0,
  0x074a3,
  0x0ea50,
  0x06b58,
  0x055c0,
  0x0ab60,
  0x096d5,
  0x092e0,
  0x0c960,
  0x0d954,
  0x0d4a0,
  0x0da50,
  0x07552,
  0x056a0,
  0x0abb7,
  0x025d0,
  0x092d0,
  0x0cab5,
  0x0a950,
  0x0b4a0,
  0x0baa4,
  0x0ad50,
  0x055d9,
  0x04ba0,
  0x0a5b0,
  0x15176,
  0x052b0,
  0x0a930,
  0x07954,
  0x06aa0,
  0x0ad50,
  0x05b52,
  0x04b60,
  0x0a6e6,
  0x0a4e0,
  0x0d260,
  0x0ea65,
  0x0d530,
  0x05aa0,
  0x076a3,
  0x096d0,
  0x04bd7,
  0x04ad0,
  0x0a4d0,
  0x1d0b6,
  0x0d250,
  0x0d520,
  0x0dd45,
  0x0b5a0,
  0x056d0,
  0x055b2,
  0x049b0,
  0x0a577,
  0x0a4b0,
  0x0aa50,
  0x1b255,
  0x06d20,
  0x0ada0,
];

const solarMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const Animals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
const solarTerm = [
  '小寒',
  '大寒',
  '立春',
  '雨水',
  '惊蛰',
  '春分',
  '清明',
  '谷雨',
  '立夏',
  '小满',
  '芒种',
  '夏至',
  '小暑',
  '大暑',
  '立秋',
  '处暑',
  '白露',
  '秋分',
  '寒露',
  '霜降',
  '立冬',
  '小雪',
  '大雪',
  '冬至',
];
const sTermInfo = [
  0,
  21208,
  42467,
  63836,
  85337,
  107014,
  128867,
  150921,
  173149,
  195551,
  218072,
  240693,
  263343,
  285989,
  308563,
  331033,
  353350,
  375494,
  397447,
  419210,
  440795,
  462224,
  483532,
  504758,
];
const nStr1 = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
const nStr2 = ['初', '十', '廿', '卅'];
// 公历节日
const sFtv = [
  '0101 元旦',
  '0214 情人节',
  '0308 妇女节',
  '0312 植树节',
  // '0315 消费者权益日',
  '0401 愚人节',
  '0501 劳动节',
  '0504 青年节',
  '0512 护士节',
  '0601 儿童节',
  '0701 建党节',
  '0801 建军节',
  '0910 教师节',
  // '0928 孔子诞辰',
  '1001 国庆节',
  // '1006 老人节',
  // '1024 联合国日',
  '1224 平安夜',
  '1225 圣诞节',
];
// 农历节日
const lFtv = [
  '0101 春节',
  '0115 元宵节',
  '0505 端午节',
  '0707 七夕情人节',
  '0715 中元节',
  '0815 中秋节',
  '0909 重阳节',
  '1208 腊八节',
  '1001 寒衣节',
  '1224 小年',
  '1231 除夕',
];
// 返回农历y年的总天数
function lYearDays(y) {
  let i;
  let sum = 348;
  for (i = 0x8000; i > 0x8; i >>= 1) sum += lunarInfo[y - 1900] & i ? 1 : 0;
  return sum + leapDays(y);
}
// 返回农历y年闰月的天数
function leapDays(y) {
  if (leapMonth(y)) return lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
  return 0;
}
// 判断y年的农历中那个月是闰月,不是闰月返回0
function leapMonth(y) {
  return lunarInfo[y - 1900] & 0xf;
}
// 返回农历y年m月的总天数
function monthDays(y, m) {
  return lunarInfo[y - 1900] & (0x10000 >> m) ? 30 : 29;
}
// 计算当前公历对应的农历年月日
export function Dianaday(objDate) {
  let leap = 0;
  let temp = 0;
  let i;
  const baseDate = new Date(1900, 0, 31);
  let offset = (objDate - baseDate) / 86400000;
  this.dayCyl = offset + 40;
  this.monCyl = 14;
  for (i = 1900; i < 2050 && offset > 0; i++) {
    temp = lYearDays(i);
    offset -= temp;
    this.monCyl += 12;
  }
  if (offset < 0) {
    offset += temp;
    i--;
    this.monCyl -= 12;
  }
  this.year = i;
  this.yearCyl = i - 1864;
  leap = leapMonth(i); // 闰哪个月
  this.isLeap = false;
  for (i = 1; i < 13 && offset > 0; i++) {
    if (leap > 0 && i === leap + 1 && this.isLeap === false) {
      // 闰月
      --i;
      this.isLeap = true;
      temp = leapDays(this.year);
    } else {
      temp = monthDays(this.year, i);
    }
    if (this.isLeap === true && i === leap + 1) this.isLeap = false; // 解除闰月
    offset -= temp;
    if (this.isLeap === false) this.monCyl++;
  }
  if (offset === 0 && leap > 0 && i === leap + 1) {
    if (this.isLeap) {
      this.isLeap = false;
    } else {
      this.isLeap = true;
      --i;
      --this.monCyl;
    }
  }
  if (offset < 0) {
    offset += temp;
    --i;
    --this.monCyl;
  }
  this.month = i;
  this.day = offset + 1;
}

// 用中文显示农历的日期
function cDay(d) {
  let s;
  switch (d) {
    case 10:
      s = '初十';
      break;
    case 20:
      s = '二十';
      break;
    case 30:
      s = '三十';
      break;
    default:
      s = nStr2[Math.floor(d / 10)];
      // s += nStr1[d % 10];
      s += nStr1[parseInt(d % 10, 10)];
      break;
  }
  return s;
}
// 计算当前日期对应的节气
const setCurrentDayTerm = (y, m, sDay) => {
  const tmp1 = sTerm(y, m * 2);
  const tmp2 = sTerm(y, m * 2 + 1); // 每个月有两个节气，sTerm算出节气对应的日期
  if (tmp1 === sDay) {
    return solarTerm[m * 2];
  }
  if (tmp2 === sDay) {
    return solarTerm[m * 2 + 1];
  }
  // if ((firstWeek + 12) % 7 === 5) {
  //   // 黑色星期五
  //   element.solarFestival += '黑色星期五';
  // }
};

// 计算当前日期对应的农历节日
const setCurrentDayLFestival = (lYear, lMonth, lDay, isLeap) => {
  for (let ipp = 0; ipp < lFtv.length; ipp++) {
    // 农历节日
    if (parseInt(lFtv[ipp].substr(0, 2), 0) === parseInt(lMonth, 0)) {
      const isLastDayByLyear = isLeap ? leapDays(lYear) : monthDays(lYear, lMonth);
      if (
        parseInt(lFtv[ipp].substr(2, 4), 0) === parseInt(lDay, 0) ||
        (isLastDayByLyear === lDay && parseInt(lFtv[ipp].substr(2, 4), 0) === 31)
      ) {
        return lFtv[ipp].substr(5);
      }
    }
  }
};
// 计算当前日期对应的公历节日
const setCurrentDaySFestival = (SM, sD, fat) => {
  for (let ipp = 0; ipp < sFtv.length; ipp++) {
    // 公历节日
    if (parseInt(sFtv[ipp].substr(0, 2), 0) === SM + 1) {
      if (parseInt(sFtv[ipp].substr(2, 4), 0) === sD) {
        return sFtv[ipp].substr(5);
      }
    }
  }
  if (SM + 1 === 5) {
    // 母亲节
    if (fat === 0) {
      if (sD + 1 === 7) {
        return '母亲节';
      }
    } else if (fat < 9) {
      if (sD + 1 === 7 - fat + 8) {
        return '母亲节';
      }
    }
  }
  if (SM + 1 === 6) {
    // 父亲节
    if (fat === 0) {
      if (sD + 1 === 14) {
        return '父亲节';
      }
    } else if (fat < 9) {
      if (sD + 1 === 7 - fat + 15) {
        return '父亲节';
      }
    }
  }
};

// 记录公历和农历某天的日期
function calElement(sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap, firstWeek) {
  this.isToday = false;
  // 公历
  this.sYear = sYear;
  this.sMonth = sMonth;
  this.sDay = sDay;
  this.week = week;
  // 农历
  this.lYear = lYear;
  this.lMonth = lMonth;
  this.lDay = lDay;
  this.isLeap = isLeap;
  // 节日记录
  this.lunarFestival = setCurrentDayLFestival(lYear, lMonth, lDay, isLeap); // 农历节日
  this.solarFestival = setCurrentDaySFestival(sMonth - 1, sDay, firstWeek); // 公历节日
  this.solarTerms = setCurrentDayTerm(sYear, sMonth - 1, sDay); // 节气
}

// 返回某年的第n个节气为几日(从0小寒起算)
function sTerm(y, n) {
  const offDate = new Date(
    31556925974.7 * (y - 1900) + sTermInfo[n] * 60000 + Date.UTC(1900, 0, 6, 2, 5),
  );
  return offDate.getUTCDate();
}

export const getLoDayString = date => {
  const y = date.getFullYear();
  const m = date.getMonth();
  const i = date.getDate();
  const sDObj = new Date(y, m, 1);
  const firstWeek = sDObj.getDay(); // 当月第一天星期几

  const lDate = new Dianaday(date);
  const lY = lDate.year; // 农历年
  const lM = lDate.month; // 农历月
  let lD = lDate.day; // 农历日
  const lL = lDate.isLeap; // 农历是否闰月
  const element = new calElement(
    y,
    m + 1,
    i,
    nStr1[(i + firstWeek) % 7],
    lY,
    lM,
    lD++,
    lL,
    firstWeek,
  );
  // 获得农历的年月日和公里的年月日/节气/节日
    const className = element.solarFestival || element.lunarFestival ? 'lS festivalStyle' : 'lS';
  return (
    <div>
      <div className="gDStyle">{element.sDay}</div>
      <div className={className}>
        {element.solarFestival || element.lunarFestival || element.solarTerms || cDay(element.lDay)}
      </div>
      {/* <div>{element.solarFestival}</div>
      <div>{element.lunarFestival}</div> */}
    </div>
  );
};
