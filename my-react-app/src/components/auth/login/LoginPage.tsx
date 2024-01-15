import { useContext, useState } from "react";
import { Button, Form, Input, message, Row, Spin } from "antd";
import http_common from "../../../http_common.ts";
import { ILoginResult, IUserLoginInfo, ILoginForm } from "../../../interfaces/auth";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../../context/TokenContext.tsx";

const LoginPage = () => {
    const tokenContext = useContext(TokenContext);
    const navigator = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const onReset = () => {
        onClear();
    };

    const onFinish = async (values: ILoginForm) => {
        try {
            setLoading(true);
            const result = await http_common.post<ILoginResult>("/api/account/login", values);

            const { token } = result.data;
            const user: IUserLoginInfo = jwtDecode<IUserLoginInfo>(token);
            console.log("User info", user);
            tokenContext.setToken(token);
            success();
            onClear();
            navigator("/");
        } catch {
            error();
        } finally {
            setLoading(false);
        }
    };

    const onClear = () => {
        form.resetFields();
    };

    const success = () => {
        messageApi.open({
            type: "success",
            duration: 10,
            content: "Успішно ввійшли!",
        });
    };

    const error = () => {
        messageApi.open({
            type: "error",
            duration: 10,
            content: "Пароль або логін не правильний",
        });
    };

    return (
        <Row gutter={16}>
            {contextHolder}
            {loading ? (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(255, 255, 255, 0.8)", zIndex: 1000 }}>
                    <Spin size="large" tip="Зачекайте, виконується вхід..." style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
                </div>
            ) : (
                <div style={{ minWidth: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 20 }}>
                    <h1>Логін</h1>
                    <Form form={form} onFinish={onFinish} layout="vertical">
                        <Form.Item
                            label="Електронна пошта"
                            name="email"
                            htmlFor="email"
                            rules={[
                                {
                                    type: "email",
                                    message: "Формати пошти не правильний!",
                                },
                                { required: true, message: "Це поле є обов'язковим!" },
                                { min: 2, message: "Пошта повинна містити мінімум 2 символи!" },
                            ]}
                        >
                            <Input autoComplete="email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Пароль"
                            rules={[
                                { required: true, message: "Вкажіть Ваш пароль!" },
                                { min: 6, message: "Пароль має мати мінімум 6 символів!" },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Row style={{ display: "flex", justifyContent: "center" }}>
                            <Button style={{ margin: 10 }} type="primary" htmlType="submit">
                                Увійти
                            </Button>
                            <Button style={{ margin: 10 }} htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Row>
                    </Form>
                </div>
            )}
        </Row>
    );
};

export default LoginPage;
