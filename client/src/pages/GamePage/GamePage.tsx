import React from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  Row
} from 'antd';

import GameService  from '../../services/GameService';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const GamePage: React.FC = () => {
  const [gameId, setGameId] = React.useState<number | null>(null);
  const [secretNumber, setSecretNumber] = React.useState<string>('');
  const [comparedNumber, setComparedNumber] = React.useState<string>('');

  const onStartGame = async () => {
    try {
      const { gameId } = await GameService.startGame();
      setGameId(gameId);
    } catch (error) {
      console.log(error);
    }
  };

  const onMove = async () => {
    try {
      const { comparedNumber } = await GameService.move(gameId, {
        secretNumber
      });
      setComparedNumber(comparedNumber);
    } catch (error) {
      console.log(error)
    }
  };

  const onInputSecretNumber = (event: any) => {
    const { target: { value: secretNumber }} = event;

    setSecretNumber(secretNumber);
  };

  return (
    <Row style={{ marginTop: '20%' }} justify="center" align="middle">
      <Col span={10}>
        {!Boolean(gameId) ? (
          <Button onClick={onStartGame}>
            НАЧАТЬ ИГРУ
          </Button>
        ) : (
          <React.Fragment>
            <h1>{comparedNumber}</h1>
            <Input value={secretNumber} onChange={onInputSecretNumber} placeholder='Enter secret number'/>
            <Button onClick={onMove}>
              Угадать число
            </Button>
          </React.Fragment>
        )}
      </Col>
    </Row>
  )
};

export default GamePage;
