
let quizDiv = document.querySelector(".quiz")
let quizHeader = document.querySelector('.quiz-header');
let nextbtn = document.querySelector(".nextbtn");
let divAnswers = document.querySelector(".answers")
let point_score = document.getElementById("score")
let pointsDiv = document.getElementById("points")
let emailInput = document.getElementById("email");
let nameInput = document.getElementById("name");
let welcomUser = document.querySelector(".welcome_user")
let emailAlert = document.querySelector(".emailAlert");
let nameAlert = document.querySelector(".nameAlert")
let savedAnswer;
let box = '' ;
let storeUserData;
let quesIndex = 0 ;
let answerIndex = 0 ; 
let questions = [];
let questionBox = '';
 let score = 0 ;
//let nameSaved ;  // user name input 

let existingData;  // localStorage.setItem("UserData")


questions = [
  {  
    question: 'HTML stands for ?' ,
    options : ['HighText Machine Language' , 'HyperText and links Markup Language','HyperText Markup Language' , 'None of these'],
    correct : 'HyperText Markup Language'
  },
  { 
    question: ' Which of the following tag is used to insert a line-break in HTML?' ,
    options : ['&lt;br&gt;' , '&lt;a&gt;'  , '&lt;pre&gt;'  , '&lt;b&gt;' ],
    correct : '<br>' 
  },
  {  
    question: 'How to create an unordered list (a list with the list items in bullets) in HTML?' ,
    options : ['&lt;ol&gt;','&lt;li&gt;' , '&lt;i&gt;' , '&lt;ul&gt;'],
    correct : '<ul>' 
  },
  { 
    question: 'Which of the following tag is used to define options in a drop-down selection list?' ,
    options : ['&lt;select&gt;' , '&lt;list&gt;', '&lt;dropdown&gt;' , '&lt;option&gt;'],
    correct : '<option>'
  }

]




// If start quiz button clicked 
try {
  let startQuizBtn = document.getElementById("startBtn")
startQuizBtn.addEventListener("click",startQuiz)
function startQuiz(){

  if(nameInput.value!= "" && emailInput.value!="" ){

// check on local storage and get all data from local storage and save it in (existingData) variable
existingData = localStorage.getItem("userInfo") 
// check if found data in local storage or no
if(existingData == null){
// if you don't find data in local storge create new array to save input data in it 
 storeUserData = [];
}
else{
  // add data that you find in local storage (existingData) to the array & convert it to json
  storeUserData = JSON.parse(localStorage.getItem("userInfo"))
}

// create new object to save inputs data(name&email) in it 
         let userData=
         {
             name:nameInput.value,
             email:emailInput.value
         };
// then push object in array
         storeUserData.push(userData)
        
    // add Inputs value(name&email) in local storage after pushed in the array above 
  localStorage.setItem("userInfo" , JSON.stringify(storeUserData)); //(return string) localstorage stores string values only
        

    // clear user name from emailInput
         emailInput.value = '';
         nameInput.value = '';
  
       
    // transfer user from login page to quiz page (index.html)
        location.href='quiz.html';
      }
       else if(nameInput.value== "" && emailInput.value=="")
       {
        emailAlert.classList.remove("d-none");
        nameAlert.classList.remove('d-none');
     }
     else if(nameInput.value!= "" && emailInput.value=="")
     {
      nameAlert.classList.add('d-none');
      emailAlert.classList.remove("d-none");
    }
    else if(nameInput.value == "" && emailInput.value!="")
    {
     nameAlert.classList.remove('d-none');
     emailAlert.classList.add("d-none");
   }
   }
}
 catch (error) {
  console.log(error)
}



 // get all data from local storage (array of object)
 let nameSaved = JSON.parse(localStorage.getItem("userInfo"));

// get last user name in array to display it below
 let userName = nameSaved[nameSaved.length-1].name

// display user name in header of the question 
 welcomUser.innerHTML = `<h4> Welcome!  ${userName} </h4>` 



// Function To Display Question & answers when start quiz btn clicked
 displayQuestion_Answers();

 function displayQuestion_Answers(){

//loop on options array (answers) to display it in the quiz body in html 
questions[quesIndex].options.forEach((element, answerIndex) => {
  answerIndex++
  box+= `<div class="col-12 mt-3">
      <label for="answer${answerIndex}">${element}</label>
     <input type="radio" name="answer${answerIndex}" onclick="saveAnswer('${element}')"  id="ans${answerIndex}">
     </div>`; 

   
});
    divAnswers.innerHTML = box;

     // store question name in a variable to display it later
     questionBox = `  <h5> ${questions[quesIndex].question} </h5> `;

     // change question header in html  with the question varaible  above
     quizHeader.innerHTML = questionBox ;

}


function saveAnswer(answer) {
  savedAnswer = answer
 }


 

nextbtn.addEventListener('click',next)
function next(){
 if(savedAnswer == questions[quesIndex].correct){
   score++
  
   
 }else{
  console.log('savedanswer not equal')
 }

   box = '' ;
   quesIndex++

  if(quesIndex < questions.length )
{
  // welcomUser.innerHTML = `<h4> Welcome! ${displayName}</h4>`
  displayQuestion_Answers()
  box = '' ;
  answerIndex = 0 ;
 

}
else{
  // hide the quiz div with the questions and the answers 
  quizDiv.classList.add("d-none");
  // display div of the user points with the score below
  points.classList.remove("d-none");
  point_score.innerHTML = `Your Points ${score}`

}
}





