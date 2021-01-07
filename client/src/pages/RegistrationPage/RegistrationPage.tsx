import React from 'react';
import {
  Row,
  Col,
  Button,
  Input,
  Form,
} from 'antd';

import { AuthService } from '../../services'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const RegistrationPage: React.FC = () => {
  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {

    try {
      const token = await AuthService.registration(values);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Row style={{ marginTop: '20%' }} justify="center" align="middle">
      <Col span={10}>
        <Form {...layout} form={form} onFinish={onSubmit}>
          <Form.Item
            label='Имя'
            name='name'
            rules={[
              {
                required: true,
                message: 'Укажите свое имя',
              }
            ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label='Логин'
            name='login'
            rules={
              [
                {
                  required: true,
                  message: 'Укажите логин',
                }
              ]
            }
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label='Пароль'
            name='password'
            rules={[
              {
                required: true,
                message: 'Укажите пароль'
              }
            ]}
          >
            <Input.Password/>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
};

export default RegistrationPage;
