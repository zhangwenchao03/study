/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { List, Input, Icon } from 'antd';

import styles from './index.less';

const { Search } = Input;
const SearchSelect = ({ onSearch, menuList, onScroll, placeholder, onSelectedChanged,  }) => {
  const [showDown, setShowDown] = useState(true);
  const [values, setValues] = useState([]);
  const showDropdown = () => {
    setShowDown(true);
  };

  useEffect(() => {
    // const contextMenuNode = document.querySelector('.all-context-menu');
    const globalClick = e => {
        if (!(e.target.id === 'selectedInput') && !e.target.classList.contains('ant-btn') && !(e.target.parentElement.classList.contains('anticon-check') || (e.target.offsetParent && e.target.offsetParent.classList.contains('ant-spin-container')))) {
          setShowDown(false);
        }
      // }
    };
    window.addEventListener('click', globalClick);
    return () => {
      window.removeEventListener('click', globalClick);
    };
  }, []);

  const handleData = data => {
    const list = [];
    let isHas = false;
    values.forEach((item, index) => {
      if (item.value !== data.value) {
        list.push(item);
      } else {
        isHas = true;
        list.splice(index, 1);
      }
    });

    if (!isHas) {
      list.push(data);
    }
    setValues(list);
  };

  const onClick = content => {
    handleData(content);
  };

  useEffect(() => {
    onSelectedChanged(values);
  }, [values])

  const selectedKeys = values.map(item => item.value);
  return (
    <div className= {styles.searchSelect}>
      <div id="selectedInput" className={styles.selectName} onClick={showDropdown} placeholder = {placeholder}>
        {values.map(item => (
          <li className={styles.item}>
            <span>{item.content}</span>
            <Icon
              type="close"
              onClick={() => {
                onClick(item);
              }}
            />
          </li>
        ))}
      </div>
      {showDown && (
        <div className={styles.dropDownList}>
          <Search onSearch={onSearch} autoFocus placeholder = {placeholder}/>
          <List
            dataSource={menuList}
            onScroll = {onScroll}
            renderItem={item => (
              <List.Item
                key={item.value}
                onClick={() => {
                  onClick(item);
                }}
              >
                <div className={styles.itemLeft}>{item.content}</div>
                {selectedKeys.includes(item.value) && <Icon type="check" className={ styles.selectedIcon }/>}
              </List.Item>
            )}
          >
          </List>
        </div>
      )}
    </div>
  );
};

export default SearchSelect;
