if (localStorage.getItem("issues") != null) {
    loadFromStorage();
  }
  
  function loadFromStorage() {
    let issues = JSON.parse(localStorage.getItem("issues"));
    let issueList = document.getElementById("issueList");
  
    issueList.innerHTML = "";
    debugger
    for (let i = 0; i < issues.length; i++) {
      let id = issues[i].id;
      let description = issues[i].description;
      let severity = issues[i].severity;
      let estimatedCompletion;
      console.log(issues[i].estimatedCompletion)
      if (issues[i].estimatedCompletion != ""){
        estimatedCompletion = issues[i].estimatedCompletion;
      }
      else{
        estimatedCompletion = "None"
      }
      let status = issues[i].status;
  
      issueList.innerHTML +=
        '<div class="issue">' +
        "<h6>Issue ID: " +
        id +
        "</h6>" +
        '<p><span class="label label-info">' +
        "Status: " +
        status +
        "</span></p>" +
        "<h3>" +
        description +
        "</h3>" +
        "<p>" +
        "Severity: " +
        severity +
        "</p>" +
        "<p>" +
        " Estimated Completion: " +
        estimatedCompletion +
        '</p> <a href="#" class="btn btn-remove" onclick="remove(\'' +
        id +
        "')\">Delete</a>" +
        "</div>";
    }
  }
  
  document.getElementById("issueInput").addEventListener("submit", saveToStorage);
  
  function saveToStorage() {
    let id = Date.now();
    let description = document.getElementById("issueDesc").value;
    let severity = document.getElementById("issueSeverity").value;
    let estimatedCompletion = document.getElementById("estimatedCompletion")
      .value;
    let status = "Open";
  
    let issue = {
      id,
      description,
      severity,
      estimatedCompletion,
      status,
    };
  
    if (localStorage.getItem("issues") === null) {
      let issues = [];
      issues.push(issue);
      localStorage.setItem("issues", JSON.stringify(issues));
    } else {
      let issues = JSON.parse(localStorage.getItem("issues"));
      issues.push(issue);
      localStorage.setItem("issues", JSON.stringify(issues));
    }
    document.getElementById("issueInput").reset();
  
    loadFromStorage();
  }
  
  function remove(id) {
    let issues = JSON.parse(localStorage.getItem("issues"));
  
    id = parseInt(id, 10);
  
    for (let i = issues.length - 1; i >= 0; i--) {
      if (issues[i].id === id) {
        console.log(issues);
        issues.splice(i, 1);
      }
    }
  
    localStorage.setItem("issues", JSON.stringify(issues));
  
    loadFromStorage();
  }
  