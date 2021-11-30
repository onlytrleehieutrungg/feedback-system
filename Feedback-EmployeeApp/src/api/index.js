import axios from "axios";

const BASE_URL = 'https://localhost:44354/api/';
const token = localStorage.getItem("token");
const headers = {
    'dataType': 'json',
    'Content-Type': 'application/json',
    'Accept' : 'application/json',
    'Authorization': 'Bearer '+token
};

const bodies = {
    toMail:""
}

var formdata = new FormData();
formdata.append("toMail", "\"trungtran2k01@gmail.com\"");

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

export const ENDPIONTS = {
    LOCATION: 'Locations',
    DEVICE: 'Devices',
    FEEDBACK: 'Feedbacks',
    ASSIGNTASK: 'Assigntasks',
    USER: 'Users',
    TASK: 'Tasks',
    NULL: ''
}

export const createAPIEndpoint = endpoint => {
    let url = BASE_URL + endpoint + '/';
    return {
        updateC: (id) => axios.put(url + id + '/UpdateCompleted', { headers: headers }),
        updateP: (id) => axios.put(url + id + '/UpdateProcessing', { headers: headers }),
        sendEmail: (id) => axios.put(url + '/Email/Send?idFb=' + id,{requestOptions:bodies} ,{ headers: headers }),
        createTaskByFBackId: (id) => axios.post(url + id + '/PostTaskByFbID?idFb='+id, { headers: headers }),
        assignTaskByfbnemp: (tkid,empid) => axios.post(url + tkid + '/'+empid + '/CreatAssignTask?idEmp='+empid, { headers: headers }),
        fetchAll: () => axios.get(url, { headers: headers }),
        fetchEmp: () => axios.get(url + 'GetEmp', { headers: headers }),
        fetchProcessing: () => axios.get(url + 'GetFeedbacksProcessing', { headers: headers }),
        fetchPending: () => axios.get(url + 'GetFeedbacksPending', { headers: headers }),
        fetchCompleted: () => axios.get(url + 'GetFeedbacksCompleted', { headers: headers }),
        fetchByStatus: () => axios.get(url + 'GetFeedbacksCompleted', { headers: headers }),
        getFeedbackByUserId: () => axios.get(url + 'GetFeedbackByUserId', { headers: headers }),
        fetchById: id => axios.get(url + id, { headers: headers }),
        fetchByUserId: () => axios.get(url + 'GetInfoTaskInAssingtask', { headers: headers }),
        fetchGetInfoUser: () => axios.get(url + 'GetInfoUser', { headers: headers }),
        create: newRecord => axios.post(url, newRecord, { headers: headers }),
        delete: id => axios.delete(url + id, { headers: headers }),
        fetchListDeviceById: id => axios.get(url + id + '/Devices?locationId=' + id, { headers: headers })
        
    }
}
// export const callAPI = () => {
//     return fetch(BASE_URL + ENDPIONTS.LOCATION, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//     }).then(response => {
//         return response.json();
//     });
// }