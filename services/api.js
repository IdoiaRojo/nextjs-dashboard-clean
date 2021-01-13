import Cookies from "cookies";
import CookiesJS from 'js-cookie';

// const urlBackV3 = "http://localhost:3000/api/v3"
const urlBackV3 = "https://staging.ifeelonline.com/api/v3"

async function getDashboardDataApi(select_time, req) {
    var userId = null;
    var token = null;
    var email = null;
    if (req) {
        const cookies = new Cookies(req);
        var userId = cookies.get('userId');
        var token = cookies.get('token');
        var email = cookies.get('email');
    } else {
        var userId = CookiesJS.get('userId');
        var token = CookiesJS.get('token');
        var email = CookiesJS.get('email');
    }
    if (token && userId && email) {
        var myHeaders = new Headers();
        myHeaders.append("X-User-Token", token);
        myHeaders.append("X-User-Email", email);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        try {
            const response = await fetch(`${urlBackV3}/partner/dashboard_select_date?id=${userId}&select_time=${select_time}`, requestOptions);
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
    var userId = null;
    var token = null;
    var email = null;
    if (req) {
        const cookies = new Cookies(req);
        var userId = cookies.get('userId');
        var token = cookies.get('token');
        var email = cookies.get('email');
    } else {
        var userId = CookiesJS.get('userId');
        var token = CookiesJS.get('token');
        var email = CookiesJS.get('email');
    }
    if (token && userId && email) {
        var myHeaders = new Headers();
        myHeaders.append("X-User-Token", token);
        myHeaders.append("X-User-Email", email);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        try {
            const response = await fetch(`${urlBackV3}/partner/users?id=${userId}`, requestOptions);
            const data = await response.json();
            return JSON.parse(JSON.stringify(data));
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

export default {
    getDashboardDataApi, getUsersDataApi
};
