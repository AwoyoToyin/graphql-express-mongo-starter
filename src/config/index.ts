import { merge } from 'lodash';

import development from './development';
import IE from './env.interface';
import production from './production';

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const env = process.env.NODE_ENV

const config: IE = {
    port: 4000,
    expireTime: '30d',
    secrets: {
        JWT_SECRET: 'yeezy350boost',
    },
    db: {
        url: 'mongodb://localhost:27017/graphqlSimpleTodo',
    },
}

/** Override above configuration with environment config */
let envConfig = {}

switch (env) {
  case 'development':
    envConfig = development
    break;
    break;
  case 'production':
    envConfig = production
    break;
  default:
    envConfig = config
}

export default merge(config, envConfig)
