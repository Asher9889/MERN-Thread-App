class Failureresponse {
    constructor(status, statusCode, message, data , error){
    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.error = error;
    }
}

export default Failureresponse;