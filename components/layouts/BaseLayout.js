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
                            <Nav.Item to="/users" active={router.pathname === '/users' ? true : false} icon="user">Users</Nav.Item>
                            <Nav.Item to="/dashboard" active={router.pathname === '/dashboard' ? true : false} icon="activity">Dashboard</Nav.Item>
                        </React.Fragment>
                    }
                />
            </div>

            <main className={`cover ${className}`}>
                <div className="wrapper">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default BaseLayout;
