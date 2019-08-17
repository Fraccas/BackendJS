
let chirpsA = [];
let editID = -1;

// create new chirp when form button clicked
$('#fButton').click(() => {
    let chirp = { name: $('#userN').val(), text: $('#userT').val() };
    // post new chirp from form
    $.ajax({
        type: 'POST',
        url: "http://localhost:3000/api/chirps/",
        data: JSON.stringify(chirp),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        success: function (res) {
            location.reload();
        },
        error: function (xhr, status) {
            console.log(status);
        }
    });
});

// display all chirps
$.getJSON("http://localhost:3000/api/chirps/", function (data) {
    $.each(data, function (key, val) {
        if (val.name) {
            let cObj = { key: key, name: val.name, text: val.text }
            chirpsA.push(cObj);
            $('#chirp-container').append('<div class="chirp shadow-lg m-2 p-2 bg-dark text-light border border-dark rounded" name=' + key + '">' + val.name + ': ' + val.text + '<div class="chripButtonHolder m-1 p-2"><button type="button" class="editB ml-1 btn btn-warning font-weight-bold" value="'+key+'" data-toggle="modal" data-target="#exampleModalLong">Edit</button><button id="delButton" value="' + key + '" class="delB ml-1 btn btn-danger font-weight-bold">Delete</button></div></div>');
        }
    });
});

// delete button clicked
$('body').on('click', '.delB', function () {
    // post new chirp from form
    $.ajax({
        type: 'DELETE',
        url: "http://localhost:3000/api/chirps/delete/" + this.value,
        data: this.value,
        contentType: "text",
        crossDomain: true,
        success: function (res) {
            alert('Chirp has been deleted from the server!');
            location.reload();
        },
        error: function (xhr, status) {
            console.log(status);
        }
    });
});

// EDIT CHIRP SECTION

// get edit chirp info
$('body').on('click', '.editB', function () {
    editID = this.value;
    console.log(editID);
});

//update chirp when clicked
$('body').on('click', '#saveEditB', function () {
    let c = chirpsA.find(chirp => chirp.key == editID); // used to pull key(id) for url and get name
    let chirp = { name: c.name, text: $("#updateText").val() } // send chirp object
    // post new chirp from form    
    $.ajax({
        type: 'PUT',
        url: "http://localhost:3000/api/chirps/update/" + c.key,
        data: JSON.stringify(chirp),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        success: function (res) {
            location.reload();
        },
        error: function (xhr, status) {
            console.log(status);
        }
    });
});


