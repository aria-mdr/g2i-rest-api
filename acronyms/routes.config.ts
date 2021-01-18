import AcronymController from './controllers/acronyms.controller';
import ValidationMiddleware from '../common/middlewares/auth.validation.middleware';

export default {
    routesConfig: (app: any) => {
        app.get('/acronym', [
            AcronymController.search
        ]);
        app.get('/paginate', [
            AcronymController.paginate
        ]);
        app.get('/acronym/:acronym', [
            AcronymController.getAcronym
        ]);
        app.get('/random/:count?', [
            AcronymController.random
        ])
        app.post('/acronym', [
            AcronymController.insert
        ]);
        app.post('/acronym/bulk', [
            AcronymController.insertBulk
        ]);
        app.put('/acronym/:acronym', [
            ValidationMiddleware.validJWTNeeded,
            AcronymController.update
        ]);
        app.delete('/acronym/:acronym', [
            ValidationMiddleware.validJWTNeeded,
            AcronymController.delete
        ]);

    }
};