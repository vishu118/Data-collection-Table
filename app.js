const add = document.querySelector(".fa-plus")
const dialogue = document.querySelector(".dialogue-box")
const dataApplicant = document.querySelector(".dataApplicant")
const fullName = document.querySelector("#full-name");
const pan = document.querySelector("#PAN");
const age = document.getElementById("age");
const search = document.getElementById("search");
const qualification = document.getElementById("edu");
const form = document.getElementById("person-data");
const submit = document.getElementById("submit");
const tablebody = document.getElementById('tablebody');
const sort = document.getElementById('sort');
const del= document.querySelector('.delete')
const edit= document.querySelector('.edit')
const error = document.querySelector(".alert-message");
const sortBtn = document.querySelector(".sortBtn");
const msg = document.querySelector(".msg");



let editName,editAge,editQualification,editPan;


let count = 0;


let masterArray = JSON.parse(localStorage.getItem('applicantsDetails'));
 if(!masterArray){
   masterArray = [];
 }else{
   retrivedata();
 }
// console.log(masterArray)



function retrivedata(){
   masterArray.map((obj)=>{
      createList(obj);
      
   })
}







add.addEventListener('click', ()=>{
   dialogue.style.display = "block"

})



form.addEventListener('submit',(e)=>{
   e.preventDefault();
  
   formValidation();
  
   
})





  function formValidation(e){
   if(fullName.value=="" || pan.value==""|| age.value=="" || qualification.value==""){
        error.innerText="Add Something In Input"
        setTimeout(()=>{
         error.innerText="";
       },1000)
      }else{

      
         acceptata();
         

      }
}







let acceptata = ()=>{
   // data['Name']  = fullName.value;
   // data['Pan']  = pan.value;
   // data['Age']  = age.value;
   // data['Qualification']  = qualification.value;
   // data["id"] = count++
   // createList();
   // dialogue.style.display = "none"

   let details = {
      id : count++,
      Name : fullName.value,
      Pan : pan.value,
      Age : age.value,
      Qualification : qualification.value

   };
   
    createList(details);
    masterArray.push(details)
    localStorage.setItem('applicantsDetails',JSON.stringify(masterArray))
    
    dialogue.style.display = "none"

    resetForm()
}




function createList(details){
   let tableItems = document.createElement('tr');
   tableItems.setAttribute('id',details.id)
   tableItems.innerHTML+=
   `<tr>
   <td>${details.Name}</td>
   <td>${details.Pan}</td>
   <td>${details.Age}</td>
   <td>${details.Qualification}</td>
   <td><button class="delete btn">Delete</button>
       <button class="edit btn">Edit</button>
       </td>
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
   masterArray.forEach((ele,idx) => {
      if(ele.id == parseInt(e.path[2].id)){
         masterArray.splice(idx,1)
      }
   });
   e.path[2].remove(); 
   // console.log(e)

   localStorage.setItem('applicantsDetails',JSON.stringify(masterArray))
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
   deletetableItems(e)

}



// function editAndSave(e,Name,Age,Pan,Qualification){
//    e.preventDefault();
//    masterArray.map((val)=>{
//       if(val.id == e.target.id){

//       }
//    })

// }
// sort ////////////////////







sort.addEventListener('change',(e)=>{
 if(e.target.value=="inc"){
   tablebody.innerHTML = "";
  masterArray.sort(function(a,b){
         if(a.Name.toLowerCase() < b.Name.toLowerCase()){
            return -1;
         }
         if(a.Name.toLowerCase() > b.Name.toLowerCase()){
            return 1;
         }
         return 0;
      });

      retrivedata();
// console.log('yes')
 }

 if(e.target.value=="dec"){
   tablebody.innerHTML = "";
   masterArray.sort(function(a,b){
          if(a.Name.toLowerCase() < b.Name.toLowerCase()){
             return 1;
          }
          if(a.Name.toLowerCase() > b.Name.toLowerCase()){
             return -1;
          }
          return 0;
       });
       retrivedata()
       //  console.log("no")
  }

 
}) 


search.addEventListener('input',()=>{
   searchPan()
})

function searchPan(e){
   tablebody.innerHTML = "";

   let searchValue = search.value;
   console.log(searchValue)
 
   
   let result = masterArray.filter((val)=>{
      if(val.Pan.includes(searchValue)){
         return val;
      }
   })
  if(result.length!=0){
   result.map((val)=>{
      createList(val)
   })
  }else{
   let val = msg.innerHTML="No Data Found !!!"
   setTimeout(()=>{
      msg.innerHTML="";
    },1000)
  }
}
   







function resetForm(){
   fullName.value="";
   pan.value="";
   age.value="";
   qualification.value="";
}































































































































