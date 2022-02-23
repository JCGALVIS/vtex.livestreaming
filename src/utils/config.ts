const env = process.env

const dev = {
  GET_LIVESTREAMING_CONFIG_URL:
    'https://xdr18ajfu3.execute-api.us-east-1.amazonaws.com/Prod/livestreamingconfig',
  GET_CHAT_BY_ID_URL:
    'https://pabprg32bj.execute-api.us-east-1.amazonaws.com/global-page/chat',
  GET_QUESTION_URL:
    'https://xdr18ajfu3.execute-api.us-east-1.amazonaws.com/Prod/livestreamingquestion',
  USERNAME_EXIST_URL:
    'https://xdr18ajfu3.execute-api.us-east-1.amazonaws.com/Prod/usernameexist',
  GET_HIGHTLIGHT_BY_ID_URL:
    'https://pabprg32bj.execute-api.us-east-1.amazonaws.com/global-page/highlight-products'
}

const prod = {
  GET_LIVESTREAMING_CONFIG_URL:
    'https://9n976nhd6g.execute-api.us-east-1.amazonaws.com/Prod/livestreamingconfig',
  GET_CHAT_BY_ID_URL:
    'https://6rfhhp7a2d.execute-api.us-east-1.amazonaws.com/global-page/chat',
  GET_QUESTION_URL:
    'https://9n976nhd6g.execute-api.us-east-1.amazonaws.com/Prod/livestreamingquestion',
  USERNAME_EXIST_URL:
    'https://9n976nhd6g.execute-api.us-east-1.amazonaws.com/Prod/usernameexist',
  GET_HIGHTLIGHT_BY_ID_URL:
    'https://6rfhhp7a2d.execute-api.us-east-1.amazonaws.com/global-page/highlight-products'
}

const { ENVIRONMENT } = env

const config = ENVIRONMENT === 'prod' ? prod : dev
console.log('config env: ', config)

export default {
  ...config
}
