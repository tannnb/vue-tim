import axios from 'axios'
import {Toast} from 'cube-ui'


axios.create({
  timeout: 5000
})

axios.interceptors.request.use(
  config => {
    showToastType('加载中,请稍后').show()
    return config
  },
  error => {
    showToastType().hide()
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    showToastType().hide()
    return response;
  },
  error => {
    showToastType().hide()
    return Promise.reject(error)
  }
)



function showToastType(text) {
  return Toast.$create({
    time: 0,
    txt: text
  })
}
