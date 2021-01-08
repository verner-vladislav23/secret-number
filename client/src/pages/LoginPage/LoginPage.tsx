import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  message,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import AuthService from '../../services/AuthService';
import { isCorrectLogin, isCorrectPassword } from "../../utils/validators";

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const onSubmit = React.useCallback( async (values) => {
    setSubmitting(true);
    try {
      const { token } = await AuthService.login(values);
      AuthService.setToken(token);

      if (Boolean(token)) {
        history.push('/games');
      }
    } catch (error) {
      message.error(error.message);
    }

    setSubmitting(false);
  }, [history]);

  return (
    <Row style={{ marginTop: '200px' }} justify="center" align="middle">
      <Col md={8} xs={12}>
        <Form form={form} onFinish={onSubmit}>
        <h1>Авторизация</h1>
          <Form.Item
            name='login'
            rules={
              [
                {
                  required: true,
                  message: 'Укажите логин',
                },
                {
                  validator: async (cc, login: string) => {
                    if (!isCorrectLogin(login)) {
                      return Promise.reject(new Error('Некорректный логин'))
                    }
                  }
                }
              ]
            }
            hasFeedback
          >
            <Input
              prefix={<UserOutlined/>}
              placeholder='Введите логин'
              disabled={submitting}
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Укажите пароль',
              },
              {
                validator: async (cc, password: string) => {
                  if (!isCorrectPassword(password)) {
                    return Promise.reject(new Error('Минимальная длина пароля 5'))
                  }
                }
              }
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined/>}
              placeholder='Введите пароль'
              disabled={submitting}
            />
          </Form.Item>

          <Row justify="space-between">
            <Col>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={submitting}
                >
                  Войти
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <div style={{ float: 'right' }}>
                <Link to='/auth/registration'>
                  Зарегестрироваться
                </Link>
              </div>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
};

export default LoginPage;

