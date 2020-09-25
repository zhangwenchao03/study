import { connect } from 'dva';

export const MixinHoc = (connectFn, componentWrapper) => connect(connectFn)(componentWrapper);
