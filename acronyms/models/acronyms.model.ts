import mongoose from "../../common/services/mongoose.service";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const acronymSchema = new Schema({
    _id: {
        type: ObjectId,
        default: function () {
            return new ObjectId();
        },
    }, //randomly generated ID
    acronym: { type: String, unique: true, required: true },
    meaning: { type: String, unique: true },
});

// Ensure virtual fields are serialised.
acronymSchema.set("toJSON", {
    virtuals: true,
});

//Creating or accesing the Collection
const acronymModel = mongoose.model("wtf", acronymSchema);

//private helper methods
const helper = {
    /**
     * makes sure the search tex does not have any
     * reserved regex characters
     *
     * @param text
     */
    escapeRegex: (text: String) => {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    },

    /***
     * generates a signle random number withing the `min` and `max` range
     * @param min
     * @param max
     */
    generateRandomNumber: (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        const reandomNumber: number =
            Math.floor(Math.random() * (max - min + 1)) + min;
        return reandomNumber;
    },

    /**
     * generates `count` random numbers
     * withing the `max` and `min` range
     * ensures random numbers generated are unique
     * ensures random numbers generated are not consecutive
     *
     * helpers used:
     *  generateRandomNumber
     *
     * @param count
     * @param min
     * @param max
     */
    generateRandomNumbers: (count: number, min: number, max: number) => {
        return new Promise((resolve, reject) => {
            let randomNumbers: number[] = [];
            const add = helper.generateRandomNumber(0, 1);
            while (randomNumbers.length < count) {
                const randomNumber =
                    helper.generateRandomNumber(min, max / 2 - add) * 2 + add;
                if (randomNumbers.indexOf(randomNumber) === -1)
                    randomNumbers.push(randomNumber);
            }
            randomNumbers
                .sort(function (a, b) {
                    return a - b;
                })
                .reverse();
            resolve(randomNumbers);
        });
    },

    /**
     * gets the first `limit` number of records
     *
     * @param limit
     */
    list: (limit: number) => {
        return new Promise((resolve, reject) => {
            acronymModel
                .find()
                .limit(limit)
                .exec((err: mongoose.CallbackError, acronyms) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(acronyms);
                    }
                });
        });
    },
};

export default {
    /**
     * @param acronym
     */
    findByAcronym: (acronym: String) => {
        return acronymModel.find({ acronym: acronym });
    },

    /**
     * @param accornymData
     */
    createAcronym: (accornymData: { acronym: String; meaning: String }) => {
        const acronym = new acronymModel(accornymData);
        return acronym.save();
    },

    /**
     * does a fuzze search for the `search` key word
     * optionally, accepts a from and limit
     * gets the first `limit` acronyms after `from` acronyms
     *
     * Helpers used:
     *  escapeRegex
     *
     * @param search
     * @param from
     * @param limit
     */
    search: (search: String, from?: number, limit?: number) => {
        return new Promise((resolve, reject) => {
            const regex = new RegExp(helper.escapeRegex(search), "gi");
            acronymModel
                .find({
                    $or: [{ acronym: regex }, { meaning: regex }],
                })
                .exec((err: mongoose.CallbackError, docs: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (
                            from !== undefined &&
                            limit !== undefined &&
                            !isNaN(from) &&
                            !isNaN(limit)
                        ) {
                            resolve({
                                acronyms: docs.slice(from, from + limit),
                                moreAcronymsAvailable: docs.length > from + limit,
                            });
                        } else {
                            resolve({
                                acronyms: docs,
                                moreAcronymsAvailable: false,
                            });
                        }
                    }
                });
        });
    },

    paginate: (search: String, page?: number, limit?: number) => {
        return new Promise((resolve, reject) => {
            const regex = new RegExp(helper.escapeRegex(search), "gi");
            acronymModel
                .find({
                    $or: [{ acronym: regex }, { meaning: regex }],
                })
                .exec((err: mongoose.CallbackError, docs: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (
                            page !== undefined &&
                            limit !== undefined &&
                            !isNaN(page) &&
                            !isNaN(limit)
                        ) {
                            resolve({
                                acronyms: docs.slice(page * limit, page * limit + limit),
                                moreAcronymsAvailable: docs.length > page * limit + limit,
                            });
                        } else {
                            resolve({
                                acronyms: docs,
                                moreAcronymsAvailable: false,
                            });
                        }
                    }
                });
        });
    },

    /**
     * @param acronym
     * @param accroymData
     */
    patchaAcronym: (
        acronym: String,
        accroymData: { acronym: String; meaning: String }
    ) => {
        return acronymModel.findOneAndUpdate(
            {
                acronym: acronym,
            },
            accroymData,
            { useFindAndModify: false }
        );
    },

    /**
     * @param acronym
     */
    removeByAcronym: (acronym: String) => {
        return new Promise((resolve, reject) => {
            acronymModel.deleteMany({ acronym: acronym }, undefined, (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(err);
                }
            });
        });
    },

    /**
     * gets `count` random acronyms
     * if no `count` provided, generates a random count
     * helpers used:
     *  generateRandomNumbers
     *  generateRandomNumber
     * @param count
     */
    randomAcronym: (count?: number) => {
        return new Promise((resolve, reject) => {
            acronymModel.countDocuments().then((totalRecords) => {
                if (!count) count = helper.generateRandomNumber(1, totalRecords / 2);
                console.log(totalRecords / 2 - 1);
                if (count <= totalRecords / 2 - 1) {
                    helper
                        .generateRandomNumbers(count, 0, totalRecords)
                        .then((randomIndexes: any) => {
                            helper.list(randomIndexes[0]).then((acronymRange: any) => {
                                let randomAcronyms: any[] = [];
                                const mapPromise = randomIndexes.map((randomIndex: any) => {
                                    randomAcronyms.push(acronymRange[randomIndex - 1]);
                                });
                                Promise.all(mapPromise).then(() => {
                                    resolve(randomAcronyms);
                                });
                            });
                        });
                } else {
                    reject();
                }
            });
        });
    },
};
