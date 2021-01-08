import React from 'react';
import {
  message,
  Row,
  Col,
  Table,
  Tooltip,
  Button,
} from 'antd';
import moment from 'moment';

import { CheckCircleTwoTone, CloseCircleOutlined } from '@ant-design/icons';
import { GameService } from '../../services';

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
    dataIndex: 'level'
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
            <Tooltip title={dateFormatted} placement='top'>
              <CheckCircleTwoTone twoToneColor="#52c41a"/>
            </Tooltip>
          </React.Fragment>
        )
      }
    }
  }
];

const GamesPage: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [games, setGames] = React.useState([]);

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

  return (
    <Row justify="center" align="middle">
      <Col md={12} xs={12}>
        <Row style={{ marginBottom: '10px' }} justify='space-between'>
          <Col>
            <h3>Мои Игры</h3>
          </Col>
          <Col>
            <Button>
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
        />
      </Col>
    </Row>
  )
};

export default GamesPage;
