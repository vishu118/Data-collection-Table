const add = document.querySelector(".fa-plus")
const dialogue = document.querySelector(".dialogue-box")
const dataApplicant = document.querySelector(".dataApplicant")
const fullName = document.querySelector("#full-name");
const pan = document.querySelector("#PAN");
const age = document.getElementById("age");
const qualification = document.getElementById("edu");
const form = document.getElementById("person-data");
const submit = document.getElementById("submit");
const tablebody = document.getElementById('tablebody');
const del= document.querySelector('.delete')
const edit= document.querySelector('.edit')

const error = document.querySelector(".alert-message");

let count = 0;
// let masterDetails = [];

let masterDetails = JSON.parse(localStorage.getItem('applicantsDetails'));
 if(!masterDetails){
   masterDetails = [];
 }


masterDetails.map((obj)=>{
   // createList(obj);
})





add.addEventListener('click', ()=>{
   dialogue.style.display = "block"

})



form.addEventListener('submit',(e)=>{
e.preventDefault();
formValidation();
createList(details)
})





  function formValidation(e){
   if(fullName.value=="" || pan.value==""|| age.value=="" || qualification.value==""){
        error.innerText="Add Something In Input"
        setTimeout(()=>{
         error.innerText="";
       },1000)
   }else{
      error.innerText="";
      acceptata();
   }
}




const data = [];


let acceptata = ()=>{
   // data['Name']  = fullName.value;
   // data['Pan']  = pan.value;
   // data['Age']  = age.value;
   // data['Qualification']  = qualification.value;
   // data["id"] = count++
   // createList();
   // dialogue.style.display = "none"

   const details = {
      id : count++,
      Name : fullName.value,
      Pan : pan.value,
      Age : age.value,
      Qualification : qualification.value

   };

    masterDetails.push(details)
    localStorage.setItem('applicantsDetails',JSON.stringify(masterDetails))
    createList(details);
    dialogue.style.display = "none"

    resetForm()
}




let createList = (details)=>{
   const tableItems = document.createElement('tr');
   tableItems.setAttribute('id',details.id)
   tableItems.innerHTML+=
   `<tr>
   <td>${details.Name}</td>
   <td>${details.Pan}</td>
   <td>${details.Age}</td>
   <td>${details.Qualification}</td>
   <td><button class="delete btn">Delete</button><button class="edit btn">Edit</button></td>
    </tr>`

    tablebody.appendChild(tableItems)
}


tablebody.addEventListener('click',(e)=>{
   if(e.target.classList.contains('delete')){
      deletetableItems(e)
   }else if(e.target.classList.contains('edit')){
      edittableItems(e);
   }
})



function deletetableItems(e){
   masterDetails.forEach((ele,idx) => {
      if(ele.id == parseInt(e.path[2].id)){
         masterDetails.splice(idx,1)
      }
   });
   e.path[2].remove(); 
   console.log(e)
}




function edittableItems(e){
    editName = e.path[2].firstElementChild;
    editPan = editName.nextElementSibling;
    editAge = editPan.nextElementSibling;
    editQualification = editAge.nextElementSibling;
   //  console.log(editage)
  

   fullName.value = editName.innerText;
   pan.value = editPan.innerText;
   age.value = editAge.innerText;
   qualification.value = editQualification.innerText;
   

   submit.innerText = "Save"
   
   dialogue.style.display = "block"
   // console.log(e)
}
function resetForm(){
   fullName.value="";
   pan.value="";
   age.value="";
   qualification.value="";
}































































































































