// Add your API endpoint here
var API_ENDPOINT = "https://gt15vhqz0d.execute-api.us-east-1.amazonaws.com/dev";

// AJAX POST request to save employee data
document.getElementById("saveemployee").onclick = function(){
    var inputData = {
        "employeeid": $('#employeeid').val(),
        "name": $('#name').val(),
        "department": $('#department').val(),
        "age": $('#age').val()
    };

    $.ajax({
        url: API_ENDPOINT,
        type: 'POST',
        data: JSON.stringify(inputData),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            document.getElementById("employeeSaved").innerHTML = "Employee Data Saved Successfully!";
            $('#employeeid').val('');
            $('#name').val('');
            $('#department').val('');
            $('#age').val('');
        },
        error: function () {
            alert("Error saving employee data.");
        }
    });
}

// AJAX GET request to fetch employee data
document.getElementById("getemployees").onclick = function(){  
    $.ajax({
        url: API_ENDPOINT,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#employeeTable tbody').empty();
            let employees = JSON.parse(response.body);

            if (employees.length === 0) {
                $('#employeeTable tbody').append(`<tr><td colspan="4" style="text-align: center;">No Employee Data Available</td></tr>`);
            } else {
                jQuery.each(employees, function(i, data) {          
                    $("#employeeTable tbody").append(
                        `<tr>
                            <td>${data.employeeid}</td>
                            <td>${data.name}</td>
                            <td>${data.department}</td>
                            <td>${data.age}</td>
                        </tr>`
                    );
                });
            }
        },
        error: function () {
            alert("Error retrieving employee data.");
        }
    });
}
