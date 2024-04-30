const questions = [
    {
        question: "What percentage of the worlds energy is currently produced from renewable sources?",
        answers: [
            { text: "10%", correct: false},
            { text: "20%", correct: false},
            { text: "30%", correct: true},
            { text: "40%", correct: false},
        ]
    },
    {
        question: "Which of the following is NOT a greenhouse gas?",
        answers: [
            { text: "Carbon Dioxide (CO2)", correct: false},
            { text: "Methane (CH4)", correct: false},
            { text: "Nitrous Oxide (N2O)", correct: true},
            { text: "Hydrogen (H2)", correct: false},
        ]
    },
    {
        question: "What is the most common material found in landfills?",
        answers: [
            { text: "Plastic", correct: true},
            { text: "Glass", correct: false},
            { text: "Paper", correct: false},
            { text: "Metal", correct: false},
        ]
    },
    {
        question: "What is the largest source of greenhouse gas emissions in the United States?",
        answers: [
            { text: "Transportation", correct: true},
            { text: "Electricity", correct: false},
            { text: "Industry", correct: false},
            { text: "Agriculture", correct: false},
        ]
    },
    {
        question: "What is the process of using natural systems to replace human systems in the production of food called?",
        answers: [
            { text: "Permaculture", correct: true},
            { text: "Aquaculture", correct: false},
            { text: "Urban Agriculture", correct: false},
            { text: "Agroforestry", correct: false},
        ]
    },
    {
        question: "What is the name of the process of using waste as a resource?",
        answers: [
            { text: "Reduce, Reuse, Recycle", correct: false},
            { text: "Upcycled", correct: true},
            { text: "Compost", correct: false},
            { text: "Landfill", correct: false},
        ]
    },
    {
        question: "What is the name of the type of energy that comes from the sun?",
        answers: [
            { text: "Solar Energy", correct: true},
            { text: "Wind Energy", correct: false},
            { text: "Hydro Energy", correct: false},
            { text: "Geothermal Energy", correct: false},
        ]
    },
    {
        question: "What is the name of the type of energy that comes from the movement of air?",
        answers: [
            { text: "Solar Energy", correct: false},
            { text: "Wind Energy", correct: true},
            { text: "Hydro Energy", correct: false},
            { text: "Geothermal Energy", correct: false},
        ]
    },
    {
        question: "What is the name of the type of energy that comes from the movement of water?",
        answers: [
            { text: "Solar Energy", correct: false},
            { text: "Wind Energy", correct: false},
            { text: "Hydro Energy", correct: true},
            { text: "Geothermal Energy", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again?";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();