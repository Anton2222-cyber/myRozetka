import {useContext, useState} from "react";

import {Button, Form, Input, message, Modal, Row} from 'antd';

import http_common from "../../../http_common.ts";
import {  ILoginResult, IUserLoginInfo, ILoginForm} from "../../../interfaces/auth";
import {jwtDecode} from "jwt-decode";

import {useNavigate} from "react-router-dom";
import {TokenContext} from "../../../context/TokenContext.tsx";


const LoginPage = () => {
    const tokenContext = useContext(TokenContext);
    const navigator = useNavigate()
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);


    const [form] = Form.useForm<ILoginForm>();

    const [messageApi, contextHolder] = message.useMessage();
    const handleCancel = () => setPreviewOpen(false);



    const onReset = () => {
        onClear();
    };
    const onFinish = async (values: ILoginForm) => {

        //const data: IRegister = {...values, imageBase64: values.image?.thumbUrl}
        //console.log("Data send server ", data);
        try {
            const result =
                await http_common.post<ILoginResult>("/api/account/login", values);

            const {token} = result.data;
            const user: IUserLoginInfo = jwtDecode<IUserLoginInfo>(token);
            console.log("User info", user);
            tokenContext.setToken(token);
            //if(localStorage.token)
            success();
            onClear();
            navigator("/");
        } catch {
            error();
        }
    };
    const onClear = () => {
        form.resetFields();

    }

    const success = () => {
        messageApi.open({
            type: 'success',
            duration: 10,
            content: 'Категорію успішно створено!',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            duration: 10,
            content: 'Помилка створення категорії!',
        });
    };

    return (
        <Row gutter={16}>
            {contextHolder}
            <h1>Логін</h1>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                style={{minWidth: '100%', display: 'flex', flexDirection: "column", justifyContent: "center", padding: 20}}
            >


                <Form.Item
                    label="Електронна пошта"
                    name="email"
                    htmlFor="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Формати пошти не правильний!',
                        },
                        {required: true, message: 'Це поле є обов\'язковим!'},
                        {min: 2, message: 'Пошта повинна містити мінімум 2 символи!'}
                    ]}
                >
                    <Input autoComplete="email"/>
                </Form.Item>



                <Form.Item
                    name="password"
                    label="Пароль"
                    rules={[
                        {required: true, message: 'Вкажіть Ваш пароль!',},
                        {min: 6, message: 'Пароль має мати мінімум 6 символів!',},
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>




                <Modal open={previewOpen}  footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{width: '100%'}} />
                </Modal>

                <Row style={{display: 'flex', justifyContent: 'center'}}>
                    <Button style={{margin: 10}} type="primary" htmlType="submit">
                        Увійти
                    </Button>
                    <Button style={{margin: 10}} htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Row>
            </Form>
        </Row>
    )
}

export default LoginPage;