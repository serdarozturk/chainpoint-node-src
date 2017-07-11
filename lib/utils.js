const { promisify } = require('util')
const request = require('request')

// wait for a specified number of milliseconds to elapse
function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
async function sleepAsync (ms) {
  await timeout(ms)
}

async function getStackConfigAsync (baseURI) {
  let options = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
    uri: baseURI + '/config',
    json: true,
    gzip: true
  }

  let requestAsync = promisify(request)
  let response = await requestAsync(options)
  if (response.statusCode !== 200) throw new Error('Invalid response')
  return response.body
}

module.exports = {
  sleepAsync: sleepAsync,
  getStackConfigAsync: getStackConfigAsync
}