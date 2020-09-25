/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { Form, Icon, Upload, Input, Checkbox, Radio, Select, DatePicker, Button } from 'antd';
import TrimInput from '@/components/TrimInput';
import TrimTextArea from '@/components/TrimInput/trimTextArea';
import { getBase64 } from '@/utils/imageUtil';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;
class FormMixin extends React.Component {
  state = {
    uploadLoading: false,
    imgUrl: '',
  }

  // eslint-disable-next-line react/sort-comp
  getItemElement = (item, element, content) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return item.key ? <FormItem {...item.formItem} key={item.key}>
      {getFieldDecorator(item.key, { ...item.decorators })(element)}
      {content || item.content}
    </FormItem>
    :
    <FormItem {...item.formItem} key={item.key}>
      {element}
    </FormItem>
    };

  uploadButton = (
    <div>
      <Icon type={this.state.uploadLoading ? 'loading' : 'plus'} />
    </div>
  );

  handleChange = (item, info) => {
    const { elementInfo } = item;
    const { onHandleChange } = elementInfo;
    if (info.file.status === 'uploading') {
      this.setState({ uploadLoading: true })
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({ uploadLoading: false, imgUrl: imageUrl })
        if (onHandleChange) {
          onHandleChange(info.file.originFileObj, item, imageUrl);
        }
      });
    }
  };

  formItem = {
    inputItem: item => this.getItemElement(item, <TrimInput {...item.elementInfo} />),
    textAreaItem: item => this.getItemElement(item, <TrimTextArea {...item.elementInfo} />),
    uploadImgItem: item =>
    this.getItemElement(
        item,
      <Upload
          name="avatar"
          listType="picture-card"
          method="get"
          showUploadList={false}
          accept=".jpg,.png"
          className={styles.upload}
          onChange = {this.handleChange.bind(null, item)}
          {...item.elementInfo}
        >
        {item.value ? (
          <img src={this.state.imgUrl || `${process.env.uapPortalUrl}file/${item.value}`} alt="avatar" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          ) : (
            this.uploadButton
          )}
      </Upload>,
      ),
    uploadFileItem: item =>
    this.getItemElement(
        item,
      <Upload
          name="file"
          listType="picture-card"
          method="get"
          showUploadList={false}
          accept=".xls,.xlsx"
          {...item.elementInfo}
        >
      </Upload>,
      ),
    checkboxItem: item =>
    this.getItemElement(
        item,
      <Checkbox.Group {...item.elementInfo}>
        {item.checkboxList.map((checkbox, ind) => (
          <Checkbox key={ind.toString()} {...checkbox}>
            {checkbox.content}
          </Checkbox>
          ))}
      </Checkbox.Group>,
      ),
    radioItem: item =>
    this.getItemElement(
        item,
      <Radio.Group {...item.elementInfo}>
        {item.radioList.map((radio, ind) => (
          <Radio key={ind.toString()} {...radio}>
            {radio.content}
          </Radio>
          ))}
      </Radio.Group>,
      ),
    selectItem: item =>
    this.getItemElement(
        item,
      <Select {...item.elementInfo}>
        {item.selectList && item.selectList.length > 0
            ? item.selectList.map((select, ind) => (
              <Option {...select} key={ind.toString()}>
                {select.content}
              </Option>
              ))
            : ''}
      </Select>,
      ),
    textItem: item =>
    this.getItemElement(
        item,
      <div {...item.formItem}>
        <span {...item.elementInfo}>{item.value}</span>
      </div>,
      ),
    dateTimeItem: item =>
    this.getItemElement(item,
      <DatePicker
      {...item.elementInfo}
      />,
    ),
    rangeDateTimeItem: item =>
    this.getItemElement(item,
      <RangePicker
      {...item.elementInfo}
      />,
    ),
    buttonItem: item =>
    this.getItemElement(item,
      <Button {...item.elementInfo}>{item.value}</Button>,
    ),
    searchItem: item => this.getItemElement(item, <Search {...item.elementInfo} />),
  };

  render () {
    const { config } = this.props;
    return (
      <Form {...config.form}>
        {config.formList.map((item, ind) =>
          (item.cols && item.cols.length > 0 ? (
            <div {...item.parent} key = {ind.toString()}>
              <span {...item.leftChild}>{item.leftChild.content}</span>
              <div {...item.rightChild}>
                {item.cols.map(col => this.formItem[`${col.type}Item`](col, ind))}
              </div>
            </div>
          ) : (
            this.formItem[`${item.type}Item`](item, ind)
          )),
        )}
      </Form>
    );
  }
}

const index = Form.create({
  onFieldsChange(props, changedFields) {
    const { onChange } = props;
    onChange && onChange(changedFields);
  },

  mapPropsToFields(props) {
    const { config } = props;
    const formFields = {};
    config.formList.forEach(item => {
      formFields[item.key] = Form.createFormField({
        value: item.value,
      });
      item.cols && item.cols.forEach(col => {
        formFields[col.key] = Form.createFormField({
          value: col.value,
        });
      })
    });
    return formFields;
  },
})(FormMixin);

export default index;
