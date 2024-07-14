document.getElementById('connectWallet').addEventListener('click', connectToStellarWallet);

function connectToStellarWallet() {
    // Integrate Stellar wallet connection here
    alert('Connect to Stellar Wallet clicked!');
}

// Placeholder for questions data with comments including usernames
const questions = [
    {
        id: 1,
        content: "What is Stellar?",
        comments: [
            { user: "Alice", content: "It's a blockchain network.", likes: 0, dislikes: 0, userAction: null },
            { user: "Bob", content: "It's used for cross-border payments.", likes: 0, dislikes: 0, userAction: null }
        ]
    },
    {
        id: 2,
        content: "How to integrate Stellar with JavaScript?",
        comments: [
            { user: "Charlie", content: "Use the Stellar SDK.", likes: 0, dislikes: 0, userAction: null },
            { user: "Dave", content: "Check the official documentation.", likes: 0, dislikes: 0, userAction: null }
        ]
    },
    {
        id: 3,
        content: "What are the benefits of using Stellar?",
        comments: [
            { user: "Eve", content: "Low fees.", likes: 0, dislikes: 0, userAction: null },
            { user: "Frank", content: "Fast transactions.", likes: 0, dislikes: 0, userAction: null }
        ]
    }
];

const questionsList = document.getElementById('questionsList');
const selectedQuestionDiv = document.getElementById('selectedQuestion');
const answerModal = document.getElementById('answerModal');
const closeModal = document.getElementsByClassName('close')[0];
const postButton = document.getElementById('postButton');

// Display the list of questions
questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.textContent = question.content;
    questionElement.classList.add('question');
    questionElement.addEventListener('click', () => selectQuestion(index));
    questionsList.appendChild(questionElement);
});

function selectQuestion(index) {
    const question = questions[index];
    selectedQuestionDiv.innerHTML = `
        <div class="question-content">${question.content}</div>
        <div class="comments-section">
            <h3>Comments</h3>
            ${question.comments.map((comment, commentIndex) => `
                <div class="comment">
                    <p><strong>${comment.user}:</strong> ${comment.content}</p>
                    <div class="vote-buttons">
                        <i class="fas fa-thumbs-up like-icon ${comment.userAction === 'like' ? 'liked' : ''}" onclick="likeComment(${index}, ${commentIndex})"> (${comment.likes})</i>
                        <i class="fas fa-thumbs-down dislike-icon ${comment.userAction === 'dislike' ? 'disliked' : ''}" onclick="dislikeComment(${index}, ${commentIndex})"> (${comment.dislikes})</i>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="answer-button-section">
            <button class="answer-button" onclick="openModal(${index})">Answer</button>
        </div>
    `;
}


function openModal(index) {
    const question = questions[index];
    document.getElementById('modalQuestion').textContent = question.content;
    answerModal.style.display = 'block';
    postButton.onclick = () => postAnswer(index);
}

function closeModalFunc() {
    answerModal.style.display = 'none';
}

function postAnswer(index) {
    const answerInput = document.getElementById('answerInput').value;
    if (answerInput) {
        questions[index].comments.push({ user: "You", content: answerInput, likes: 0, dislikes: 0, userAction: null });
        selectQuestion(index);
        document.getElementById('answerInput').value = ''; // Clear input field
        closeModalFunc();
    }
}

function likeComment(questionIndex, commentIndex) {
    const comment = questions[questionIndex].comments[commentIndex];
    if (comment.userAction === 'like') {
        comment.likes--;
        comment.userAction = null;
    } else {
        if (comment.userAction === 'dislike') {
            comment.dislikes--;
        }
        comment.likes++;
        comment.userAction = 'like';
    }
    selectQuestion(questionIndex);
}

function dislikeComment(questionIndex, commentIndex) {
    const comment = questions[questionIndex].comments[commentIndex];
    if (comment.userAction === 'dislike') {
        comment.dislikes--;
        comment.userAction = null;
    } else {
        if (comment.userAction === 'like') {
            comment.likes--;
        }
        comment.dislikes++;
        comment.userAction = 'dislike';
    }
    selectQuestion(questionIndex);
}

// Close the modal when the user clicks on <span> (x)
closeModal.onclick = function() {
    closeModalFunc();
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target == answerModal) {
        closeModalFunc();
    }
}
