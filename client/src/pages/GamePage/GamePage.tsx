import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Col,
  Input,
  Row,
  Card,
  Typography, message
} from 'antd';

import GameService from '../../services/GameService';

const { Title } = Typography;

const GamePage: React.FC = () => {
  const { id: gameId } = useParams<{ id: string | undefined }>();

  const [comparing, setComparing] = React.useState<boolean>(false);
  const [secretNumber, setSecretNumber] = React.useState<string>('');
  const [comparedNumber, setComparedNumber] = React.useState<string>('');

  const onMove = React.useCallback(async () => {
    setComparing(true);

    try {
      const { comparedNumber, finished } = await GameService.move(Number(gameId), {
        secretNumber
      });

      setComparedNumber(comparedNumber);
    } catch (error) {
      message.error(error.message);
    }

    setComparing(false);
  }, [secretNumber]);

  const onInputSecretNumber = (event: any) => {
    const { target: { value: secretNumber }} = event;

    setSecretNumber(secretNumber);
  };

  return (
    <Row style={{ marginTop: '250px' }} justify="center" align="middle">
      <Col md={4}>
        <Card style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Title style={{ letterSpacing: '0.4em'}} level={3}>
            {comparedNumber}
          </Title>
        </Card>

        <Input
          placeholder='Введите загаданное число'
          style={{ marginBottom: '20px' }}
          onChange={onInputSecretNumber}
        />

        <Button
          type='primary'
          style={{ width: '100%'}}
          onClick={onMove}
          disabled={comparing}
        >
          Проверить
        </Button>
      </Col>
    </Row>
  )
};

export default GamePage;
