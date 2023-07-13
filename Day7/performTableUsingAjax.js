 
function generateTable(dataSource,canDelete) {
    /* Chekc if the dataSource is not undefined or empty  
    if yes then return message that no record*/

    if(dataSource === undefined || dataSource.length === 0){
        return `<div class="alert alerrt-danger">
          <strong>
             No Data Present
          </strong>
        </div> `;
    }

    /* Read Schema from the 0th record from array */

    var properties = Object.keys(dataSource[0]);

    if(properties === undefined || properties.length === 0) {
        return `<div class="alert alerrt-danger">
        <strong>
          The dataSource is not in corrct shape
        </strong>
      </div> `;
    }

    /* the table definition */

    var table = `<table class="table table-bordered table-striped">`;
    /* Defining Headrers */
    table+=`<thead><tr>`;
    properties.forEach((header,index)=>{
        table+=`<th>${header}</th>`;
    });
    table+=`</tr></thead>`;

    /* Add Body */
    table+=`<tbody>`;
    /* row generation  for the table  */
    dataSource.forEach((emp,idx)=>{
        table+=`<tr>`;
            /* Read value for each property of each row */
            properties.forEach((header,index)=>{
                /* Reading value of each property of each emp record in employees array */
                table+=`<td>${emp[header]}</td>`;
            });
            table+=`<td>
               <button class="btn btn-success" id="click-to-fill">Select</button>
            </td>`
            if (canDelete) {
                table+=`<td>
                <button id="btn-delete" class="btn btn-danger style="display: none;">delete</button>
            </td>`
              }
        table+=`</tr>`;
    });

    table+=`</tbody>`;

    table+=`</table>`;
    return table;
}
