// import {axiosIns as axios} from '~/plugins/axios'

export default function ({$axios, req}) {
  if (process.server) {
    $axios.defaults.headers.common.cookie = req.headers.cookie
  }
}
