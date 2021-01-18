import AcronymModel from '../models/acronyms.model';
import crypto from 'crypto';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';
import { receiveMessageOnPort } from 'worker_threads';
import { json } from 'body-parser';

export default {
    insert: (req: any, res: any) => {
        AcronymModel.createAcronym(req.body)
            .then((result) => {
                res.status(200).send({ "status": "succesfully added one record" });
            }).catch((err) => {
                res.status(503).send({ "error": err })
            })
    },

    insertBulk: (req: any, res: any) => {
        let erros: any[] = [];
        const records = req.body.data.length
        const requests = req.body.data.map((accronymData: any) => {
            Object.keys(accronymData)
                .forEach(function eachKey(key) {
                    AcronymModel.createAcronym({
                        "acronym": key,
                        "meaning": accronymData[key]
                    })
                        .catch((err) => {
                            erros.push(err);
                        })
                });

        })
        Promise.all(requests).then(() => {
            if (erros.length != records) {
                if (erros.length <= 0) {
                    res.status(200).send({ "status": `succesfully added ${records} record` });
                }
                else {
                    res.status(206).send({
                        "status": `succesfully added ${records.length - erros.length} records, failed to add ${erros.length} records`,
                        "errors": erros
                    });
                }
            } else {
                res.status(503).send({
                    "error": `failed to add ${erros.length}`,
                    "errors": erros
                })
            }
        })
    },

    getAcronym: (req: any, res: any) => {
        AcronymModel.findByAcronym(req.params.acronym)
            .then((result) => {
                if (result.length > 0) {
                    res.status(200).send({ result });
                } else {
                    res.status(204).send({ "error": `No accronym found for ${req.params.acronym}` })
                }
            })
            .catch((err) => {
                res.status(503).send()
            })
    },

    update: (req: any, res: any) => {
        AcronymModel.patchaAcronym(req.params.acronym, req.body)
            .then((result) => {
                res.status(200).send({ result: result });
            }).catch((err) => {
                res.status(503).send()
            });
    },

    delete: (req: any, res: any) => {
        AcronymModel.removeByAcronym(req.params.acronym)
            .then((result) => {
                res.status(200).send({ "message": "succesfully deleted record" });
            }).catch((err) => {
                res.status(503).send({ "error": err })
            });
    },

    search: (req: any, res: any) => {
        if (req.query.search !== undefined) {
            AcronymModel.search(req.query.search, parseInt(req.query.from), parseInt(req.query.limit))
                .then((results: any) => {
                    if (results.acronyms.length > 0) {
                        res.header('More-Acronyms-Available', results.moreAcronymsAvailable)
                        res.status(200).send({
                            acronyms: results.acronyms,
                            moreAcronymsAvailable: results.moreAcronymsAvailable
                        })
                    } else {
                        res.status(204).send()
                    }
                }).catch((err) => {
                    res.status(503).send()
                })
        } else {
            res.status(400).send()
        }
    },

    paginate: (req: any, res: any) => {
        if (req.query.search !== undefined) {
            AcronymModel.paginate(req.query.search, parseInt(req.query.page), parseInt(req.query.limit))
                .then((results: any) => {
                    if (results.acronyms.length > 0) {
                        res.header('More-Acronyms-Available', results.moreAcronymsAvailable)
                        res.status(200).send({
                            acronyms: results.acronyms,
                            moreAcronymsAvailable: results.moreAcronymsAvailable
                        })
                    } else {
                        res.status(204).send()
                    }
                }).catch((err) => {
                    res.status(503).send()
                })
        } else {
            res.status(400).send()
        }
    },

    random: (req: any, res: any) => {
        AcronymModel.randomAcronym(req.params.count)
            .then((result) => {
                res.status(200).json({ results: result })
            }).catch((err) => {
                res.status(503).send()
            })
    }
} 