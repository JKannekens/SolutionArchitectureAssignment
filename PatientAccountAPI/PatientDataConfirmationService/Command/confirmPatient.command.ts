function ConfirmPatientCommand(request) {
    let credentials = {
        bsn: request.bsn,
        password: request.password
    };
    return credentials;
}

module.exports = ConfirmPatientCommand;
