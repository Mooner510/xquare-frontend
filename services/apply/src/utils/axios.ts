import axios from 'axios';

const testToken =
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMjE0YjRkYi1mNzIzLTRiNDMtYjRkNS0xYmI2N2VkODAyODkiLCJyb2xlIjoiU1RVIiwiZXhwIjoxNjc5MDYzMjcyLCJ0eXBlIjoiQUNDRVNTX1RPS0VOIiwiYXV0aG9yaXRpZXMiOlsiVUtOIiwiU1RVIiwiU1RDIl19.Uk1Jwpq68CDyzuPd_CYh7V4h6q5X8y0KXHqxk7_rUIY';

export const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/applications`,
    timeout: 10000,
    withCredentials: true,
});

export const pickInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/pick`,
    timeout: 10000,
    withCredentials: true,
});

export const timetableInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/timetables`,
    timeout: 10000,
    withCredentials: true,
});

process.env.NODE_ENV === 'development' &&
    (instance.defaults.headers.common['Authorization'] = testToken);

process.env.NODE_ENV === 'development' &&
    (pickInstance.defaults.headers.common['Authorization'] = testToken);

process.env.NODE_ENV === 'development' &&
    (timetableInstance.defaults.headers.common['Authorization'] = testToken);
