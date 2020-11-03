/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
import { errorHandler } from '@/components/ResultModal';
import { generatorNewValue } from '@/utils/common';
import cloneDeep from 'lodash-es';

class TableListBased {
  currentModal = null;

  listName = '';

  newListName = '';

  selectIdsName = '';

  pageName = '';

  listHandler = {};

  constructor(currentModal, listName, listHandler) {
    this.currentModal = currentModal;
    this.listName = listName;
    this.listHandler = listHandler;
    this.initKeyName();
    this.initState();
    this.initReducers();
    this.initEffects();
  }

  initKeyName() {
    this.newListName = `${this.listName}TableList`;
    this.selectIdsName = `${this.listName}SelectedIds`;
    this.pageName = `${this.listName}Page`;
  }

  initState() {
    this.currentModal.state[this.pageName] = {
      pageNum: 1,
      pageSize: 10,
      total: 0,
    };
    this.currentModal.state[this.newListName] = [];
    this.currentModal.state[this.selectIdsName] = [];
  }

  initReducers() {
    const that = this;
    generatorNewValue(
      this.currentModal.reducers,
      `set${this.listName}List`,
      (state, { payload }) => {
        const { showType } = payload;
        if (showType === 'table') {
          return {
            ...state,
            [that.pageName]: payload[that.pageName],
            [that.newListName]: payload[that.newListName],
            [that.selectIdsName]: payload[that.selectIdsName],
          };
        }

        if (payload[that.pageName].pageNum === 1) {
          return {
            ...state,
            [that.pageName]: payload[that.pageName],
            [that.newListName]: payload[that.newListName],
            [that.selectIdsName]: payload[that.selectIdsName],
          };
        }

        if (
          payload[that.pageName].pageNum === state[that.pageName].pageNum &&
          (state[that.pageName].pageNum !== 1 || state[that.newListName].length)
        ) {
          return { ...state };
        }

        return {
          ...state,
          [that.pageName]: payload[that.pageName],
          [that.newListName]: state[that.newListName].concat(payload[that.newListName]),
          [that.selectIdsName]: payload[that.selectIdsName],
        };
      },
    );

    generatorNewValue(
      this.currentModal.reducers,
      `setSelected${this.listName}`,
      (state, { payload }) => {
        const { selectedIds } = payload;
        return {
          ...state,
          [that.selectIdsName]: selectedIds,
        };
      },
    );

    generatorNewValue(
      this.currentModal.reducers,
      `update${this.listName}List`,
      (state, { payload }) => {
        const { newList, keyName } = payload; // newList为对象
        const newTableList = cloneDeep(state[that.newListName]);
        const newListProduct = [];
        newTableList.forEach(item => {
          if (newList[item[keyName]]) {
            item = { ...item, ...newList[item[keyName]] };
          }
          newListProduct.push(item);
        });
        return {
          ...state,
          [that.newListName]: newListProduct,
        };
      },
    );
    generatorNewValue(
      this.currentModal.reducers,
      `clear${this.listName}List`,
      state => ({
          ...state,
          [that.pageName]: {
            pageNum: 1,
            pageSize: 10,
            total: 0,
          },
          [that.newListName]: [],
          [that.selectIdsName]: [],
        }),
    );
  }

  initEffects() {
    const that = this;
    // eslint-disable-next-line func-names
    generatorNewValue(this.currentModal.effects, `get${this.listName}List`, function*(
      { payload },
      { call, put },
    ) {
      let pageData;
      const { pageNum, pageSize, requestTableParams, showType = 'table' } = payload;
      const { validFn } = requestTableParams || {};
      if (validFn && !validFn()) {
        pageData = { total: 0, data: [] };
      } else {
        const response = yield call(that.listHandler.get, payload);
        if (!errorHandler(response)) return;
        pageData = response.data;
      }
      const page = {
        pageNum,
        pageSize,
        total: pageData.total,
      };
      yield put({
        type: `set${that.listName}List`,
        payload: {
          [that.pageName]: page,
          [that.newListName]: pageData.data,
          [that.selectIdsName]: [],
          showType,
        },
      });
    });
  }
}
export default TableListBased;
