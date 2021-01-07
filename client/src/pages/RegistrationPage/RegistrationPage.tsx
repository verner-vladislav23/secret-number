import React from 'react';
import {
  Row,
  Col,
  Button,
  Input,
  Form
} from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const RegistrationPage: React.FC = () => {
  return (
    <Row  justify="center" align="middle">
      <Col>
        <Form { ...layout }>
          <Form.Item
            label='Name'
          >
            <Input/>
          </Form.Item>
        </Form>

        <Form.Item
          label='Login'
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label='Password'
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Col>
    </Row>
  )
};

export default RegistrationPage;
