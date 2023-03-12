export const fetchUser = () =>{
    const userInfo = localStorage.getItem('users') !== undefined ? JSON.parse(localStorage.getItem('users')) : localStorage.clear();

    return userInfo;
}