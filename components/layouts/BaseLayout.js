import React, { Component, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Link from "next/link";
import { useRouter } from 'next/router'
import Head from 'next/head';
import "tabler-react/dist/Tabler.css";
import {
    Site,
    Nav,
    Grid,
    List,
    Button,
    RouterContextProvider,
} from "tabler-react";
import Header from '@/components/shared/Header'

const BaseLayout = props => {
    const router = useRouter()
    const { className, user, navClass = "with-bg", loading, children } = props;
    const [toast, setToast] = useState(false);

    return (
        <div className="layout-container">
            <Head>
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <title>ifeel</title>
                <link rel="icon" href="https://s3.eu-west-2.amazonaws.com/ifeel-media/fav-icon.png" sizes="192x192" />
                <link rel="apple-touch-icon-precomposed" href="https://s3.eu-west-2.amazonaws.com/ifeel-media/fav-icon.png" />
                <meta name="msapplication-TileImage" content="https://s3.eu-west-2.amazonaws.com/ifeel-media/fav-icon.png" />
            </Head>
            <div className="header-div">
                <Header
                    className={navClass}
                    user={user}
                    loading={loading} />
                <Nav
                    activeKey="/home"
                    items={
                        <React.Fragment>
                            <Nav.Item to="/DashboardComplete" active={router.pathname === '/DashboardComplete' ? true : false} icon="activity">Dashboard Complete</Nav.Item>
                            <Nav.Item to="/DashboardOld" active={router.pathname === '/DashboardOld' ? true : false} icon="activity">Dashboard Old</Nav.Item>
                            <Nav.Item to="/Users" active={router.pathname === '/Users' ? true : false} icon="user">Users</Nav.Item>
                            <Nav.Item to="/Events" active={router.pathname === '/Events' ? true : false} icon="bar-chart">Events</Nav.Item>
                            {/* <Nav.Item to="/Leads" active={router.pathname === '/Leads' ? true : false} icon="bar-chart">Leads</Nav.Item> */}
                        </React.Fragment>
                    }
                />
            </div>
            {toast &&
                <>
                    <Toast>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                            <strong className="mr-auto">Bootstrap</strong>
                            <small>just now</small>
                        </Toast.Header>
                        <Toast.Body>See? Just like this.</Toast.Body>
                    </Toast>
                    <Toast>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                            <strong className="mr-auto">Bootstrap</strong>
                            <small>2 seconds ago</small>
                        </Toast.Header>
                        <Toast.Body>Heads up, toasts will stack automatically</Toast.Body>
                    </Toast>
                </>
            }
            <main className={`cover ${className}`}>
                <div className="wrapper">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default BaseLayout;
