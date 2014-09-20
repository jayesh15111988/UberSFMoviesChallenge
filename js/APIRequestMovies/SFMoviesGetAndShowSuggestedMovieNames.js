/**
 * Created by jayeshkawli on 9/15/14.
 */
//Simple function to conveniently send and receive GET and POST data. 
//User is required to pass few required parameters to use this method. It has convenient success and error callbacks
//To return gathered data

function sendRequestToServerWithRequestAndMethodParameters(baseURL, APIVersion, APItailEnd, requestMethod, POSTData, callBackFunction, errorCallBackFunction) {

    var serverRequest = Backbone.Collection.extend({

        //Specify REST URL
        url: baseURL + '/' + APIVersion + '/' + APItailEnd,
        //Parse the response
        parse: function (response) {
            return response;
        },
        initialize: function () {
            this.bind("reset", function (model, options) {
            });
        }
    });

    var serverRequestInstance = new serverRequest();
    if (requestMethod == RESTRequestMethods.GET) {
        serverRequestInstance.fetch({
            success: function (response, xhr) {
                callBackFunction(response);
            },
            error: function (errorResponse) {
                errorCallBackFunction(errorResponse);
            }
        });
    }
    else if (requestMethod == RESTRequestMethods.POST) {

        $.post(baseURL + '/' + APIVersion + '/' + APItailEnd, {
                postDataKey: POSTData
            },
            function (data, status) {
                console.log("Data Returned by server after POST operation is : " + data);
            });
    }
}