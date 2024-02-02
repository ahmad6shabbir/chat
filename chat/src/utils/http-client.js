import { Config } from '../config';
import axios from 'axios';

export const GetApiData = async (endpoint, method, payload, secured) => {
    let headers = AuthHeader();
    let apiOptions = { url: baseURL + endpoint }
    if (method !== '') apiOptions.method = method
    if (payload != null) apiOptions.data = payload
    if (secured !== false) apiOptions.headers = headers
    return await axios(apiOptions);
}

export const PostFormData = async (endpoint, method, payload, secured, headers, responseType) => {
    // Let get the header 
    let authHeaders = AuthHeader();
    let allHeaders = {...authHeaders, ...headers};
    let apiOptions = { url: baseURL + endpoint }
    if (method !== '') apiOptions.method = method
    if (payload != null) apiOptions.data = payload
    if (method !== '') apiOptions.method = method
    if (responseType !== '') apiOptions.responseType = responseType
    console.log(headers);
    console.log("allHeaders",allHeaders);
    if (secured !== false) apiOptions.headers = allHeaders;
   
    return await axios(apiOptions);
}

export const GetPublicData = async (endpoint, method, payload) => {

}