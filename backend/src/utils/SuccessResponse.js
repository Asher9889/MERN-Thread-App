class SuccessResponse {
    constructor(sucess ,statusCode, message , data){
        this.sucess = sucess;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export default SuccessResponse;