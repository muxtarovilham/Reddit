

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the user data from localStorage
    let userData = JSON.parse(localStorage.getItem("user"));

    // Check if userData is not null or undefined and if it has at least one user
    if (userData && userData.length > 0) {
        // Assuming that the first item in the array is the user object
        let user = userData[0];

        // Access the "firstname" property from the user object
        let firstname = user.username;

        // Display the firstname in the paragraph element
        document.getElementById("usernamee").textContent = firstname;
    } else {
        // If userData is not available or doesn't have any users, handle it accordingly
        document.getElementById("usernamee").textContent = "";
    }
});




document.addEventListener("DOMContentLoaded", function () {
    var usernameeElement = document.getElementById("usernamee");
    var loginModalElement = document.getElementById("loginModal");

    if (usernameeElement.innerHTML.trim() !== "") {
        loginModalElement.style.display = "none";
    } else {
        loginModalElement.style.display = "block";
    }
});


function toggleLoginSections() {
    var usernameElement = document.getElementById("usernamee");
    var loginFirst = document.getElementById("loginFirst");
    var loginSecond = document.getElementById("loginSecond");

    if (usernameElement.innerHTML.trim() === "") {
        // Username is empty, show loginFirst, hide loginSecond
        loginFirst.style.display = "block";
        loginSecond.style.display = "none";
    } else {
        // Username is not empty, show loginSecond, hide loginFirst
        loginFirst.style.display = "none";
        loginSecond.style.display = "block";
    }
}

// Call the function on page load (assuming you have a body element)
document.body.onload = toggleLoginSections;


fetch('db.json') // Eğer HTML ve JSON aynı dizinde ise
    .then(response => response.json())
    .then(data => {
        const gamingData = data.gaming;
        console.log(gamingData);
    })
    .catch(error => console.error('Veri getirme hatası:', error));




// Darkmod

function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}




function endAccount() {
    // localStorage'dan "user" adlı öğeyi sil
    localStorage.removeItem("user");

    console.log("User signed out. LocalStorage key 'user' removed.");
}

// Change Username



var userData = localStorage.getItem("user");

// Veriyi JSON formatından diziye çevir
var userArray = JSON.parse(userData);

// "userAbout" ID'sine sahip div elemanını seç
var userAboutDiv = document.getElementById("userAbout");

// "message" ID'sine sahip div elemanını seç

// Eğer userArray dizisi varsa ve en az bir eleman içeriyorsa
if (userArray && userArray.length > 0) {
    // En sonuncu elemanı al
    var latestUser = userArray[userArray.length - 1];

    // HTML içine bilgileri ekle
    userAboutDiv.innerHTML = `
        <div class="blue">
            <p><i class="fa-brands fa-reddit-alien" style="color: orangered; font-size: 33px;"></i> ${latestUser.username} <input id="usernameInput" type="text"> <button onclick="usernameChange()">Change</button></p>
            <p style="border: none" id="message"></p>
            <p>Email: ${latestUser.email}</p>
            <p>First Name: ${latestUser.firstname}</p>
            <p>Last Name: ${latestUser.lastname}</p>
            <p>Phone Number: ${latestUser.pnumber}</p>
            <button onclick="changeOn()">Change password</button>
        </div>
    `;
} else {
    // Eğer userArray boşsa veya eleman içermiyorsa bir mesaj ekle
    userAboutDiv.innerHTML = "<p>No user information available.</p>";
}

var messageDiv = document.getElementById("message");

function usernameChange() {
    // Input alanındaki değeri al
    var newUsername = document.getElementById("usernameInput").value;

    // localStorage'dan "user" anahtarını al
    var userData = localStorage.getItem("user");

    // Veriyi JSON formatından diziye çevir
    var userArray = JSON.parse(userData);

    // Eğer userArray dizisi varsa ve en az bir eleman içeriyorsa
    if (userArray && userArray.length > 0) {
        // En sonuncu elemanı al
        var latestUser = userArray[userArray.length - 1];

        // "username" öğesini güncelle
        latestUser.username = newUsername;

        // Güncellenmiş veriyi localStorage'a geri yaz
        localStorage.setItem("user", JSON.stringify(userArray));

        // Başarı mesajını ekrana yazdır
        showSuccessMessage("Username changed successfully.");

        // API'ye güncellenmiş veriyi POST et
        postUserDataToApi(latestUser);
    } else {
        // Eğer userArray boşsa veya eleman içermiyorsa bir mesaj ekle
        showErrorMessage("No user information available.");
    }
}

