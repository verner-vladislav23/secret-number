import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  message,
  Row,
  Col,
  Table,
  Tooltip,
  Button,
  Modal,
  Select,
} from 'antd';
import moment from 'moment';

import { GAME_LEVEL_LABELS } from '../../constants/game'
import { GameLevel } from '../../types/Game';
import { CheckCircleTwoTone, CloseCircleOutlined } from '@ant-design/icons';
import { GameService } from '../../services';

const { confirm } = Modal;

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Дата старта',
    dataIndex: 'created_at',
    render: (createdAt: string) => (
      moment(createdAt).format('DD.MM.YY HH:mm:ss')
    )
  },
  {
    title: 'Кол-во ходов',
    dataIndex: 'count_moves',
  },
  {
    title: 'Сложность',
    dataIndex: 'level',
    render: (level: number) =>
      <span>
        {GAME_LEVEL_LABELS[level]}
      </span>
  },
  {
    title: 'Завершена',
    dataIndex: 'finish_at',
    render: (finishAt: string) => {
      if (!Boolean(finishAt)) {
        return <CloseCircleOutlined/>
      } else {
        const dateFormatted = moment(finishAt).format('DD.MM.YY HH:mm:ss');
        return (
          <React.Fragment>
            <Tooltip title={`Завершена ${dateFormatted}`} placement='top'>
              <CheckCircleTwoTone twoToneColor="#52c41a"/>
            </Tooltip>
          </React.Fragment>
        )
      }
    }
  }
];

const GamesPage: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [games, setGames] = React.useState([]);
  const [level, setLevel] = React.useState<number>(GameLevel.Normal);

  React.useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);

      try {
        const { games } = await GameService.getList();
        setGames(games);
      } catch (error) {
        message.error(error.message);
      }

      setLoading(false);
    };

    fetchGames();
  }, []);

  const onStartGame = React.useCallback(async () => {
    setLoading(true);

    try {
      const { gameId } = await GameService.startGame({ level });
      history.push(`/games/${gameId}`);
    } catch (error) {
      message.error(error.message);
    }

    setLoading(false);
  }, [level]);

  const showStartGameModal = () => {
    confirm({
      title: 'Выберите уровень сложности',
      content: (
        <Select value={level} onChange={setLevel}>
          {Object.keys(GAME_LEVEL_LABELS).map((level: string) => (
            <Select.Option value={Number(level)}>
              {GAME_LEVEL_LABELS[level]}
            </Select.Option>
          ))}
        </Select>
      ),
      onOk: onStartGame,
      onCancel() {},
      okText: 'Старт',
      cancelText: 'Отмена'
    });
  };

  return (
    <Row justify="center" align="middle">
      <Col md={12} xs={12}>
        <Row style={{ marginBottom: '10px', marginTop: '100px' }} justify='space-between'>
          <Col>
            <h3>Мои Игры</h3>
          </Col>
          <Col>
            <Button onClick={showStartGameModal}>
              Новая игра
            </Button>
          </Col>
        </Row>

        <Table
          rowKey='id'
          dataSource={games}
          loading={loading}
          columns={columns}
          size='small'
          pagination={false}
        />
      </Col>
    </Row>
  )
};

export default GamesPage;
