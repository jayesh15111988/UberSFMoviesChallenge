/**
 * Created by jayeshkawli on 9/17/14.
 */
function getPromiseWithURLAndParameters(destinationURL,getParameters){
    return new Promise(function(resolve, reject) {


        $.ajax({
            url: destinationURL,
            type: 'GET',
            dataType: 'json',
            data : getParameters,
            success: function(successResponse) { resolve(successResponse); },
            error: function(errorResponse) { reject(errorResponse); }
        });


    });
}
