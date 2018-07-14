import IE from './env.interface';

const config: IE = {
    port: 4000,
    expireTime: '30d',
    secrets: {
        JWT_SECRET: 'yeezy350boost',
    },
    db: {
        url: 'mongodb://localhost:27017/graphqlTodo',
    },
}

export default config
