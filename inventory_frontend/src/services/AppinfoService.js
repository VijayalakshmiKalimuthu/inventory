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

export function getMasterApi() {
  return axios.get('http://127.0.0.1:8000/master')
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

export function addMasterApi(master) {
  const currentDate = new Date().toISOString().split('T')[0];

  return axios.post('http://127.0.0.1:8000/add_master', {
    entry_no: master.entry_no,
    item_code: master.item_code,
    item_name: master.item_name,
    m_date: currentDate,
    supplier: master.supplier,
    master_type: master.master_type,
    quantity: master.quantity,
    units: master.units,
    price: master.price,
    project_code: master.project_code,
    remarks: master.remarks,
    issue_date: master.issue_date,
    issue_to: master.issue_to,
    quantity_issued: master.quantity_issued,
    quantity_received: master.quantity_received,
    stock: master.stock,
    dev_remarks: master.dev_remarks,
    created_on: master.created_on,
    created_by: master.created_by,
    modified_on: master.modified_on,
    modified_by: master.modified_by,
    batch_number: master.batch_number
  })
  .then(response => response.data);
}

export async function updateChemicalApi(cid, master) {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/update_master/${cid}`, {
      entry_no: master.entry_no,
      item_code: master.item_code,
      item_name: master.item_name,
      m_date: master.m_date,
      supplier: master.supplier,
      master_type: master.master_type,
      quantity: master.quantity,
      units: master.units,
      price: master.price,
      project_code: master.project_code,
      remarks: master.remarks,
      issue_date: master.issue_date,
      issue_to: master.issue_to,
      quantity_issued: master.quantity_issued,
      quantity_received: master.quantity_received,
      stock: master.stock,
      dev_remarks: master.dev_remarks,
      created_on: master.created_on,
      created_by: master.created_by,
      modified_on: master.modified_on,
      modified_by: master.modified_by,
      batch_number: master.batch_number
    });
    return response.data;
  } catch (error) {
    console.error('Error updating master:', error);
    throw error; // Throw the error to handle it in the caller function
  }
}

export function inactiveMasterApi(cid) {
  return axios.patch(`http://127.0.0.1:8000/inactive_master/${cid}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error updating Master:', error);
      throw error;
    });
}


export const getStockLevelApi = () => {
  return fetch('http://127.0.0.1:8000/master/stockLevel');
};

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

export function inactiveProjectApi(project_code) {
  return axios.patch(`http://127.0.0.1:8000/inactive_project/${project_code}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error updating project:', error);
      throw error;
    });
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
    item_name: inventory.item_name,
    tran_type_IR: inventory.tran_type_IR,
    i_date: inventory.i_date,
    supplier: inventory.supplier,
    units: inventory.units,
    price: inventory.price,
    quantity_issued: inventory.quantity_issued,
    quantity_received: inventory.quantity_received,
    stock: inventory.stock,
    quantity: inventory.quantity,
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
  .then(response => response.data)
  .catch(error => {
    throw error;
  });
}


export async function updateInventoryApi(enNo, inventory) {
  return axios.put(`http://127.0.0.1:8000/update_inventory/${enNo}`, {
    item_code: inventory.item_code,   
    item_name: inventory.item_name,
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
    quantity_issued: inventory.quantity_issued,
    quantity_recieved: inventory.quantity_recieved,
    stock: inventory.stock,
    dev_remarks: inventory.dev_remarks
  })
  .then(response => response.data);
  
}

//------------------------------------Login system----------------------------

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


//---------------------------------Request Approval--------------------------------

export function getRequestApi() {
  return axios.get('http://127.0.0.1:8000/request')
    .then(response => response.data)
}

