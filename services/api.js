import Cookies from "cookies";
import CookiesJS from 'js-cookie';

async function getDashboardDataApi(select_time, req) {
    var token = null;
    var email = null;
    if (req) {
        const cookies = new Cookies(req);
        //const userId = cookies.get('userId');
        var userId = 14;
        token = cookies.get('token');
        email = cookies.get('email');
    } else {
        var userId = 14;
        token = CookiesJS.get('token');
        email = CookiesJS.get('email');
    }
    if (token) {
        var myHeaders = new Headers();
        myHeaders.append("X-User-Token", token);
        myHeaders.append("X-User-Email", email);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        try {
            const response = await fetch(`http://localhost:3000/api/v3/partner/dashboard_select_date?id=${userId}&select_time=${select_time}`, requestOptions);
            console.log("------------ response ------------ ");
            console.log(response);
            console.log(response.data);
            const data = await response.json();
            return JSON.parse(JSON.stringify(data));
        } catch (e) {
            console.log(e);
            //error = e.toString();
            return null;
        }
    } else {
        console.log('no hay token');
        return null;
    }
}

async function getUsersDataApi(req) {
    console.log("----------- req ----------- ".toUpperCase);
    console.log(req);
    if (req) {
        const cookies = new Cookies(req);
        //const userId = cookies.get('userId');
        var userId = 14;
        var token = cookies.get('token');
        var email = cookies.get('email');
    } else {
        var userId = 14;
        var token = CookiesJS.get('token');
        var email = CookiesJS.get('email');
    }

    var myHeaders = new Headers();
    myHeaders.append("X-User-Token", token);
    myHeaders.append("X-User-Email", email);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    try {
        const response = await fetch(`http://localhost:3000/api/v3/partner/users?id=${userId}`, requestOptions);
        console.log(response);
        const data = await response.json();
        return JSON.parse(JSON.stringify(data));
    } catch (e) {
        console.log(e);
        //error = e.toString();
        return null;
    }
}

export default {
    getDashboardDataApi, getUsersDataApi
};
