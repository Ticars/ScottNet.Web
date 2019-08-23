using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ScottNet.Web.ViewModels;

namespace ScottNet.Web.Models
{
    public class ApiResponse<T>
    {

        public int StatusCode { get; set; }
        public string Message { get; set; }
        public T Value { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ApiResponseError ApiError { get; set; }
        public bool Success { get; set; }
        public ObjectResult GetResponseObject()
        {
            return new ObjectResult(this) { StatusCode = StatusCode };
            //if (Value == null)
            //{
            //    if(ApiError != null)
            //    {
            //        return new ObjectResult(ApiError) { StatusCode = StatusCode };
            //    }
            //    else
            //    {
            //        return new ObjectResult(Message) { StatusCode = StatusCode };
            //    }
            //} 
            //else
            //{
            //    return new ObjectResult(Value) { StatusCode = StatusCode };
            //}
        }
        public static ApiResponse<T> GenerateSuccessResponse(T returnObject)
        {
            return new ApiResponse<T>()
            {
                StatusCode = StatusCodes.Status200OK,
                Value = returnObject,
                Success = true
            };
        }
        public static ApiResponse<T> GenerateUnauthorizedResponse(string message)
        {
            return new ApiResponse<T>()
            {
                StatusCode = StatusCodes.Status401Unauthorized,
                Message = message,
                Success = false
            };
        }

        public static ApiResponse<T> GenerateBadRequestWithError(string errorCode, string errorDescription)
        {
            return new ApiResponse<T>()
            {
                StatusCode = StatusCodes.Status400BadRequest,
                ApiError = new ApiResponseError(errorCode, errorDescription),
                Message = errorDescription,
                Success = false
            };
        }

        public static ApiResponse<T> GenerateBadRequestResponse(string message)
        {
            return new ApiResponse<T>()
            {
                StatusCode = StatusCodes.Status400BadRequest,
                Message = message,
                Success = false
            };
        }
    }
}
