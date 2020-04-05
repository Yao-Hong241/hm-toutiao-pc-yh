const KEY = 'hm-tt-yh-user'
export default {
  // 存储用户信息
  setUser (user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  // 取出用户信息
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  // 删除用户信息
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
