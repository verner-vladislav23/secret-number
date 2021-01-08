import React from 'react';
import {Button, Col, Input, Row, Select} from 'antd';

import {GameLevel} from '../../types/Game';
import {GAME_LEVEL_LABELS} from '../../constants/game';
import GameService from '../../services/GameService';

const GamePage: React.FC = () => {
  const [gameId, setGameId] = React.useState<number | null>(null);
  const [secretNumber, setSecretNumber] = React.useState<string>('');
  const [comparedNumber, setComparedNumber] = React.useState<string>('');
  const [level, setLevel] = React.useState<number>(4);

  const onStartGame = async () => {
    try {
      const { gameId } = await GameService.startGame({
        level,
      });

      setGameId(gameId);
    } catch (error) {
      console.log(error);
    }
  };

  const onMove = async () => {
    try {
      const { comparedNumber } = await GameService.move(gameId, {
        secretNumber,
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
          <React.Fragment>
            <h2>Уровень сложности</h2>
            <Select value={level} onChange={setLevel}>
              {Object.keys(GAME_LEVEL_LABELS).map((level: string) => (
                <Select.Option value={Number(level)}>{GAME_LEVEL_LABELS[level]}</Select.Option>
              ))}
            </Select>
            <Button onClick={onStartGame}>
              НАЧАТЬ ИГРУ
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1>{comparedNumber}</h1>
            <Input value={secretNumber} onChange={onInputSecretNumber} placeholder='Введите секретно число'/>
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
