/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

const baseURL = "https://vitty-api.dhruvshah.live"

export const uploadImage = async (raw: any): Promise<any> => {
  const myHeaders = new Headers()
  myHeaders.append('Accept', 'application/json')

  const formData = new FormData()
  formData.append('file', raw)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  }

  try {
    const response = await fetch(baseURL + 'uploadfile/', requestOptions as any)
    const data = await response.json()
    return data
  } catch (e) {
    
    return {}
  }
}

export const parseAndReturn = (raw: string): any => {
  const url = `${baseURL}/api/v2/timetable/parse`;
  const myHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
  };
  try {
    const response = axios.post(url, { "timetable": raw }, { headers: myHeaders })
    return response
  } catch (e) {
    return {}
  }
}

export const uploadText = async (raw: string): Promise<any> => {

  const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const remoteApiUrl = `${baseURL}/api/v2/timetable/`;
  const url = `${corsProxyUrl}${remoteApiUrl}`;
  

  const myHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
  };

  const urlEncoded = new URLSearchParams();
  urlEncoded.append('request', raw);

  try {
    const response = await axios.post(url, urlEncoded, {
      headers: myHeaders
    });
    return response.data;
  } catch (e) {
    return {};
  }
}

export const isAvailable = async (username: string): Promise<any> => {
  const myHeaders = {
    "Content-Type": "application/json"
  };

  const data = {
    "username": username
  };

  try {
    const response = await axios.post(baseURL + '/api/v2/auth/check-username', data, {
      headers: myHeaders
    });
    return response.data;
  }
  catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 400) {
      return e.response?.data ?? { error: e };
    } else {
      console.log(e);
      return {};
    }
  }
}

export const getTimetable = async (username: string, apiKey: string): Promise<any> => {
  const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const remoteApiUrl = `${baseURL}/api/v2/timetable/${username.toLowerCase()}`;
  const url = `${corsProxyUrl}${remoteApiUrl}`;
  console.log(apiKey);
  const headers = {
    Authorization: `Bearer ${apiKey}`,
  };

  try {
    const response = await axios.get(url, { headers });
    const data = response.data;
    console.log("gettimetable data");
    console.log(data);
    if (data.detail === "User not found") {
      return "empty timetable";
    } else {
      return data;
    }
  } catch (e) {
    console.log(e);
    return { error: e };
  }
};



export const getToken = async (uuid: string): Promise<any> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    "uuid": uuid
    // "regNo": regNo,
    // "username": username
  });

  const requestOptions = {
    method: 'POST',
    body: raw,
    headers: myHeaders,
    redirect: 'follow'
  };

  try {
    const response = await fetch(baseURL + "/api/v2/auth/firebase/", requestOptions as any)
    const data = await response.json()
    return data
  } catch (e) {
    console.log(e)
    return { e }
  }
}

export const signIn = async (uuid: string, regNo: string, username: string): Promise<any> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    "uuid": uuid,
    "regNo": regNo,
    "username": username
  });

  const requestOptions = {
    method: 'POST',
    body: raw,
    headers: myHeaders,
    redirect: 'follow'
  };

  try {
    const response = await fetch(baseURL + "/api/v2/auth/firebase/", requestOptions as any)
    const data = await response.json()
    return data
  } catch (e) {
    console.log(e)
    return { e }
  }
}