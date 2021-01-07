// import Header from '@/components/shared/Header'
import Head from 'next/head'
// import navButtons from "@/config/buttons";

const BaseLayout = props => {
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
    
            {/* <Header
                className={navClass}
                user={user}
                loading={loading} /> */}
            <main className={`cover ${className}`}>
                <div className="wrapper">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default BaseLayout;
