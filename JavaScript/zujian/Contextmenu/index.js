/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Menu } from 'antd';
import styles from './index.less';

const { Item } = Menu;
let style;
let contextMenuConfig = {};
const RenderContextMenu = ({ config, eventPosition, showId }) => {
  const [showMenu, setShowMenu] = useState(true);
  const [styleLess, setStyleLess] = useState(null);
  const getMenuListStyle = () => {
    const baseStyle = {};
    let showMenuStyle = {};
    if (eventPosition) {
      let x = eventPosition.clientX;
      let y = eventPosition.clientY;
      const maxClientX = document.body.clientWidth - 113;
      const maxClientY = document.body.clientHeight - 162;
      if (x > maxClientX) {
        x = maxClientX;
      }
      if (y > maxClientY) {
        y = maxClientY;
      }
      showMenuStyle = {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: '90px',
        zIndex: '999',
      };
    }
    return Object.assign(baseStyle, showMenuStyle);
  };


  useEffect(() => {
    // const contextMenuNode = document.querySelector('.all-context-menu');
    const globalClick = () => {
      // let hasNode = false;
      // if (typeof e.target.className === 'string' && e.target.className) {
      //   const className = e.target.className.split(' ');
      //   hasNode = contextMenuNode.querySelector(`.${className[0]}`);
      // }
      // if (!hasNode) {
        setShowMenu(false);
        contextMenuConfig = {};
      // }
    };
    window.addEventListener('click', globalClick);
    return () => {
      window.removeEventListener('click', globalClick);
    };
  }, []);

  useEffect(
    () => {
      setShowMenu(true);
      style = getMenuListStyle();
      setStyleLess(style);
    },
    [showId],
  );

  return (
    <div style={styleLess} className={`${styles.rightMenuWrapper} ${config.className} ${!showMenu ? styles.hide : ''}`}>
      <Menu>
        {config.menuList.map((item, index) => (
          <Item { ...item } key={index.toString()}>
            {item.name}
          </Item>
        ))}
      </Menu>
    </div>
  );
};

const showContextMenu = (e, config, oldShowId) => {
  let contextMenuNode = document.querySelector('.all-context-menu');
  if (!contextMenuNode) {
    contextMenuNode = document.createElement('div');
    contextMenuNode.className = 'all-context-menu';
    document.body.append(contextMenuNode);
  }

  let eventPosition = null;
  const showId = new Date().getTime();
  if (oldShowId) {
    eventPosition = contextMenuConfig[oldShowId] ? contextMenuConfig[oldShowId].eventPosition : '';
  } else {
    eventPosition = { clientX: e.clientX, clientY: e.clientY };
    contextMenuConfig[showId] = { eventPosition, config }
  }

  const props = {
    config,
    showId: oldShowId || showId,
    eventPosition,
  };
  ReactDOM.render(
    <RenderContextMenu
      {...props}
    />,
    contextMenuNode,
  );
  return props.showId;
};

export default showContextMenu;
