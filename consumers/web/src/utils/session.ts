
export const getToken =  () => {
  const jwtToken = sessionStorage.getItem("__token");
  return jwtToken;
}
export const getUser: null | any = () => {
  const userStr = sessionStorage.getItem('__user');
  if (userStr && userStr !== "undefined" )return JSON.parse(userStr);
  else return null;
}
export const removeToken = async () => {
  sessionStorage.removeItem("__token");
  sessionStorage.removeItem("__user");
}

//set the token and user from the session storage
export const setUserSession = (token: string, user:any) => {
  sessionStorage.setItem('__token', token);
  sessionStorage.setItem('__user', JSON.stringify(user));
}