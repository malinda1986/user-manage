//@ts-nocheck
import axios from "axios";
import { getToken } from "./session";
import { handleError } from './errorHandler'

export const getRequest = async (url, params, header?: {}) => {
  const jwtToken = getToken();
  try {
    const { data } = await axios
      .get(url, {
        params,
        headers: {
          Authorization: `${jwtToken}`,
          ...header,
        },
      })
    return ({ success: true, message: 'success', code: 200, data: data?.data })
  } catch (error) {
    const statusCode = error?.response?.status;
    handleError(statusCode);
    return ({ success: false, message: error?.response?.data?.data?.message, code: statusCode, data: {} })
  }
}

export const postRequest = async (url, params, header? = {}) => {
  const jwtToken = await getToken();
  try {
    const { data } = await axios
      .post(url, {
        ...params
      }, {
        headers: {
          Authorization: `${jwtToken}`,
          ...header,
        },
      })

    console.log(data)
    return ({ success: data.success, message: data.message, code: 200, data: data?.data })
  } catch (error) {
    const statusCode = error?.response?.status;
    handleError(statusCode);
    return ({ success: false, message: error?.response?.data?.message, code: statusCode, data: {} })
  }
}

export const patchRequest = async (url, params, header) => {
  const jwtToken = await getToken();
  try {
    const { data } = await axios
      .patch(url, {
        ...params
      }, {
        headers: {
          Authorization: `${jwtToken}`,
          ...header,
        },
      })
    return ({ success: true, message: 'success', code: 200, data: data?.data })
  } catch (error) {
    const statusCode = error?.response?.status;
    handleError(statusCode);
    return ({ success: false, message: error?.response?.data?.data?.message, code: statusCode, data: {} })
  }
}

export const putRequest = async (url, params, header? ={}) => {
  const jwtToken = await getToken();
  try {
    const { data } = await axios
      .put(url, {
        ...params
      }, {
        headers: {
          Authorization: `${jwtToken}`,
          ...header,
        },
      })
    return ({ success: true, message: 'success', code: 200, data: data?.data })
  } catch (error) {
    const statusCode = error?.response?.status;
    handleError(statusCode);
    return ({ success: false, message: error?.response?.data?.data?.message, code: statusCode, data: {} })
  }
}

export const deleteRequest = async (url, header? ={}) => {
  const jwtToken = await getToken();
  try {
    const { data } = await axios
      .delete(url, {
        headers: {
          Authorization: `${jwtToken}`,
          ...header,
        },
      })
    return ({ success: true, message: 'success', code: 200, data: data?.data })
  } catch (error) {
    const statusCode = error?.response?.status;
    handleError(statusCode);
    return ({ success: false, message: error?.response?.data?.data?.message, code: statusCode, data: {} })
  }
}