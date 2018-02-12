import * as React from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd'
import GlobalFooter from './GlobalFooter/index'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu
const styles = require("./App.less")

export default class App extends React.Component<any, any>{
  constructor(props: any) {
    super(props)
    this.state = { collapsed: false }
  }
  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }
  render() {
    const menu = (
      <Menu className={styles.menu}>
        <Menu.Item key="logout"><Icon type="logout" /> 退出登录 </Menu.Item>
      </Menu>
    )
    return (
      <Router>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            className={styles.sider}
          >
            <div className={styles.logo}>
              <Link to='/'>
                <img src={require("images/logo.png")} alt="best logo" />
                <span style={{ fontSize: "18px", display: "inline-block", padding: "5px 0px 0px 8px", verticalAlign: "middle", color: "#fff", fontWeight: 700 }}>Best Global OA</span>
              </Link>
            </div>
            <Menu
              theme="dark"
              mode="inline"
            >
              <SubMenu
                key="sub1"
                title="菜单一">
                <Menu.Item key="1">子菜单一</Menu.Item>
                <Menu.Item key="2">子菜单二</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title="菜单二">
                <Menu.Item key="3">子菜单三</Menu.Item>
                <Menu.Item key="4">子菜单四</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title="菜单三">
                <Menu.Item key="1">子菜单五</Menu.Item>
                <Menu.Item key="2">子菜单六</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Header>
              <Icon
                className={styles.trigger}
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle.bind(this)}
              />
              <div className={styles.right}>
                <Dropdown overlay={menu}>
                  <span className={`${styles.action} ${styles.account}`}>
                    <Avatar size="large" className={styles.avatar} icon="user" />
                    Best GlobalOA
                </span>
                </Dropdown>
              </div>
            </Header>
            <Content>
              <GlobalFooter
                links={[
                  {
                    title: "Pro 首页",
                    href: "http://pro.ant.design",
                    blankTarget: true
                  }, {
                    title: 'GitHub',
                    href: 'https://github.com/ant-design/ant-design-pro',
                    blankTarget: true
                  }, {
                    title: 'Ant Design',
                    href: 'http://ant.design',
                    blankTarget: true
                  }
                ]}
                copyright={<div>Copyright <Icon type="copyright" /> 2018 yz@best_intl.com</div>}
              />
            </Content>
          </Layout>
        </Layout>
      </Router>

    )
  }
}