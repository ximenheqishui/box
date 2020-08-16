// import Cookies from 'js-cookie'
//
// const TokenKey = 'Admin-Token'
//
// export function getToken () {
//   return Cookies.get(TokenKey)
// }
//
// export function setToken (token, expires) {
//   return Cookies.set(TokenKey, token, { expires: expires })
// }
//
// export function removeToken () {
//   return Cookies.remove(TokenKey)
// }

const TokenKey = 'Admin-Token'

export function getToken () {
  return window.localStorage.getItem(TokenKey)
}

export function setToken (token) {
  return window.localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  return window.localStorage.removeItem(TokenKey)
}
