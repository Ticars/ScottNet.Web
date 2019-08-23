namespace ScottNet.Web.ViewModels
{
    public class ApiResponseError
    {
        public ApiResponseError(string errorCode, string errorDescription)
        {
            ErrorCode = errorCode;
            ErrorDescription = errorDescription;
        }
        public string ErrorCode { get; set; }
        public string ErrorDescription { get; set; }
    }
}
