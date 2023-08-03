const UserService = require('.');
const sequelize = require('../../lib/sequelize')
const models = sequelize.models;

class ClientService extends UserService {
    constructor() {
        super()
    }

    async create(data, t) {
        let transaction
        try {
            transaction = t ?? await sequelize.transaction();
            const res = await super.create(data.user, transaction)
            data.client.user_id = res.id
            const client = await models.Client.create(data.client, { transaction })
            transaction.commit()
            return client
        } catch(error) {
            if (transaction) {
                transaction.rollback()
            }
            throw error
        }
    }

    async findByCedula(cedula) {
        const client = await models.Client.findOne({
            where: {
                cedula: cedula
            },
            include: {
                model: models.User,
                as: 'user'
            }
        })
        return client
    }

    async deleteClientByCedula(cedula) {
        const client = await this.findByCedula(cedula)
        const user = client.user
        const clientDeletedResult = await client.destroy()
        await user.destroy()
        return clientDeletedResult
    }
}

module.exports = ClientService