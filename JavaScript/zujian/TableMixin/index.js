/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-this-in-sfc */
import React, { Component } from 'react';
import { Table } from 'antd';
import showContextMenu from '@/components/Contextmenu';
import { isEqualToObject } from '@/utils/arrayUtil';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash-es';
import styles from './index.less';

class TableMixin extends Component {
  state = {
    fitPageSize: '',
  };

  searchContent = {};

  selectedRowInfo = null;

  rightClick = null;

  componentDidMount() {
    const { parentClass, wrappedComponentRef } = this.props;
    const parentNode = document.querySelector(`.${parentClass}`);
    const tableHeight = parentNode.clientHeight - 124;
    const defaultPageSize = parseInt(tableHeight / 40, 10).toString();
    wrappedComponentRef && wrappedComponentRef(this);
    this.getTableList({ num: 1, size: defaultPageSize });
    this.setState({ fitPageSize: defaultPageSize });
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqualToObject(this.props.requestTableParams, nextProps.requestTableParams)) {
      this.getTableList({ num: 1, size: this.state.fitPageSize }, nextProps.requestTableParams);
    }
    if (!isEqual(nextProps.contextMenuConfig, this.props.contextMenuConfig) && this.rightClick) {
      showContextMenu(null, nextProps.contextMenuConfig, this.rightClick);
    }
  }

  getTableList = ({ num, size }, otherParams) => {
    const { dispatch, urls, requestTableParams } = this.props;
    const {
      pageOptions: { pageNum, pageSize },
    } = this.props;
    dispatch({
      type: urls.get,
      payload: {
        requestTableParams: otherParams || requestTableParams,
        pageSize: size || pageSize,
        pageNum: num || pageNum,
        ...this.searchContent,
      },
    });
  };

  onShowSizeChange = (current, size) => {
    this.getTableList({ num: current, size });
  };

  setSearchContent = content => {
    this.searchContent = content;
    this.getTableList({});
  };

  onContextMenu = event => {
    const { contextMenuConfig } = this.props;
    this.rightClick = showContextMenu(event, contextMenuConfig);
  };

  handleSingleClick = record => {
    const { handleSingleClick } = this.props;
    if (handleSingleClick && typeof handleSingleClick === 'function') {
      handleSingleClick(record)
    }
  }

  onRowHandler = (record, index) => ({
    onClick: () => {
      this.handleSingleClick(record)
      this.selectedRowInfo = record;
      const newState = {
        ...this.state,
        singleSelectedIndex: index,
      };
      this.setState(newState);
      const { rowClicked } = this.props;
      rowClicked && rowClicked(record);
    },
    onContextMenu: event => {
      this.selectedRowInfo = record;
      this.handleSingleClick(record)
      const newState = {
        ...this.state,
        singleSelectedIndex: index,
      };
      this.setState(newState);
      const { contextMenuCallback } = this.props;
      contextMenuCallback && contextMenuCallback(record);
      this.onContextMenu(event, record);
    },
  });

  getSelectedRow = () => this.selectedRowInfo

  selectRowChanged = item => {
    const { dispatch, urls, onSelectedRow } = this.props;
    onSelectedRow && onSelectedRow(item);
    dispatch({
      type: urls.select,
      payload: {
        selectedIds: item,
      },
    });
  };

  getCheckBoxSelected = () => {
    const { selectedRowIds, tableList } = this.props;
    const selectedRows = [];
    selectedRowIds.forEach(item => {
      selectedRows.push(tableList[item]);
    })

    return selectedRows;
  }

  setRowClassName = (record, index) => (index === this.state.singleSelectedIndex ? styles.singleSelect : '')

  render() {
    const {
      parentClass,
      tableList,
      pageSizeOptions,
      tableProperty,
      pageOptions,
      selectedRowIds,
      tableType,
    } = this.props;
    const rowSelection =
      tableType === 'checkbox'
        ? {
            type: tableType,
            selectedRowKeys: selectedRowIds,
            onChange: this.selectRowChanged,
          }
        : null;
    const { fitPageSize } = this.state;
    const { pageNum, total, pageSize } = pageOptions || {};
    return (
      <>
        <div className={`${styles.tableContainer} ${parentClass}`}>
          <Table
            dataSource={tableList}
            className={styles.tableStyle}
            tableLayout="auto"
            pagination={{
              current: pageNum,
              showTotal: tot => `共${tot}条`,
              showSizeChanger: true,
              pageSizeOptions: [fitPageSize].concat(pageSizeOptions),
              onShowSizeChange: this.onShowSizeChange,
              onChange: this.onShowSizeChange,
              total: parseInt(total, 10),
              pageSize: parseInt(pageSize || fitPageSize, 10),
            }}
            rowSelection={rowSelection}
            onRow={this.onRowHandler}
            rowClassName={this.setRowClassName}
            scroll={tableList && tableList.length ? { x: tableProperty.columns.length * 200 } : { x: '100%' }}
            {...tableProperty}
          />
        </div>
      </>
    );
  }
}
TableMixin.propsTypes = {
  tableType: PropTypes.string, // table前面是单选还是多选，单选传'radio',多选传‘checkbox’，默认不传，不传前面没有任何选中框
  pageSizeOptions: Array, // 默认分页数
  tableProperty: {}, // TABLE表格的属性，是ANTD的API；
  urls: { get: '', delete: '', update: '', add: '' }, // TABLE表格的的增删改查的dispatch的URL；
  parentClass: '', // table表格的容器类名；
  contextMenuConfig: [], // 右键列表
  wrappedComponentRef: PropTypes.func, // 获取当前TABLEMIXIN的实例
  onSelectedRow: PropTypes.func, // 当复选框选中时的回调
  requestTableParams: {}, // 默认请求TABLE列表的参数
  // 注意一下：connectFn返回的值为： tableList， pageOptions， selectedRowIds；传入时为这几个名称
};

export default TableMixin;
