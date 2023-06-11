const axios = require('axios')
const tencentcloud = require('tencentcloud-sdk-nodejs')
// 又拍云TOKEN（需要对应权限）
const cacheToken = process.env.UPYUN_TOKEN
const tentcentSecretId = process.env.TENCENT_SECRET_ID
const tentcentSecretKey = process.env.TENCENT_SECRET_KEY

const CdnClient = tencentcloud.cdn.v20180606.Client
const path = ['https://blog.antmoe.com/*']

function upyun() {
  new Promise((resolve, reject) => {
    return axios
      .post(
        'https://api.upyun.com/buckets/purge/batch',
        {
          noif: 1,
          source_url: path[0]
        },
        {
          headers: {
            Authorization: 'Bearer ' + cacheToken
          }
        }
      )
      .then((res) => {
        resolve(res)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

function tencent() {
  const clientConfig = {
    credential: {
      secretId: tentcentSecretId,
      secretKey: tentcentSecretKey
    },
    region: '',
    profile: {
      httpProfile: {
        endpoint: 'cdn.tencentcloudapi.com'
      }
    }
  }

  const client = new CdnClient(clientConfig)
  const params = {
    Paths: path,
    FlushType: 'delete'
  }
  return new Promise((resolve, reject) => {
    client.PurgePathCache(params).then(
      (data) => {
        resolve(data)
      },
      (err) => {
        reject(err)
      }
    )
  })
}

async function main() {
  // const upyunResult = await upyun()
  const tencentResult = await tencent()
  // console.log(upyunResult)
  console.log(tencentResult)
}
main()