export function deleteRequestApi(id) {
  return axios.delete(`http://127.0.0.1:8000/delete_request/${id}`, {
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

export function addRequestApi(request) {
  return axios.post('http://127.0.0.1:8000/add_request', {
    id: null,
    ItemCode: request.ItemCode,
    ItemType: request.ItemType,
    ItemName: request.ItemName,
    RequestDate: request.RequestDate,
    RequestStatus: request.RequestStatus,
    RequestedBy: request.RequestedBy,
    RequestDetails: request.RequestDetails,
    ApprovedBy: null

  })
  .then(response => response.data);
}

export async function updateRequestApi(id, request) {
  return axios.put(`http://127.0.0.1:8000/update_request/${id}`, {
  ItemCode: request.ItemCode,
  ItemType: request.ItemType,
  ItemName: request.ItemName,
  RequestDate: request.RequestDate,
  RequestStatus: request.RequestStatus,
  RequestedBy: request.RequestedBy,
  RequestDetails: request.RequestDetails,
  ApprovedBy: request.ApprovedBy
  })
  .then(response => response.data);
  
}

//-----------------------Issue Task..------------------------------------------

export function getIssueApi() {
  return axios.get('http://127.0.0.1:8000/issues')
    .then(response => response.data)
}

export function addIssueApi(researcher) {
  const currentDate = new Date().toISOString().slice(0, 10);
  return axios.post('http://127.0.0.1:8000/add_issue', {
    id: null,
    researcher_name: researcher.researcher_name,
    issues_task: researcher.issues_task,
    date_time: currentDate,
    issue_raised_by: researcher.issue_raised_by,
    issue_status: researcher.issue_status,

  })
  .then(response => response.data);
}


//-----------------------------Login Add Role-----------------------


export function getLoginApi() {
  return axios.get('http://127.0.0.1:8000/view_login')
    .then(response => response.data)
}

export function addLoginApi(log) {
  return axios.post('http://127.0.0.1:8000/add_login', {
    id: null,
    user_name: log.user_name,
    password: log.password,
    role: log.role,
  })
  .then(response => response.data);
}

export async function updateLoginApi(id, log) {
  return axios.put(`http://127.0.0.1:8000/update_login/${id}`, {
    user_name: log.user_name,
    password: log.password,
    role: log.role,
  })
  .then(response => response.data);
  
}


//---------------------------Employee---------------------------//

export function getEmployeeApi() {
  return axios.get('http://127.0.0.1:8000/emp')
    .then(response => response.data)
}

export function deleteEmployeeApi(emp_id) {
  return axios.delete(`http://127.0.0.1:8000/delete_emp/${emp_id}`, {
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

export function addEmployeeApi(employee) {
  return axios.post('http://127.0.0.1:8000/add_emp', {
    emp_id: null,
    emp_name: employee.emp_name,
    designation: employee.designation,
    project_code: employee.project_code
  })
  .then(response => response.data);
}

export async function updateEmployeeApi(emp_id, employee) {
  return axios.put(`http://127.0.0.1:8000/update_emp/${emp_id}`, {
    emp_name: employee.emp_name,
    designation: employee.designation,
    project_code: employee.project_code
  })
  .then(response => response.data);
  
}

export function inactiveEmployeeApi(emp_id) {
  return axios.patch(`http://127.0.0.1:8000/inactive_emp/${emp_id}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error updating Master:', error);
      throw error;
    });
}

export function addEmpRegApi(emp) {
  return axios.post('http://127.0.0.1:8000/add_empReg', {
    emp_name: emp.user_name,
    designation: emp.role
  })
  .then(response => response.data);
}



//---------------------------Get Employee name-----------------//

export function getResEmployeeApi() {
  return axios.get('http://127.0.0.1:8000/researcherEmpName')
    .then(response => response.data)
}

//-------------------View Status-------------------------------//

export function getStatusApi() {
  return axios.get('http://127.0.0.1:8000/view_status')
    .then(response => response.data)
}


//-------------------------------Item Return---------------------------------//

export function addItemReturnApi(i_return) {
  const currentDate = new Date();

  // Format date to ISO string
  const isoDate = currentDate.toISOString();

  return axios.post('http://127.0.0.1:8000/add_itemreturn', {
    entry_no: null,
    c_id: i_return.c_id,
    receipt_date: isoDate,
    quantity_return: i_return.quantity_return
  })
  .then(response => response.data);
}

//-----------------------------Add Product Request----------------------------//

export function addProductReqApi(product) {
  const currentDate = new Date().toISOString().split('T')[0];

  return axios.post('http://127.0.0.1:8000/addProduct_request', {
    id: null,
    ItemCode: null,
    ItemType: null,
    ItemName: null,
    RequestStatus: null,
    RequestDate: currentDate,
    RequestedBy: product.RequestedBy,
    RequestDetails: product.RequestDetails,
    RequestedTo: product.RequestedTo


  })
  .then(response => response.data);
}


export function getProductReqApi() {
  return axios.get('http://127.0.0.1:8000/viewProduct_request')
    .then(response => response.data)
}


export async function updateProductApi(enNo, product) {
  return axios.put(`http://127.0.0.1:8000/updateProduct_request/${enNo}`, {
    ItemCode: product.ItemCode,   
    ItemType: product.ItemType,
    ItemName: product.ItemName,
    RequestDate: product.RequestDate,
    RequestStatus: product.RequestStatus,
    RequestedBy: product.RequestedBy,
    RequestDetails: product.RequestDetails,
    RequestedTo: product.RequestedTo
  })
  .then(response => response.data);
  
}

//-----------------------------View Entry-----------------//

export function getViewEntryApi() {
  return axios.get('http://127.0.0.1:8000/view_entry')
    .then(response => response.data)
}

//----------------------Distinct Role---------------------------//

export function getDistinctRoleApi() {
  return axios.get('http://127.0.0.1:8000/view_distinct_role/')
    .then(response => response.data)
}

//---------------------------------Newvwrsion Lab Assistant------------------//

export function addLabMasterApi(lab) {

  return axios.post('http://127.0.0.1:8000/master_inventory/create/', {
    c_id: null,
    master_type: lab.master_type,
    item_code: lab.item_code,
    item_name: lab.item_name,
    location_code: lab.location_code,
    units: lab.units,
    price: lab.price,
    make: lab.make,
    instruction_specification: lab.instruction_specification,
    min_req_stock: lab.min_req_stock,
    remarks: lab.remarks

  })
  .then(response => response.data);
}

export async function updateLAbMasterApi(c_id, master) {
  return axios.put(`http://127.0.0.1:8000/master_inventory/update/${c_id}/`, {
  master_type: master.master_type,
  item_code: master.item_code,
  item_name: master.item_name,
  location_code: master.location_code,
  units: master.units,
  price: master.price,
  make: master.make,
  instruction_specification: master.instruction_specification,
  min_req_stock: master.min_req_stock,
  remarks: master.remarks
  })
  .then(response => response.data);
  
}

export function getLabMasterApi() {
  return axios.get('http://127.0.0.1:8000/masters/')
    .then(response => response.data)
}

export function getMasterChemicalApi() {
  return axios.get('http://127.0.0.1:8000/masters/chemical')
    .then(response => response.data)
}

export function getMasterLabwareApi() {
  return axios.get('http://127.0.0.1:8000/masters/labware')
    .then(response => response.data)
}

export function getChemicalDescApi() {
  return axios.get('http://127.0.0.1:8000/master/chemical/desc/')
    .then(response => response.data)
}

export function getLabwareDescApi() {
  return axios.get('http://127.0.0.1:8000/master/labware/desc/')
    .then(response => response.data)
}


//----------------------Temporary table----------------------------------//


export function addTempToReceiveApi() {
  return axios.get('http://127.0.0.1:8000/add_itemreceive')
    .then(response => response.data)
    .catch(error => {
      throw error; // Rethrow the error to handle it in the caller function
    });
}

export function addTempToIssueApi() {
  return axios.post('http://127.0.0.1:8000/add_itemissue')
    .then(response => response.data)
    .catch(error => {
      throw error; // Rethrow the error to handle it in the caller function
    });
}

export function getTempReceiveApi() {
  return axios.get('http://127.0.0.1:8000/temp_receive')
    .then(response => response.data)
}


export function getTempIssueApi() {
  return axios.get('http://127.0.0.1:8000/temp_issue')
    .then(response => response.data)
}


export function addItemReceiveApi(data) {
  return axios.post('http://127.0.0.1:8000/add_itemreceive1', data)
    .then(response => response.data)
    .catch(error => {
      throw error; // Rethrow the error to handle it in the caller function
    });
}

export function addItemIssueApi(data) {
  return axios.post('http://127.0.0.1:8000/add_itemissue1', data)
    .then(response => response.data)
    .catch(error => {
      throw error; // Rethrow the error to handle it in the caller function
    });
}


//---------------------------ITEM RECEIVE---------------------------//


export function getItemReceiveApi() {
  return axios.get('http://127.0.0.1:8000/itemreceive')
    .then(response => response.data)
}


export function addTempItemReceiveApi(receive) {
  const currentDate = new Date().toISOString();
  return axios.post('http://127.0.0.1:8000/add_temp_receive_item', {
    entry_no: null,
    bill_no: receive.bill_no,
    c_id: receive.c_id,
    receipt_date: currentDate,
    quantity_received: receive.quantity_received,
    po_number: receive.po_number,
    batch_number: receive.batch_number,
    remarks: receive.remarks
  })
  .then(response => response.data);
}



//---------------------------ITEM ISSUE---------------------------//

export function getItemIssueApi() {
  return axios.get('http://127.0.0.1:8000/itemissue')
    .then(response => response.data)
}


export function addTempItemIssueApi(receive) {
  const currentDate = new Date().toISOString();

  return axios.post('http://127.0.0.1:8000/add_temp_issue_item', {
    entry_no: null,
    bill_no: receive.bill_no,
    c_id: receive.c_id,
    issue_date: currentDate,
    quantity_issued: receive.quantity_issued,
    issued_to: receive.issued_to,
    project_code: receive.project_code,
    researcher_name: receive.researcher_name,
    batch_number: receive.batch_number,
    remarks: receive.remarks
  })
  .then(response => response.data);
}


