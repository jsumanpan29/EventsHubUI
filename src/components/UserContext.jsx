// UserContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userCookie, setUserCookie] = useState(Cookies.get('user'));
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const cookieValue = Cookies.get('user');
    if (cookieValue !== userCookie) {
      setUserCookie(cookieValue);
    }
  }, [userCookie]);

  useEffect(() => {
    if (userCookie) {
      const parsedUserCookie = JSON.parse(userCookie);
      if (parsedUserCookie && parsedUserCookie.user && parsedUserCookie.user.first_name) {
        setFirstName(parsedUserCookie.user.first_name);
      }
    }
  }, [userCookie]);

  const setCookie = (cookieName, cookieValue, options = {}) => {
    Cookies.set(cookieName, cookieValue, options);
    setUserCookie(cookieValue);
  };

  const removeCookie = (cookieName) => {
    Cookies.remove(cookieName);
    setUserCookie(null); // Remove the userCookie state value
  };

  return (
    <UserContext.Provider value={{ userCookie, firstName, setCookie, removeCookie }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
