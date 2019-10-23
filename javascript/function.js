var questions = [{
  question: "1. How do you write 'Hello World' in an alert box?",
  choices: ["msg('Hello World')", "msgBox('Hello World');", "alertBox('Hello World');", "alert('Hello World');"],
  correctAnswer: 3
}, {
  question: "2. Which of these weapons is not an SMG in Destiny 2?",
  choices: ["The Riskrunner", "Deathbringer"],
  correctAnswer: 1
}, {
  question: "3. What faction did Cayde-6 lead?",
  choices: ["The Hunters", "The Titans", "The Warlocks", "The Vanguard"],
  correctAnswer: 0
}, {
  question: "4. How do you output something in Java?",
  choices: ["System.out.print()", "console.log()"],
  correctAnswer: 0
}, {
  question: "5. Which of the following can't be used as a variable identifier in Java?",
  choices: ["triple", "double", "int", "boolean"],
  correctAnswer: 0
},{
question: "6. Which software company developed JavaScript?",
  choices: ["Mozilla", "Netscape", "Sun Microsystems", "Oracle"],
  correctAnswer: 1
},{
question: "7. What would be the result of 3+2+'7'?",
  choices: ["327", "12", "14", "57"],
  correctAnswer: 3
},{
question: "8. What is the name of the first campaign in Destiny 2?",
  choices: ["The Red War", "The Curse Of Osiris", "Warmind", "Forsaken"],
  correctAnswer: 0
},{
question: "9. How can a value be appended to an array?",
  choices: ["arr(length).value;", "arr[arr.length]=value;", "arr[]=add(value);", "None of these"],
  correctAnswer: 1
},{
question: "10. What will the code below output to the console? console.log(1 +  +'2' + '2');",
  choices: ["'32'", "'122'", "'13'", "'14'"],
  correctAnswer: 0
}];


var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var time=180;
var t;
$(document).ready(function () 
{
  // Display the first question
  displayCurrentQuestion();
  $(this).find(".quizMessage").hide();
  $(this).find(".preButton").attr('disabled', 'disabled');

timedCount();

$(this).find(".preButton").on("click", function () 
{		
  
      if (!quizOver) 
  {
    if(currentQuestion == 0) { return false; }

    if(currentQuestion == 1) {
      $(".preButton").attr('disabled', 'disabled');
    }
    
      currentQuestion--; // Since we have already displayed the first question on DOM ready
      if (currentQuestion < questions.length) 
      {
        displayCurrentQuestion();
        
      } 					
  } else {
    if(viewingAns == 3) { return false; }
    currentQuestion = 0; viewingAns = 3;
    viewResults();		
  }
  });


// On clicking next, display the next question
  $(this).find(".nextButton").on("click", function () 
{
      if (!quizOver) 
  {
    
          var val = $("input[type='radio']:checked").val();

          if (val == undefined) 
    {
              $(document).find(".quizMessage").text("Please select an answer");
              $(document).find(".quizMessage").show();
          } 
    else 
    {
              // TODO: Remove any message -> not sure if this is efficient to call this each time....
              $(document).find(".quizMessage").hide();
      if (val == questions[currentQuestion].correctAnswer) 
      {
        correctAnswers++;
      }
      iSelectedAnswer[currentQuestion] = val;
      
      currentQuestion++; // Since we have already displayed the first question on DOM ready
      if(currentQuestion >= 1) {
          $('.preButton').prop("disabled", false);
      }
      if (currentQuestion < questions.length) 
      {
        displayCurrentQuestion();
        
      } 
      else 
      {
        displayScore();
        $('#iTimeShow').html('Quiz Time Completed!');
        $('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
        c=185;
        $(document).find(".preButton").text("View Answer");
        $(document).find(".nextButton").text("Play Again?");
        quizOver = true;
        return false;
        
      }
    }
        
  }	
  else 
  { // quiz is over and clicked the next button (which now displays 'Play Again?'
    quizOver = false; $('#iTimeShow').html('Time Remaining:'); iSelectedAnswer = [];
    $(document).find(".nextButton").text("Next Question");
    $(document).find(".preButton").text("Previous Question");
     $(".preButton").attr('disabled', 'disabled');
    resetQuiz();
    viewingAns = 1;
    displayCurrentQuestion();
    hideScore();
  }
  });
});



function timedCount()
{
  if(time == 185) 
  { 
    return false; 
  }
  
  var minutes = parseInt( time / 60 ) % 60;
  var seconds = time % 60;
  var result = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);            
  $('#timer').html(result);
  
  if(time == 0 )
  {
        displayScore();
        $('#iTimeShow').html('Quiz Time Completed!');
        $('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
        time=185;
        $(document).find(".preButton").text("View Answer");
        $(document).find(".nextButton").text("Play Again?");
        quizOver = true;
        return false;
        
  }
  time = time - 1;
  t = setTimeout(function()
  {
    timedCount()
  },1000);
}


// This displays the current question AND the choices
function displayCurrentQuestion() 
{

if(time == 185) { time = 180; timedCount(); }
  //console.log("In display current Question");
  var question = questions[currentQuestion].question;
  var questionClass = $(document).find(".quizContainer > .question");
  var choiceList = $(document).find(".quizContainer > .choiceList");
  var numChoices = questions[currentQuestion].choices.length;
  // Set the questionClass text to the current question
  $(questionClass).text(question);
  // Remove all current <li> elements (if any)
  $(choiceList).find("li").remove();
  var choice;


  for (i = 0; i < numChoices; i++) 
{
      choice = questions[currentQuestion].choices[i];
  
  if(iSelectedAnswer[currentQuestion] == i) {
    $('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
  } else {
    $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
  }
  }
}

function resetQuiz()
{
  currentQuestion = 0;
  correctAnswers = 0;
  hideScore();
}

function displayScore()
{
  $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
  $(document).find(".quizContainer > .result").show();
}

function hideScore() 
{
  $(document).find(".result").hide();
}

// This displays the current question AND the choices
function viewResults() 
{

if(currentQuestion == 10) { currentQuestion = 0;return false; }
if(viewingAns == 1) { return false; }

hideScore();
  var question = questions[currentQuestion].question;
  var questionClass = $(document).find(".quizContainer > .question");
  var choiceList = $(document).find(".quizContainer > .choiceList");
  var numChoices = questions[currentQuestion].choices.length;
  // Set the questionClass text to the current question
  $(questionClass).text(question);
  // Remove all current <li> elements (if any)
  $(choiceList).find("li").remove();
  var choice;


for (i = 0; i < numChoices; i++) 
{
      choice = questions[currentQuestion].choices[i];
  
  if(iSelectedAnswer[currentQuestion] == i) {
    if(questions[currentQuestion].correctAnswer == i) {
      $('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
    } else {
      $('<li style="border:2px solid red;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
    }
  } else {
    if(questions[currentQuestion].correctAnswer == i) {
      $('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
    } else {
      $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
    }
  }
  }

currentQuestion++;

setTimeout(function()
  {
    viewResults();
  },3000);
}
