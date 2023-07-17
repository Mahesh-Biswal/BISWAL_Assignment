
function generateCatTable(dataSource) {

    if (dataSource === undefined || dataSource.length === 0) {
      return `<div class="alert alerrt-danger">
            <strong>
               No Data Present
            </strong>
          </div> `;
    }
  
    /* Read Schema from the 0th record from array */
  
    var properties = Object.keys(dataSource[0]);
  
    if (properties === undefined || properties.length === 0) {
      return `<div class="alert alerrt-danger">
          <strong>
            The dataSource is not in corrct shape
          </strong>
        </div> `;
    }
  
    var table = `<table class="table table-bordered table-striped">`;
    table += `<thead><tr>`;
    properties.forEach((header, index) => {
      table += `<th>${header}`;

      table += `<button class="btn  btn-primary sort-button" data-column="${header}">▲</button>`;

      table += `<button class="btn  btn-success reverse-button" data-column="${header}">▼</button>`;

      table += `</th>`;
    });
    table += `</tr></thead>`;
  
    table += `<tbody>`;
  
    dataSource.forEach((prod, idx) => {
      table += `<tr class="cat-div">`;
  
      properties.forEach((header, index) => {
        table += `<td>${prod[header]}</td>`;
      });
  
      // table += `<td> <button class="button-select bg-dark text-light in-row-btn" id="btn-select"> Select </button> </td>`;
  
      
      table += `</tr>`;
    });
  
    table += `</tbody>`;
  
    table += `</table>`;
  
    return table;
  
  }

  function generateProdTable(data) {

    if (data === undefined || data.length === 0) {
      return `<div class="alert alerrt-danger">
            <strong>
               No Data Present
            </strong>
          </div> `;
    }
  
    /* Read Schema from the 0th record from array */
  
    var properties = Object.keys(data[0]);
  
    if (properties === undefined || properties.length === 0) {
      return `<div class="alert alerrt-danger">
          <strong>
            The data is not in corrct shape
          </strong>
        </div> `;
    }
  
    var table = `<table class="table table-bordered table-striped" id="myTable">`;
    table += `<thead><tr>`;
    properties.forEach((header, index) => {
      table += `<th>${header}`;

      table += `<button class="btn  btn-primary sort-button" data-column="${header}">▲</button>`;

      table += `<button class="btn  btn-success reverse-button" data-column="${header}">▼</button>`;

      table += `</th>`;
    });
    table += `</tr></thead>`;
  
    table += `<tbody>`;
  
    data.forEach((prod, idx) => {
      table += `<tr class="prod-div" >`;
  
      properties.forEach((header, index) => {
        table += `<td>${prod[header]}</td>`;
      });
  
      // table += `<td> <button class="button-select bg-dark text-light in-row-btn" id="btn-select"> Select </button> </td>`;
  
      
      table += `</tr>`;
    });
  
    table += `</tbody>`;
  
    table += `</table>`;
  
    return table;
  
  }
