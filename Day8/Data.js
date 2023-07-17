var serviceCat = function () {
    
    var url = "https://catprdapi.azurewebsites.net/api/Category";
    // var urlProd = "https://catprdapi.azurewebsites.net/api/Product";

    this.loadData = function (table) {
        console.log('2. ENtered in Method');
        /* Returning the Async State Object (Promise) to caller 
        The caller has to subscribge to it
         */
        url = url;
        var xhr = $.ajax({
            url: url,
            method: "GET"
        });
        
        return xhr;
    };
    this.loadDataById=function(id){
        var xhr = $.ajax({
            url:`${url}/${id}`,
            method:"GET"
        }); 

        return xhr;
    };
    this.saveData = function (data) {
        var xhr = $.ajax({
            url: url,
            method: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json'
        });
        return xhr;
    };

    this.updateData = function (id, data) {
        var xhr = $.ajax({
            url: `${url}/${id}`,
            method: "PUT",
            data: JSON.stringify(data),
            contentType: 'application/json'
        });
        return xhr;
    };
    this.deleteData = function (id) {
        var xhr = $.ajax({
            url: `${url}/${id}`,
            method: "DELETE",
            contentType: 'application/json'
        });
        return xhr;
    };

};

var serviceProd = function () {
    var url = "https://catprdapi.azurewebsites.net/api/Product";
    
    this.loadData = function (table) {
        console.log('2. ENtered in Method');
        /* Returning the Async State Object (Promise) to caller 
        The caller has to subscribge to it
         */
        url = url;
        var xhr = $.ajax({
            url: url,
            method: "GET"
        });
        
        return xhr;
    };
    this.loadDataById=function(id){
        var xhr = $.ajax({
            url:`${url}/${id}`,
            method:"GET"
        }); 

        return xhr;
    };
    this.saveData = function (data) {
        var xhr = $.ajax({
            url: url,
            method: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json'
        });
        return xhr;
    };

    this.updateData = function (id, data) {
        var xhr = $.ajax({
            url: `${url}/${id}`,
            method: "PUT",
            data: JSON.stringify(data),
            contentType: 'application/json'
        });
        return xhr;
    };
    this.deleteData = function (id) {
        var xhr = $.ajax({
            url: `${url}/${id}`,
            method: "DELETE",
            contentType: 'application/json'
        });
        return xhr;
    };


}


