import axios from 'axios';

export function getAppinfo() {
  return axios.get('http://127.0.0.1:8000/appinfo')
    .then(response => response.data)
}

export function deleteAppinfo(infocode) {
  return axios.delete(`http://127.0.0.1:8000/delete_appinfo/${infocode}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error deleting appinfo:', error);
    throw error;
  });
}

export function addAppinfo(appinfo) {
  return axios.post('http://127.0.0.1:8000/add_appinfo', {
    infocode: null,
    infovalue: appinfo.infovalue,
    remarks: appinfo.remarks,
    created_on: appinfo.created_on,
    created_by: appinfo.created_by,
    modified_on: appinfo.modified_on,
    modified_by: appinfo.modified_by,
    dev_remarks: appinfo.dev_remarks,
  })
  .then(response => response.data);
}

export async function updateAppinfo(infoid, appinfo) {
  return axios.put(`http://127.0.0.1:8000/update_appinfo/${infoid}`, {
    infovalue: appinfo.infovalue,
    remarks: appinfo.remarks,
    created_on: appinfo.created_on,
    created_by: appinfo.created_by,
    modified_on: appinfo.modified_on,
    modified_by: appinfo.modified_by,
    dev_remarks: appinfo.dev_remarks,
  })
  .then(response => response.data);
  
}

// ------------------------------Chemical---------------------------------------------------

export function getChemicalApi() {
  return axios.get('http://127.0.0.1:8000/chemical')
    .then(response => response.data)
}

export function deleteChemicalApi(c_id) {
  return axios.delete(`http://127.0.0.1:8000/delete_chemical/${c_id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error deleting appinfo:', error);
    throw error;
  });
}

export function addChemicalApi(chemical) {
  return axios.post('http://127.0.0.1:8000/add_chemical', {
    c_id: null,
    entry_no: chemical.entry_no,
    item_code: chemical.item_code,
    item_name: chemical.item_name,
    unit: chemical.unit,
    project_code: chemical.project_code,
    remarks: chemical.remarks,
    created_on: chemical.created_on,
    created_by: chemical.created_by,
    modified_on: chemical.modified_on,
    modified_by: chemical.modified_by,
    dev_remarks: chemical.dev_remarks
  })
  .then(response => response.data);
}

export async function updateChemicalApi(cid, chemical) {
  return axios.put(`http://127.0.0.1:8000/update_chemical/${cid}`, {
    entry_no: chemical.entry_no,
    item_code: chemical.item_code,
    item_name: chemical.item_name,
    unit: chemical.unit,
    project_code: chemical.project_code,
    remarks: chemical.remarks,
    created_on: chemical.created_on,
    created_by: chemical.created_by,
    modified_on: chemical.modified_on,
    modified_by: chemical.modified_by,
    dev_remarks: chemical.dev_remarks
  })
  .then(response => response.data);
  
}

// --------------------------------Project Master------------------------------------------


export function getProjectApi() {
  return axios.get('http://127.0.0.1:8000/project')
    .then(response => response.data)
}

export function deleteProjectApi(project_code) {
  return axios.delete(`http://127.0.0.1:8000/delete_project/${project_code}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error deleting appinfo:', error);
    throw error;
  });
}

export function addProjectApi(project) {
  return axios.post('http://127.0.0.1:8000/add_project', {
    project_code: null,
    project_name: project.project_name
  })
  .then(response => response.data);
}

export async function updateProjectApi(proCode, project) {
  return axios.put(`http://127.0.0.1:8000/update_project/${proCode}`, {
    project_name: project.project_name
  })
  .then(response => response.data);
  
}

// ------------------------------------------Inventory-------------------------------------------


export function getInventoryApi() {
  return axios.get('http://127.0.0.1:8000/inventory')
    .then(response => response.data)
}

export function deleteInventoryApi(enNo) {
  return axios.delete(`http://127.0.0.1:8000/delete_inventory/${enNo}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error deleting appinfo:', error);
    throw error;
  });
}

export function addInventoryApi(inventory) {
  return axios.post('http://127.0.0.1:8000/add_inventory', {
    entry_no: null,     
    item_code: inventory.item_code,   
    tran_type_IR: inventory.tran_type_IR,
    qnty: inventory.qnty,
    ref_number: inventory.ref_number,
    ref_type: inventory.ref_type,
    batch_number: inventory.batch_number,
    remarks: inventory.remarks,
    created_on: inventory.created_on,
    created_by: inventory.created_by,
    modified_on: inventory.modified_on,
    modified_by: inventory.modified_by,
    dev_remarks: inventory.dev_remarks

  })
  .then(response => response.data);
}

export async function updateInventoryApi(enNo, inventory) {
  return axios.put(`http://127.0.0.1:8000/update_inventory/${enNo}`, {
    item_code: inventory.item_code,   
    tran_type_IR: inventory.tran_type_IR,
    qnty: inventory.qnty,
    ref_number: inventory.ref_number,
    ref_type: inventory.ref_type,
    batch_number: inventory.batch_number,
    remarks: inventory.remarks,
    created_on: inventory.created_on,
    created_by: inventory.created_by,
    modified_on: inventory.modified_on,
    modified_by: inventory.modified_by,
    dev_remarks: inventory.dev_remarks
  })
  .then(response => response.data);
  
}

const BASE_URL = 'http://127.0.0.1:8000';  // Replace with your actual base URL

export async function loginUserApi(credentials) {
  try {
    const response = await axios.post(`${BASE_URL}/login/`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

export async function registerUserApi(userInfo) {
  try {
    const response = await axios.post(`${BASE_URL}/register/`, userInfo);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}


