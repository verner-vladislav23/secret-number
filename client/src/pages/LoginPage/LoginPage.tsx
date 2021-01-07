import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Row,
  Col,
  Form,
  Input,
  Button
} from 'antd';

import AuthService from '../../services/AuthService';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


const LoginPage: React.FC = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const onSubmit = React.useCallback( async (values) => {
    try {
      const { token } = await AuthService.login(values);
      AuthService.setToken(token);

      if (Boolean(token)) {
        history.push('/app');
      }
    } catch (error) {
      console.log(error)
    }
  }, [history]);

  return (
    <Row style={{ marginTop: '20%' }} justify="center" align="middle">
      <Col span={10}>
        <Form {...layout} form={form} onFinish={onSubmit}>

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

export default LoginPage;