function showSuccessMessage(message) {
    // Başarı mesajını ekrana yazdır
    messageDiv.style.display = 'block'
    messageDiv.innerHTML = `<p style="color: green; border:none; display: contents; padding: 0px">${message}</p>`;
    setTimeout(() => {
        window.location.reload()
    }, 1453);
}

function showErrorMessage(message) {
    // Hata mesajını ekrana yazdır
    messageDiv.style.display = 'block'
    messageDiv.innerHTML = `<p style="color: red;">${message}</p>`;
    setTimeout(() => {
        window.location.reload()
    }, 1453);
}




function postUserDataToApi(updatedUserData) {
    // API endpoint
    var apiUrl = "https://655e356a9f1e1093c59ab81c.mockapi.io/Api3/Api3";

    // POST request ayarları
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
    };

    // Fetch API kullanarak POST request gönder
    fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => console.log("Data successfully posted to API:", data))
        .catch(error => console.error("Error posting data to API:", error));
}


// Change Password



var userDiv = document.getElementById("userDiv");

userDiv.style.display = 'none'

function changeOn() {
    if (userDiv.style.display === 'none') {
        // If it is, change it to 'block'
        userDiv.style.display = 'flex';
    } else {
        // If it is not, change it to 'none'
        userDiv.style.display = 'none';
    }
}


var userData = localStorage.getItem("user");

// Veriyi JSON formatından diziye çevir
var userArray = JSON.parse(userData);

// "userAbout" ID'sine sahip div elemanını seç
var userAboutDivs = document.getElementById("userPassAbout");

// "message" ID'sine sahip div elemanını seç

// Eğer userArray dizisi varsa ve en az bir eleman içeriyorsa
if (userArray && userArray.length > 0) {
    // En sonuncu elemanı al
    var latestUser = userArray[userArray.length - 1];

    // HTML içine bilgileri ekle
    userAboutDivs.innerHTML = `
    <div id="userPassAbout" class="blue">
    <h1 style="font-size: 21px; color: green; font-weight: 600;">Change password</h1>
    <span>Enter current password:</span>
    <input id="currentPasswordInput" type="password" placeholder="Enter current password">
    <span>Enter new password:</span>
    <input id="newPasswordInput" type="password" placeholder="Enter new password">
    <span>Confirm new password:</span>
    <input id="confirmPasswordInput" type="password" placeholder="Confirm new password">
    <p style="border: none" id="messages"></p>
    <button onclick="passwordChange()">Confirm</button>
</div>
    `;
} else {
    // Eğer userArray boşsa veya eleman içermiyorsa bir mesaj ekle
    userAboutDivs.innerHTML = "<p>No user information available.</p>";
}

var messageDivs = document.getElementById("messages");

function passwordChange() {
    var currentPassword = document.getElementById("currentPasswordInput").value;
    var newPassword = document.getElementById("newPasswordInput").value;
    var confirmPassword = document.getElementById("confirmPasswordInput").value;

    var userData = localStorage.getItem("user");
    var userArray = JSON.parse(userData);

    if (userArray && userArray.length > 0) {
        var latestUser = userArray[userArray.length - 1];

        // Check if the current password matches the stored password
        if (currentPassword === latestUser.password) {
            // Check if the new password and confirm password match
            if (newPassword === confirmPassword) {
                // Update the password in the user data
                latestUser.password = newPassword;

                // Update the local storage
                localStorage.setItem("user", JSON.stringify(userArray));

                // Display success message
                showSuccessMessages("Password changed successfully.");
                postUserDataToApi(latestUser);


            } else {
                showErrorMessages("New password and confirm password do not match.");
            }
        } else {
            showErrorMessages("Current password is incorrect.");
        }
    } else {
        showErrorMessages("No user information available.");
    }
}

function showSuccessMessages(message) {
    // Başarı mesajını ekrana yazdır
    messageDivs.style.display = 'block'
    messageDivs.innerHTML = `<p style="color: green; border:none; display: contents; padding: 0px">${message}</p>`;
    setTimeout(() => {
        window.location.reload()
    }, 1453);
}

function showErrorMessages(message) {
    // Hata mesajını ekrana yazdır
    messageDivs.style.display = 'block'
    messageDivs.innerHTML = `<p style="color: red; border:none; display: contents; padding: 0px">${message}</p>`;
    setTimeout(() => {
        window.location.reload()
    }, 1453);
}