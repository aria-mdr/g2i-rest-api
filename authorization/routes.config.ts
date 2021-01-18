import AuthorizationController from './controllers/aithorization.controller';
export default {
    routesConfig: function (app: any) {

        app.post('/auth', [
            //usually would have middle wares here to veify login info
            AuthorizationController.login
        ]);

        app.post('/auth/refresh', [
            //usually would have middle wares here to veify login info
            AuthorizationController.login
        ]);
    }
}