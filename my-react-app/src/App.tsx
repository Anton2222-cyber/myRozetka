import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import CategoryListPage from "./components/categories/list/CategoryListPage.tsx";
import CategoryCreatePage from "./components/categories/create/CategoryCreatePage.tsx";
import CategoryEditPage from "./components/categories/edit/CategoryEditPage.tsx";
import ContainerDefault from "./components/containers/default/ContainerDefault.tsx";
import RegisterPage from "./components/auth/register/RegisterPage.tsx";
import {createContextValueByState, TokenContext} from "./context/TokenContext.tsx";
import LoginPage from "./components/auth/login/LoginPage.tsx";
import http_common from "./http_common.ts";

const App: React.FC = () => {
    const tokenState = useState<string>(localStorage.getItem('token') ?? '');

    http_common.defaults.headers.common["Authorization"] = "Bearer " + (localStorage.getItem('token') ?? '');
    return (
        <>

                <TokenContext.Provider value={createContextValueByState(tokenState)}>
            <Routes>
                <Route path="/" element={<ContainerDefault/>}>
                    <Route index element={<CategoryListPage/>}/>
                    <Route path="create" element={<CategoryCreatePage/>}/>
                    <Route path="edit/:id" element={<CategoryEditPage/>}/>
                    <Route path={"register"} element={<RegisterPage/>}/>
                    <Route path={"login"} element={<LoginPage/>}/>
                </Route>
            </Routes>
                </TokenContext.Provider >
        </>
    )
}

export default App
