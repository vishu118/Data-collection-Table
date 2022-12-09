// ================================================All Selectors==============================================================

const add = document.querySelector(".fa-plus");
const dialogue = document.querySelector(".dialogue-box");
const dataApplicant = document.querySelector(".dataApplicant");
const fullName = document.querySelector("#full-name");
const pan = document.querySelector("#PAN");
const age = document.getElementById("age");
const search = document.getElementById("search");
const qualification = document.getElementById("edu");
const form = document.getElementById("person-data");
const submit = document.getElementById("submit");
const tablebody = document.getElementById("tablebody");
const sort = document.getElementById("sort");
const del = document.querySelector(".delete");
const edit = document.querySelector(".edit");
const error = document.querySelector(".alert-message");
const sortBtn = document.querySelector(".sortBtn");
const msg = document.querySelector(".msg");

//=====================================variable declaration ====================================================

let editName, editAge, editQualification, editPan;

let count = 0;

//=========================================Retrive previously stored data=======================================

let masterArray = JSON.parse(localStorage.getItem("applicantsDetails"));
if (!masterArray) {
  masterArray = [];
} else {
  retrivedata();
}

//======================================Function To Retrive Data==================================================

function retrivedata() {
   masterArray.map((obj) => {
        createList(obj);
    });
}

//=====================================opening of dialogue box =================================================


add.addEventListener("click", () => {
       dialogue.style.display = "block";
   });

form.addEventListener("submit", (e) => {
  e.preventDefault();

  formValidation();
});



//====================================Function for form Validation =======================================================

function formValidation(e) {
  if (
    fullName.value == "" ||
    pan.value == "" ||
    age.value == "" ||
    qualification.value == ""
  ) {
    error.innerText = "Add Something In Input";
    setTimeout(() => {
      error.innerText = "";
    }, 1000);
  } else {
    acceptata();
  }
}



//=============================================Function to accept Data from inputbox==============================


let acceptata = () => {
  let details = {
      id: count++,
      Name: fullName.value,
      Pan: pan.value,
      Age: age.value,
      Qualification: qualification.value,
  };

  createList(details);
  masterArray.push(details);
  localStorage.setItem("applicantsDetails", JSON.stringify(masterArray));
  dialogue.style.display = "none";
  
  resetForm();
};


//=======================================function to create table for iput data==================================



function createList(details) {
    let tableItems = document.createElement("tr");
    tableItems.setAttribute("id", details.id);
    tableItems.innerHTML += `<tr>
                            <td>${details.Name}</td>
                            <td>${details.Pan}</td>
                            <td>${details.Age}</td>
                            <td>${details.Qualification}</td>
                            <td>  <button class="delete btn">Delete</button>
                                  <button class="edit btn">Edit</button>
                                 </td>
                            </tr>`;

    tablebody.appendChild(tableItems);
}


//======================================Deleteing the selected data from table as well as Local Storage===========



tablebody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    deletetableItems(e);
  } else if (e.target.classList.contains("edit")) {
    edittableItems(e);
  }
});

function deletetableItems(e) {
  masterArray.forEach((ele, idx) => {
    if (ele.id == parseInt(e.path[2].id)) {
      masterArray.splice(idx, 1);
    }
  });
  e.path[2].remove();

  localStorage.setItem("applicantsDetails", JSON.stringify(masterArray));
}


//==================================Function to edit data present in the table ================================


function edittableItems(e) {
    editName = e.path[2].firstElementChild;
    editPan = editName.nextElementSibling;
    editAge = editPan.nextElementSibling;
    editQualification = editAge.nextElementSibling;

    fullName.value = editName.innerText;
    pan.value = editPan.innerText;
    age.value = editAge.innerText;
    qualification.value = editQualification.innerText;

    submit.innerText = "Save";
    dialogue.style.display = "block";
    deletetableItems(e);
}

// function editAndSave(e,Name,Age,Pan,Qualification){
//    e.preventDefault();
//    masterArray.map((val)=>{
//       if(val.id == e.target.id){

//       }
//    })

// }




//=================================Sort the Data present in the table A-Z or Z-A ============================


//===============================FOR ALPHABETICAL ORDER=======================================================

sort.addEventListener("change", (e) => {
  if (e.target.value == "inc") {
    tablebody.innerHTML = "";
    masterArray.sort(function (a, b) {
      if (a.Name.toLowerCase() < b.Name.toLowerCase()) {
        return -1;
      }
      if (a.Name.toLowerCase() > b.Name.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    retrivedata();
    // console.log('yes')
  }

//==============================FOR REVERSE ORDER====================================================

  if (e.target.value == "dec") {
    tablebody.innerHTML = "";
    masterArray.sort(function (a, b) {
      if (a.Name.toLowerCase() < b.Name.toLowerCase()) {
        return 1;
      }
      if (a.Name.toLowerCase() > b.Name.toLowerCase()) {
        return -1;
      }
      return 0;
    });
    retrivedata();
    //  console.log("no")
  }
});


//=====================================Searching DATA using pan number==========================================

search.addEventListener("input", () => {
  searchPan();
});

function searchPan(e) {
  tablebody.innerHTML = "";

  let searchValue = search.value;
  console.log(searchValue);

  let result = masterArray.filter((val) => {
    if (val.Pan.includes(searchValue)) {
      return val;
    }
  });
  if (result.length != 0) {
    result.map((val) => {
      createList(val);
    });
  } else {
    let val = (msg.innerHTML = "No Data Found !!!");
    setTimeout(() => {
      msg.innerHTML = "";
    }, 1000);
  }
}



//=========================================Reset form ============================================================

function resetForm() {
  fullName.value = "";
  pan.value = "";
  age.value = "";
  qualification.value = "";
}



//===============================================END=============================================================