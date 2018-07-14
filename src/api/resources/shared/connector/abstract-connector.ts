import { BadRequest, NotFound } from '../../../responses';

export default abstract class AbstractConnector {

    constructor(protected model: any) { }

    /**
     * Find and return a single model matching the search criteria
     * @param criteria object
     * @returns Promise<T>
     */
    public async findOne<T>(criteria): Promise<T> {
        const collection = await this.model.findOne(criteria).lean()
        if (!collection && !collection._id) {
            throw new NotFound()
        }

        return collection
    }

    /**
     * Returns a collection of the model
     * @returns Promise<T[]>
     */
    public async find<T>(): Promise<T[]> {
        const collection: T[] = await this.model.find({})
        return collection
    }

    /**
     * Creates an entity
     * @param args Promise<T>
     */
    public async create<T>(args): Promise<T> {
        const { content } = args

        const entity = await this.model.create({
            content,
        })

        const created: T = await this.model.findOne({ _id: entity._id })

        return created
    }

    /**
     * Updates an entity
     * @param args Promise<T>
     */
    public async update<T>(where, content): Promise<T> {
        const response = await this.model.update(
            where,
            { $set: { ...content } },
        )

        if (response.n === 0) {
            throw new NotFound()
        } else if (response.nModified === 0) {
            throw new BadRequest()
        } else {
            const result = await this.findOne<T>({ _id: where._id })
            return result
        }
    }

    // TODO: implement other CRUD methods
}
