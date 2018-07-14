import * as mongoose from 'mongoose'
import appConfig from './config'

export const connect = (config = appConfig) => {
    mongoose.connect(config.db.url)
    mongoose.Promise = global.Promise;

    mongoose.connection
        .once('open', () => console.log('Mongodb running'))
        .on('error', console.error.bind(console, 'MongoDB connection error:'));
}
