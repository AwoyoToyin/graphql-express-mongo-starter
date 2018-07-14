export default interface IEnv {
    disableAuth?: boolean
    port?: string | number
    expireTime?: string
    secrets?: any
    db?: any
    limiter?: any
}
