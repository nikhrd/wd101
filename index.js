document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const entriesTable = document.getElementById("entriesTable").querySelector("tbody");
    const today = new Date();
    
    function loadEntries() {
      const entries = JSON.parse(localStorage.getItem("entries")) || [];
      entries.forEach(entry => {
        addTableRow(entry);
      });
    }
  
    function addTableRow(entry) {
      const row = entriesTable.insertRow();
      row.insertCell(0).textContent = entry.name;
      row.insertCell(1).textContent = entry.email;
      row.insertCell(2).textContent = entry.password;
      row.insertCell(3).textContent = entry.dob;
      row.insertCell(4).textContent = entry.acceptedTerms ? "true" : "false";
    }
  
    function isValidDob(dob) {
      const dobDate = new Date(dob);
      const age = today.getFullYear() - dobDate.getFullYear();
      const ageMonthDiff = today.getMonth() - dobDate.getMonth();
      const ageDayDiff = today.getDate() - dobDate.getDate();
  
      // Adjust age if today's date is earlier in the year than the birth date
      if (ageMonthDiff < 0 || (ageMonthDiff === 0 && ageDayDiff < 0)) {
        return age - 1;
      }
      return age;
    }
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const dob = document.getElementById("dob").value;
      const terms = document.getElementById("terms").checked;
  
      const age = isValidDob(dob);
      
      if (age < 18 || age > 55) {
        alert("Date of birth must be for someone between 18 and 55 years old.");
        return;
      }
  
      const newEntry = {
        name,
        email,
        password,
        dob,
        acceptedTerms: terms
      };
  
      // Save to local storage
      const entries = JSON.parse(localStorage.getItem("entries")) || [];
      entries.push(newEntry);
      localStorage.setItem("entries", JSON.stringify(entries));
  
      // Add to table
      addTableRow(newEntry);
  
      // Clear the form
      form.reset();
    });
  
    loadEntries(); // Load saved entries on page load
  });
