import { FC, useEffect } from 'react'

import { Button, Form, Input, Typography } from 'antd'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import AvatarUploadForm from '../../components/Login/AvatarUploadForm/AvatarUploadForm'
import { login, setAvatar, setUserName } from '../../redux/slices/auth-slice'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { selectIsAuth } from '../../redux/selectors/auth-selectors'

const { Title } = Typography

const LoginPage: FC = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(selectIsAuth)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const handleSetAvatar = (url: string) => dispatch(setAvatar(url))
    const handleLogin = ({ username }: { username: string }) => dispatch(setUserName(username))

    useEffect(() => {
        if (isAuth) navigate('/characters', { replace: true })
    }, [isAuth, navigate])

    useEffect(() => {
        if (searchParams) {
            const isLoginSuccess = searchParams.get('loginSuccess')
            if (isLoginSuccess === 'true') dispatch(login())
        }
    }, [dispatch, searchParams])

    return <>
        <Title level={2} className="m-0 lh-lg text-center mb-5">Please sign in to proceed</Title>
        <Form
            style={{
                maxWidth: 340,
                margin: 'auto'
            }}
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            onFinish={handleLogin}
        >
            <Form.Item label="Avatar">
                <AvatarUploadForm listType='picture-card' handleSetAvatar={handleSetAvatar}/>
            </Form.Item>
            <Form.Item
                label="Username"
                name="username"
                rules={[{
                    required: true,
                    message: 'Please input your username!',
                }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                className="text-center"
                wrapperCol={{
                    span: 24
                }}
            >
                <Button
                    style={{
                        minWidth: 215
                    }}
                    type="primary"
                    size="large"
                    className="mt-4"
                    htmlType="submit">Sign in</Button>
            </Form.Item>
        </Form>
        <Title level={3} className="mt-2 mb-4 lh-lg text-center">Or you can</Title>
        <div className="for-btn text-center">
            <a href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=782l68t2mkud14&scope=r_liteprofile&redirect_uri=http://localhost:5000/login">
                <img
                    src="https://content.linkedin.com/content/dam/developer/global/en_US/site/img/signin-button.png"
                    alt="sign in with linkedin"
                />
            </a>
        </div>
    </>
}

export default LoginPage