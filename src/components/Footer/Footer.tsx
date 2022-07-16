import { Layout } from 'antd'

const date = new Date()
const { Footer: FooterANT } = Layout

const Footer = () => {
    return <FooterANT className={'text-center'}>
        ©{date.getFullYear()} Created by Mykola Gordiy
    </FooterANT>
}

export default Footer