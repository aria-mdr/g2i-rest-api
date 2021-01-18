import config from '../../common/config/env.config';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


export default {
    login: (req: any, res: any) => {
        try {
            let refreshId = config.jwt_secret; //usually i would add the user id to the secret, skipping users for this test
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
            req.body.refreshKey = salt;
            let token = jwt.sign(req.body, config.jwt_secret);
            let b = Buffer.from(hash);
            let refresh_token = b.toString('base64');
            req.headers.authorization = token;
            res.status(201).send({ accessToken: token, refreshToken: refresh_token });
        } catch (err) {
            res.status(500).send({ errors: err });
        }
    },

    refresh_token: (req: any, res: any) => {
        try {
            req.body = req.jwt;
            let token = jwt.sign(req.body, config.jwt_secret);
            res.status(201).send({ id: token });
        } catch (err) {
            res.status(500).send({ errors: err });
        }
    }
}