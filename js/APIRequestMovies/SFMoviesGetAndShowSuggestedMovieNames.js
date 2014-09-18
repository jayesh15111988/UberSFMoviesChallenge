/**
 * Created by jayeshkawli on 9/15/14.
 */


function sendRequestToServerWithRequestAndMethodParameters(baseURL,APIVersion,APItailEnd,requestMethod,POSTData,callBackFunction,errorCallBackFunction){




        //Create a Car Collection
        var serverRequest = Backbone.Collection.extend({

            //Specify REST URL
            url: baseURL+'/'+APIVersion+'/'+APItailEnd,

            //Parse the response
            parse: function (response) {






                return response;

            },

            initialize: function () {
                this.bind("reset", function (model, options) {
                    console.log("Inside event");

                });
            }

        });

        var serverRequestInstance = new serverRequest();

    if(requestMethod==RESTRequestMethods.GET){
        serverRequestInstance.fetch({
            success: function(response,xhr) {

                callBackFunction(response);
            },
            error: function (errorResponse) {
                errorCallBackFunction(errorResponse);
            }
        });
    }
    else if(requestMethod==RESTRequestMethods.POST){




console.log("Type of post data is", typeof POSTData+" and first value if "+POSTData[0]);
        $.post(baseURL+'/'+APIVersion+'/'+APItailEnd,
            {
                'postDataKey':POSTData

            },
            function(data,status){
                console.log("Data: " + data);
            });


    }
}