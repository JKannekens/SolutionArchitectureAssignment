const confirmDoctorCommand = require('../Command/confirmdoctor.command.ts');

module.exports = {
    async loginDoctor(req, res, next) {
        let docterCredentials = confirmDoctorCommand(req.body);

        //TODO: login
    },

    async logoutDoctor(req, res, next) {
        //TODO: logout
    }
}
