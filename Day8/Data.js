var loadDataForProduct = function(){
    var url1 = "https://catprdapi.azurewebsites.net/api/Product";
    var url2 = "https://catprdapi.azurewebsites.net/api/Category";
    this.loadDataOfProduct=function(){
        /* Returning the Async State Object (Promise) to caller 
        The caller has to subscribge to it
         */
        var xhr = $.ajax({
            url:url1,
            method:"GET"
        }); 

        return xhr;
    };
    this.loadDataOfCategory=function(){
        /* Returning the Async State Object (Promise) to caller 
        The caller has to subscribge to it
         */
        var xhr = $.ajax({
            url:url2,
            method:"GET"
        }); 

        return xhr;
    };
    this.loadDataById=function(id){
        var xhr = $.ajax({
            url:`${url1}/${id}`,
            method:"GET"
        }); 

        return xhr;
    };
    this.saveData=function(data){
         var xhr = $.ajax({
            url:url1,
            method:"POST",
            data:JSON.stringify(data),
            contentType:'application/json'
         });
         return xhr;
    };
    this.updateData=function(id,data){
        var xhr = $.ajax({
            url:`${url1}/${id}`,
            method:"PUT",
            data:JSON.stringify(data),
            contentType:'application/json'
         });
         return xhr;
    };
    this.deleteData=function(id){
        var xhr = $.ajax({
            url:`${url1}/${id}`,
            method:"DELETE",
            contentType:'application/json'
         });
         return xhr;
    };

};
var loadDataForTable = function(){

};