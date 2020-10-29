/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Calendar, Icon } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { getLoDayString } from './calendar';
import styles from './index.less';

let currentFirstDay = null;
const CalendarMix = props => {
  const { onDateRangeChanged, onSelectedDayChanged, renderDay, forceRefresh } = props;
  // const [dateRange, setDateRange] = useState(null);
  const [selectDay, setSelectDay] = useState(moment());
  const [value, setValue] = useState(moment());
  // const [type, setType] = useState('month');
  const onPanelChange = val => {
    currentFirstDay = null;
    setValue(val);
  };

  useEffect(() => () => {
      currentFirstDay = null;
    }, [])

  const dateFullCellRender = date => {
    if (!currentFirstDay) {
      currentFirstDay = date._d;
      const firstDay = _.cloneDeep(date);
      onDateRangeChanged && onDateRangeChanged(date, firstDay.add(41, 'days'));
    }
    const newDate = getLoDayString(date._d);
    const className = date.isSame(selectDay) ? 'select day-item' : 'day-item';
    const newDom = (renderDay && renderDay(date, newDate)) || newDate;
    return <div className={className}>{newDom}</div>;
  };

  //   useEffect(
  //     () => {
  //       if (type === 'month' && currentFirstDay) {
  //         // const firstDay = _.cloneDeep(currentFirstDay);
  //         // const lastDay = currentFirstDay.add(34, 'days');

  //         // setDateRange([firstDay, lastDay]);
  //       }
  //     },
  //     [currentFirstDay],
  //   );

  useEffect(
    () => {
      if (forceRefresh) {
        setValue(value);
      }
    },
    [forceRefresh],
  );

  const onSelect = date => {
    setSelectDay(date);
  };

  const changeMonth = type => {
    const firstDay = _.cloneDeep(value);
    if (type === 'prev') {
      setValue(firstDay.subtract(30, 'days'));
    } else {
      setValue(firstDay.add(30, 'days'));
    }
  };

  useEffect(
    () => {
      onSelectedDayChanged && onSelectedDayChanged(selectDay);
    },
    [selectDay],
  );

  return (
    <div className={styles.calendarContainer}>
      <Calendar
        className={styles.calendar}
        fullscreen={false}
        onPanelChange={onPanelChange}
        dateFullCellRender={dateFullCellRender}
        // validRange={dateRange}
        onSelect={onSelect}
        value={value}
      />
      <span
        className={styles.prevMonth}
        onClick={() => {
          changeMonth('prev');
        }}
      >
        <Icon type="left" />
      </span>
      <span
        className={styles.nextMonth}
        onClick={() => {
          changeMonth('next');
        }}
      >
        <Icon type="right" />
      </span>
    </div>
  );
};

export default CalendarMix;
