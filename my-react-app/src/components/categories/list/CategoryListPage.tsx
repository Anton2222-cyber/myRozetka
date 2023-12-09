import {Button, Card, Col, Popconfirm, Row} from "antd";
import {useEffect, useState} from "react";
import {ICategoryItem} from "../../../interfaces/categories";
import http_common from "../../../http_common.ts";
import {APP_ENV} from "../../../env";
import {Link, useNavigate} from "react-router-dom";
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';


const CategoryListPage = () => {
    const { Meta } = Card;
    const navigate = useNavigate();

    const [list, setList] = useState<ICategoryItem[]>([]);

    useEffect(() => {
        http_common.get<ICategoryItem[]>("/api/categories")
            .then(resp => {
                const { data } = resp;
                console.log("Good request", data);
                setList(data);
            })
            .catch(error => {
                console.log("Error server ", error);
            });
    }, []);

    const handleDeleteCategory = (id: number) => {
        console.log("delete id", id);
        try {
             http_common.delete(`/api/categories/${id}`);
            // Операція видалення успішна, оновлюємо список категорій або виконуємо інші дії

            const updatedList = list.filter(item => item.id !== id);
            setList(updatedList);
        } catch (error) {
            // Обробка помилок
            console.error('Помилка при видаленні категорії', error);
        }
    }

    const content = list.map(x => (
        <Col key={x.id} span={6}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Card
                    hoverable
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
                    cover={<img alt="example" src={`${APP_ENV.BASE_URL}/images/${x.image}`} />}
                    actions={[
                        <Popconfirm
                            title="Видалення категорії"
                            description="Підтвердити видалення категорії?"
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            cancelText="Ні"
                            okText="Так"
                            onConfirm={() => handleDeleteCategory(x.id)}
                        >
                            <DeleteOutlined key="delete" style={{ color: 'red' }} />
                        </Popconfirm>,
                        <EditOutlined
                            key="edit"
                            onClick={() => {
                                navigate(`/edit/${x.id}`);
                                console.log("OnClick edit", x.id);
                            }}
                        />,
                    ]}
                >
                    <Meta title={x.name} description={x.description} />
                </Card>
            </div>
        </Col>
    ));
    return (
        <>
            <h1>Список категорій</h1>
            <Link to={"/create"}>
                <Button type="primary">
                    Додати
                </Button>
            </Link>
            <Row gutter={16}>
                {content}
            </Row>
        </>
    );
}

export default CategoryListPage;