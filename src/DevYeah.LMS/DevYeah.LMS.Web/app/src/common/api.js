import axios from 'axios';

export const createAccount = (signupInfo) => {
  return axios.post("/identity/register", signupInfo);
}

export const signIn = (signinInfo) => {
  return axios.post("/identity/login", signinInfo);
}

export const activeAccount = (token) => {
  return axios.post(
    "/identity/launch", 
    null,
    { params: {token} }
  );
}

export const recoveryPassword = (email) => {
  return axios.post(
    "/identity/recoverypassword", 
    null,
    { params: {email}} 
  );
}

export const resetPassword = (resetPwdInfo) => {
  return axios.post("/identity/updatepassword", resetPwdInfo);
}

export const fetchAvatar = () => {
  return axios.get("/identity/getavatar");
}

export const uploadImage = (formData) => {
  return axios.post("/identity/uploadphoto", formData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });
}

export const fetchAllCategories = () => {
  return axios("/course/findallcats");
}

export const FetchData = (endPointUrl) => {
  return axios(endPointUrl);
}

export const getFetchCoursesUrl = (page, 
  pageSize, catId) => {
  let remoteUrl = "/course/";
  if (catId == null) 
    remoteUrl = remoteUrl.concat(`findallcourses/?page=${page}&pagesize=${pageSize}`);
  else 
    remoteUrl = remoteUrl.concat(`findcourses/${catId}?page=${page}&pagesize=${pageSize}`);
  
  return remoteUrl;
}