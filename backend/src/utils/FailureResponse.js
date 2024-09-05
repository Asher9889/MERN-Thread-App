class Failureresponse {
    constructor(statusCode, message){
    this.statusCode = statusCode;
    this.status = false;
    this.message = message;
    this.data = {};
    }
}

export default Failureresponse;