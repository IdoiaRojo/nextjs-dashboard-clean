import Cookies from "cookies";
import CookiesJS from 'js-cookie';

// let urls = {
//     test: `http://localhost:3000`,
//     development: 'http://localhost:3000/',
//     production: 'https://staging.ifeelonline.com/'
// }
// const api = Axios.create({
//     baseURL: urls[process.env.NODE_ENV],
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
// });




async function getDashboardDataApi(select_time, req) {

    if(req){
        
        console.log('-----POR AQUÍ----')
        const cookies = new Cookies(req);
        //const userId = cookies.get('userId');
        var userId = 14;
        var token = cookies.get('token');
        var email = cookies.get('email');
    }else{
        var userId = 14;
        var token = CookiesJS.get('token');
        var email = CookiesJS.get('email');
    }
    console.log("------------TOKEN---------- => " + token);
    console.log("------------select_time---------- => " + select_time);

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
        console.log(response);
        const data = await response.json();
        return JSON.parse(JSON.stringify(data));
    } catch (e) {
        console.log(e);
        //error = e.toString();
        return null;
    } 

  

    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
    // const res = await fetch('https://.../posts')
    // const posts = await res.json()

    
}

export default {
    getDashboardDataApi
};
