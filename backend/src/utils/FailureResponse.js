class Failureresponse {
    constructor(statusCode, error){
    this.statusCode = statusCode;
    this.status = false;
    this.error = error;
    this.data = {};
    }
}

export default Failureresponse;