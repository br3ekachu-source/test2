'use client';
import { Card, Col, Row, Typography, notification } from 'antd';
import { useRouter } from 'next/navigation';
import { HistoryOutlined, KeyOutlined } from '@ant-design/icons';

export const CreateAdvert = () => {
    const router = useRouter();

    return (
        <div>
            <Typography.Title
                level={2}
                style={{
                    marginTop: '18px',
                    marginBottom: '48px'
                }}
            >
                Какое объявление хотите разместить?
            </Typography.Title>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card className='w-full' bordered={false} hoverable onClick={() => router.push('/create/sale')}>
                        <Card.Meta
                            avatar={<KeyOutlined style={{ fontSize: 28 }} />}
                            title='Объявление о продаже сунда'
                            description='Тысячи людей увидят объявление о продаже твоего сунда'
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        className='w-full'
                        bordered={false}
                        hoverable
                        onClick={() => router.push('/create/fracht')}
                    >
                        <Card.Meta
                            avatar={<HistoryOutlined style={{ fontSize: 28 }} />}
                            title='Объявление об аренде сунда'
                            description='Тысячи людей увидят объявление об аренде твоего сунда'
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
