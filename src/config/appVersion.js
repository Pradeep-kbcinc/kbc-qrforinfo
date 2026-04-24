var env = null
var appAuthUrl = ''

// env = 'DEV'
// env = 'DEMO'
// env = 'UAT'
env = 'LIVE'

if (env == 'DEV') {
  appAuthUrl = 'https://devapi.qrforinfo.com/api/v1'
} else if (env == 'DEMO') {
  appAuthUrl = 'http://demoapi.qrforinfo.com/api/v1'
} else if (env == 'UAT') {
  appAuthUrl = 'https://uatapi.qrforinfo.com/api/v1'
} else {
  appAuthUrl = 'https://liveapi.qrforinfo.com/api/v1'
}
export {
  env, appAuthUrl
}
