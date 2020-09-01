// Provide resolver functions for your schema fields
const resolvers = {
    events: async (_, context) => {
        const { db } = await context();
        return db
            .collection('events')
            .find()
            .toArray();
    },
    event: async ({ id }, context) => {
        const { db } = await context();
        return db.collection('events').findOne({ id });
    },
    editEvent: async ({ id, title, description }, context) => {
        const { db } = await context();

        return db
            .collection('events')
            .findOneAndUpdate(
                { id },
                { $set: { title, description } },
                { returnOriginal: false },
            )
            .then(resp => resp.value);
    },
};

module.exports = resolvers;