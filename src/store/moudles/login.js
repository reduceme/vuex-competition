import Axios from 'axios'
import QS from 'qs'
import {Message} from 'element-ui'
import router from '../../router'
import topBar from './topBar'

const state = {
  userInfo: {
    emailAddress: '',
    password: '',
    code: ''
  }
}

const mutations = {
  updateEmailAddress (state, emailAddress) {
    state.userInfo.emailAddress = emailAddress
  },
  updatePassword (state, password) {
    state.userInfo.password = password
  },
  updateCode (state, code) {
    state.userInfo.code = code
  }
}

const actions = {
  login () {
    Axios.post('formalLogin', QS.stringify(state.userInfo))
      .then(response => {
        let data = response.data
        if (data.success) {
          router.push({
            path: '/hkjyyds/personalCenter'
          })
          topBar.state.menuList[5].isShow = false
          topBar.state.menuList[6].isShow = true
          topBar.state.logInfo = topBar.state.logArr[1]
        } else {
          Message.error({
            message: data.msg
          })
        }
      })
      .catch(response => {
        Message.error({
          message: '网络连接失败'
        })
      })
  }
}

export default {
  state,
  mutations,
  actions
}
