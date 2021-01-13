import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import {
    AccountDropdown,
    Tabs,
    Tab,
    Grid,
    Card
} from "tabler-react";
import NavBar from "@/components/shared/NavBar";
import navButtons from "@/config/buttons";
import NavButton from "@/components/shared/NavButton";

import { withTranslation } from '../../i18n'

const BsNavLink = (props) => {
    const { title, href } = props;
    return (
        <li><Link href={href}><a className="nav-link port-navbar-link">{title}</a></Link></li>
    )
}



const Header = ({ user, loading, className, t }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const auth = useAuth();
    const handleClick = () => {
        auth.logout().then((res) => {
            console.log(res);
            // router.push('/dashboard');
        });
    }
    return (
        <>
            <header className="partners-header">
                <div className="partners-nav">
                    <div className="ifeelIcon">
                        <Link href="/">
                            <a><img title="ifeel" alt="ifeel" className="custom-logo-link" src="https://s3.eu-west-2.amazonaws.com/ifeel-media/images/Ifeel_pos_rgb0.5x.png" /></a>
                        </Link>
                    </div>
                    {user &&
                        <div>
                            {/* <NavBar navButtons={navButtons} /> */}
                            <AccountDropdown
                                avatarURL={"https://staging.ifeelonline.com" + user.safe_avatar_url}
                                name={user.nickname}
                                description="Administrator"
                                options={[
                                    { icon: "user", value: "My account", to: "/my_account" },
                                    { icon: "settings", value: "Settings", to: "/settings" },
                                    "mail",
                                    "message",
                                    "divider",
                                    "help",
                                    { icon: "logout", value: "logout", onClick: () => handleClick() },
                                ]}
                            />

                            {/* <Nav variant="pills" activeKey="1" className="nav-right">
                            <NavDropdown title={user.nickname} id="nav-dropdown" className="nav nav-select">
                                <NavDropdown.Item eventKey="/my_account">
                                <NavButton 
                                    key="my_account" 
                                    path="/my_account"
                                    label={t('my_account')}
                                    icon=""
                                />
                                </NavDropdown.Item>
                                <NavDropdown.Item eventKey="4.3">
                                    <a href="/logout" onClick={handleClick} className="nav-link port-navbar-link">Logout</a>
                                </NavDropdown.Item>
                            </NavDropdown> 
                            </Nav> */}
                            {/* <nav class="nav-right">
                            <ul class="nav nav-select">
                                
                                <li class="nav-item dropdown">

                                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        {user.name}
                                        <img src="/images/blue-arrow-down.png" alt="" />
                                    </a>

                                    <div class="dropdown-menu select-time">
                                        <a href="/partner/dashboard?locale=es" class="dropdown-item">Español</a>
                                        <button type="button" class="dropdown-item" data-toggle="modal" data-target="#exampleModal">Modify password</button>
                                        <a class="dropdown-item" href="/users/sign_out" rel="nofollow" data-method="delete">Logout</a>
                                    </div>
                                </li>
                                <li></li>
                            </ul>
                        </nav> */}

                        </div>
                    }
                </div>
            </header>
            {/* <div className={`nav ${className}`}>
                <Link href="/"><a className="port-navbar-brand">Kontigo Sofia Partner</a></Link>
                <ul>
                    <BsNavLink href="/" title="Home" />
                    <BsNavLink href="/dashboard" title="Dashboard" />
                    {!loading &&
                        <>
                            {user &&
                                <a href="/logout" onClick={handleClick} className="nav-link port-navbar-link">Logout</a>
                            }
                            {!user &&
                                <a href="/login" className="nav-link port-navbar-link">Login</a>
                            }
                        </>
                    }
                </ul>


            </div> */}
        </>
    )

}

export default withTranslation('common')(Header);
