/* Array nof JSON Object */
var products = [
    {ProductId:1,ProductName:'iphone',  CategoryName: 'c1', Description:'a andriod mobile', Manufacturer :'ab', price :'10' },
    {ProductId:2,ProductName:'andriod', CategoryName: 'c2', Description:'a ios mobile',     Manufacturer :'cd', price :'20'},
    {ProductId:3,ProductName:'windows', CategoryName: 'c3', Description:'a windows laptop', Manufacturer :'ef', price :'30'},
    {ProductId:4,ProductName:'linux',   CategoryName: 'c4', Description:'a linux laptop',   Manufacturer :'gh', price :'40'}
];

/* Reading Schema of Record in array */
var obj = products[0];

/* Read only the schema */
var properties = Object.keys(obj);

function generateTable() {
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
    products.forEach((product,idx)=>{
        table+=`<tr>`;
            /* Read value for each property of each row */
            properties.forEach((header,index)=>{
                /* Reading value of each property of each product record in products array */
                table+=`<td>${product[header]}</td>`;
            });
            table+=`<td>
            <button class="btn">Select</button>
            </td>`
        table+=`</tr>`;
    });
    table+=`</tbody>`;

    table+=`</table>`;
    return table;
}
/**
 * showing row Data when we are clicking in the select button
 */
function showingRowData() {
    $('button.btn').on('click', function () {
        var row = $(this).closest('tr');
        var rowDataItem = {
            ProductId: row.find('td:eq(0)').text(),
            ProductName : row.find('td:eq(1)').text(),
            CategoryName: row.find('td:eq(2)').text(),
            Description: row.find('td:eq(3)').text(),
            Manufacturer : row.find('td:eq(4)').text(),
            price: row.find('td:eq(5)').text()
        };
        alert(JSON.stringify(rowDataItem));
    });
}
/**
 * showing search terms when we are searching something
 */
function searchData() {
    var searchText = $(this).val().toLowerCase();
    $(".table tbody tr").each(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(searchText) > -1);
  });
}
function filterByRadioInput() {
    var searchText = $(this).val().toLowerCase();
    var selectedProperty = $('input[name="property"]:checked').val();
    $(".table tbody tr").each(function() {
      var rowText = $(this).find(`td:eq(${properties.indexOf(selectedProperty)})`).text().toLowerCase();
      $(this).toggle(rowText.indexOf(searchText) > -1);
    });
}