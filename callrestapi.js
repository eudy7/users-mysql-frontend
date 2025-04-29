var url = "https://users-mysql-backend.onrender.com/api/users";

function postUser() {
  var myName = $('#name').val().trim();
  var myEmail = $('#email').val().trim();
  var myAge = $('#age').val().trim();
  var myComments = $('#comments').val().trim();

  if (!myName || !myEmail) {
    alert('⚠️ Name and Email are required!');
    return;
  }

  var myuser = {
    name: myName,
    email: myEmail,
    age: myAge || null,
    comments: myComments || null
  };

  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(myuser),
    success: function () {
      getUsers();
    },
    error: function () {
      alert('❌ Error al guardar usuario');
    }
  });
}

function getUsers() {
  $.getJSON(url, function (response) {
    var users = Array.isArray(response) ? response : response.users;

    var htmlTableUsers = `
      <table border="1" style="border-collapse: collapse; width: 100%; margin-top: 1em;">
        <thead style="background-color: #f0f0f0;">
          <tr>
            <th style="padding: 8px;">ID</th>
            <th style="padding: 8px;">Name</th>
            <th style="padding: 8px;">Email</th>
            <th style="padding: 8px;">Age</th>
            <th style="padding: 8px;">Comments</th>
          </tr>
        </thead>
        <tbody>
    `;

    users.forEach(function (item) {
      htmlTableUsers += `
        <tr>
          <td style="padding: 8px;">${item.id}</td>
          <td style="padding: 8px;">${item.name || '-'}</td>
          <td style="padding: 8px;">${item.email || '-'}</td>
          <td style="padding: 8px;">${item.age || '-'}</td>
          <td style="padding: 8px;">${item.comments || '-'}</td>
        </tr>
      `;
    });

    htmlTableUsers += '</tbody></table>';
    $('#resultado').html(htmlTableUsers);
  }).fail(function () {
    alert('❌ Error al obtener usuarios');
  });
}
