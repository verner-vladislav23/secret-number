import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Row,
  Col,
  Button,
  Input,
  Form,
  message,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import AuthService from '../../services/AuthService';
import {
  isCorrectName,
  isCorrectLogin,
  isCorrectPassword
} from '../../utils/validators';


const RegistrationPage: React.FC = () => {
  const history = useHistory();

  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [form] = Form.useForm();

  const onSubmit = React.useCallback(async (values: any) => {
    setSubmitting(true);

      try {
        const { token } = await AuthService.registration(values);
        AuthService.setToken(token);

        if (Boolean(token)) {
          history.push('/app');
        }
      } catch (error) {
        message.error(error.message)
      }

    setSubmitting(false);
  }, [history]);

  return (
    <Row style={{ marginTop: '200px' }} justify="center" align="middle">
      <Col md={12} xs={12} lg={12}>
        <Form form={form} onFinish={onSubmit}>
          <h1>Регистрация</h1>
          <Form.Item
            name='name'
            rules={[
              {
                required: true,
                message: 'Укажите свое имя',
              },
              {
                validator: async (cc, name: string) => {
                  if (!isCorrectName(name)) {
                    return Promise.reject(new Error('Используйте только буквы'))
                  }
                }
              }
            ]}
            hasFeedback
          >
            <Input
              prefix={<UserOutlined/>}
              placeholder='Введите свое имя'
              disabled={submitting}
            />
          </Form.Item>

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
                  Зарегистрироваться
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <div style={{ float: 'right' }}>
                <Link to='/auth/login'>
                  Войти в аккаунт
                </Link>
              </div>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
};

export default RegistrationPage;
