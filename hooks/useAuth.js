import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'
// import api from '@/services/api';
import axios from 'axios'

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const urlBackV3 = "https://staging.ifeelonline.com/api/v3"
    // const urlBackV3 = "http://localhost:3000/api/v3"
    // const urlBackV3 = process.env.FETCH_URL

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token')
            const email = Cookies.get('email')
            if (token && email) {
                getUserInfo(token, email).then(user => {
                    setUser(user);
                });
            } else {
                setUser(null);
                router.push('/login');
            }
            setLoading(false)
        }
        loadUserFromCookies()
    }, [])


    // const signIn = async ({ email, password }) => {

    //     var data = JSON.stringify({ "user": { "email": email, "password": password } });

    //     var config = {
    //         method: 'post',
    //         url: 'http://localhost:3000/api/v3/sessions',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         data: data
    //     };
    //     return axios(config)
    //         .then((response) => {
    //             if (response.data.data.auth_token) {
    //                 const token = response.data.data.auth_token;
    //                 Cookies.set('token', token, { expires: 60 })
    //             }
    //             return response;
    //         })
    //         .catch((error) => {
    //             return { error };
    //         });
    // };

    const login = async (email, password) => {
        var data = JSON.stringify({ "user": { "email": email, "password": password } });

        var config = {
            method: 'post',
            url: `${urlBackV3}/sessions`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: data
        };
        //const {res} = await axios(config);
        return axios(config)
            .then(res => {
                if (res.data.success && res.data.data.auth_token) {
                    const token = res.data.data.auth_token
                    Cookies.set('token', token, { expires: 60 })
                    Cookies.set('email', email, { expires: 60 })
                    var config2 = {
                        method: 'get',
                        url: `${urlBackV3}/users/my`,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'X-User-Token': token,
                            'X-User-Email': email
                        }
                    };
                    return axios(config2).then(res2 => {

                        if (res2.status == 200 && res2.data.user) {
                            Cookies.set('userId', res2.data.user.id, { expires: 60 })
                            setUser(res2.data.user.id, res2.data.user.email);
                            router.push('/DashboardComplete');
                        } else {
                            setUser(null);
                            router.push('/login');
                        }
                    });

                } else {

                    setUser(null);
                    router.push('/login');
                }
            }).catch(function (error) {
                console.log("------ ERROR -------"); // 401
                console.log(error); // 401
                //console.log(error.response.data.error); //Please Authenticate or whatever returned from server
                //if (error.response.status == 401) {
                // setUser(null);
                // router.push('/login');
                return { error };
                //}
            });

    }

    const getCheckToken = (token, email) => {

        var data = JSON.stringify({ "email": email, "token": token });
        var config = {
            method: 'post',
            url: `${urlBackV3}/users/check_token`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-User-Token': token,
                'X-User-Email': email
            },
            data: data
        };

        return axios(config).then(res => {
            if (res.status == 200 && res.data.success) {
                router.push('/users');
            } else {
                router.push('/login');
            }
        });
    }
    const getUserInfo = (token, email) => {

        var data = JSON.stringify({ "email": email, "token": token });
        var config = {
            method: 'get',
            //url: 'http://localhost:3000/api/v3/users/my?timezone=Europe/Madrid&source=web',
            url: `${urlBackV3}/users/my`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-User-Token': token,
                'X-User-Email': email
            },
            data: data
        };

        return axios(config).then(res => {
            if (res.status == 200 && res.data.user) {
                return res.data.user;
            } else {
                router.push('/login');
            }
        });
    }

    const logout = () => {
        const token = Cookies.get('token')
        const email = Cookies.get('email')

        var config = {
            method: 'delete',
            url: `${urlBackV3}/sessions`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-User-Token': token,
                'X-User-Email': email
            }
        };
        const httpReqHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-User-Token': token,
            'X-User-Email': email
        };
        const url = `${urlBackV3}/sessions`;
        return axios.delete(url, { headers: httpReqHeaders }).then(res => {
            if (res.status == 200 && res.data.success) {
                Cookies.remove('token')
                Cookies.remove('email')
                setUser(null)
                window.location.pathname = '/login'
            }

        });
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)



// export const ProtectRoute = ({ children }) => {
//   const { isAuthenticated, isLoading } = useAuth();
//   if (isLoading || (!isAuthenticated && window.location.pathname !== '/login')){
//     return <LoadingScreen />; 
//   }
//   return children;
// };
