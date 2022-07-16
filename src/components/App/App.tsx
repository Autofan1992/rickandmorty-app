import { Layout } from 'antd'
import React, { FC, lazy, Suspense, useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Navigate, Route, Routes } from 'react-router-dom'
import Preloader from '../Preloader/Preloader'
import LoginPage from '../../pages/LoginPage/LoginPage'
import CharactersPage from '../../pages/CharactersPage/CharactersPage'
import NotFound from '../../pages/404/NotFound'
import Footer from '../Footer/Footer'

const { Content } = Layout

const CharacterPage = lazy(() => import('../../pages/CharacterPage/CharacterPage'))

const App: FC = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', () => setWindowWidth(window.innerWidth))
        return () => {
            window.removeEventListener('resize', () => setWindowWidth(window.innerWidth))
        }
    })

    return <Layout className="layout d-flex flex-column justify-content-between wrapper">
        <Header/>
        <Content className="py-4 py-md-5 flex-grow-0">
            <Suspense fallback={<Preloader/>}>
                <Routes>
                    <Route path="/" element={<Navigate to="characters" replace/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="characters" element={<CharactersPage/>}/>
                    <Route path="characters/:id" element={<CharacterPage windowWidth={windowWidth}/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Suspense>
        </Content>
        <Footer/>
    </Layout>
}

export default App
