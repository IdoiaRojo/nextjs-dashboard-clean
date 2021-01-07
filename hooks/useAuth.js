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

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token')
            const email = Cookies.get('email')
            if (token && email) {
                
                console.log("Got a token in the cookies, let's see if it is valid")
                //api.defaults.headers.Authorization = `Bearer ${token}`
                //const { data: user } = await api.get('users/me')
                getUserInfo(token, email).then(user => {
                    setUser(user);
                });
            }
            setLoading(false)
        }
        loadUserFromCookies()
    }, [])


    const signIn = async ({ email, password }) => {
       
        var data = JSON.stringify({ "user": { "email": "ieadmin@yopmail.com", "password": "fake1234" } });

        var config = {
            method: 'post',
            url: 'http://localhost:3000/api/v3/sessions',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios(config)
         .then((response) => {
             
             console.log('hola me llamo ido');
             console.log(response);
             if (response.data.data.auth_token) {
                const token = response.data.data.auth_token;
                console.log("Got token")
                Cookies.set('token', token, { expires: 60 })
                // api.defaults.headers.Authorization = `Bearer ${token.token}`
                // const { data: user } = await api.get('users/me')
                // setUser(user)
                // console.log("Got user", user)
            }
          //setUser(response.user);
          //getUserAdditionalData(user);
          //return response.user;
          return response;
         })
         .catch((error) => {
          return { error };
         });
       };

    const login = async (email, password) => {
        debugger;

        var data = JSON.stringify({ "user": { "email": email, "password": password } });

        var config = {
            method: 'post',
            url: 'http://localhost:3000/api/v3/sessions',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: data
        };
        //const {res} = await axios(config);
        return axios(config)
            .then(res => {
                debugger;
                if(res.data.success && res.data.data.auth_token){
                    const token = res.data.data.auth_token 
                    Cookies.set('token', token, { expires: 60 })
                    Cookies.set('email', email, { expires: 60 })
                    var config2 = {
                        method: 'get',
                        url: 'http://localhost:3000/api/v3/users/my',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'X-User-Token': token,
                            'X-User-Email': email
                        }
                    };
                    return axios(config2).then(res2 => {
                        console.log('res2');
                        console.log(res2);
                        debugger;
                        
                        if(res2.status == 200 && res2.data.user){
                            
                            setUser(res2.data.user.id, res2.data.user.email);
                            router.push('/dashboard');
                        }else{
                            setUser(null);
                            router.push('/login');
                        }
                        
                        // console.log("Got user", user)
                    });
                    
                    
                }else{
                    
                    setUser(null);
                    router.push('/login');
                }
            })
            
    }

    const getCheckToken = (token, email) => {
        
        var data = JSON.stringify({ "email": email, "token": token });
        var config = {
            method: 'post',
            url: 'http://localhost:3000/api/v3/users/check_token',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-User-Token': token,
                'X-User-Email': email
            },
            data: data
        };
        
        return axios(config).then(res => {
            console.log(`check_token:`);
            console.log(res);
            if(res.status == 200 && res.data.success){
                router.push('/dashboard');                
            }else{
                router.push('/login');
            }
        });
    }
    const getUserInfo = (token, email) => {
        
        var data = JSON.stringify({ "email": email, "token": token });
        var config = {
            method: 'get',
            //url: 'http://localhost:3000/api/v3/users/my?timezone=Europe/Madrid&source=web',
            url: 'http://localhost:3000/api/v3/users/my',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-User-Token': token,
                'X-User-Email': email
            },
            data: data
        };
        
        return axios(config).then(res => {
            console.log(`my:`);
            console.log(res);
            if(res.status == 200 && res.data.user){
                return res.data.user;               
            }else{
                router.push('/login');
            }
        });
    }

    const logout = () => {
        const token = Cookies.get('token')
        const email = Cookies.get('email')
       
        var config = {
            method: 'delete',
            url: 'http://localhost:3000/api/v3/sessions',
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
        const url = 'http://localhost:3000/api/v3/sessions';
        // api.defaults.headers."X-User-Token" = token.token
        // api.defaults.headers."X-User-Email" = email
        //const { data: user } = await 
        //return axios(config).then(res => {
        return axios.delete(url, {headers: httpReqHeaders}).then(res => {
            console.log('res delete');
            console.log(res);
            if(res.status == 200 && res.data.success){
                
                // setUser(res2.data.user.id, res2.data.user.email)
                Cookies.remove('token')
                Cookies.remove('email')
                setUser(null)
                window.location.pathname = '/login'
            }
            
            // console.log("Got user", user)
        });
        //axios.delete(url, {headers:{Authorization: "token"}})


        // Cookies.remove('token')
        // setUser(null)
        // delete api.defaults.headers.Authorization
        // window.location.pathname = '/login'
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout, signIn }}>
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
