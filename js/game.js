// ============================================
// GAME ENGINE
// ============================================

const GameEngine = {
    
    // Show current dialogue or question
    showCurrentDialogue() {
        const dialogue = state.gameData.dialogues[state.currentDialogueIndex];
        
        if (!dialogue) {
            this.showEnding();
            return;
        }
        
        // Update progress bar
        const progress = (state.currentDialogueIndex / state.gameData.dialogues.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        
        // Update character expression
        const char = state.selectedCharacter;
        const expression = dialogue.expression || 'normal';
        this.updateCharacterSprite(char, expression);
        
        if (dialogue.type === 'dialogue') {
            this.showDialogue(dialogue);
        } else if (dialogue.type === 'question') {
            this.showQuestion(dialogue);
        }
    },
    
    // Display a dialogue
    showDialogue(dialogue) {
        document.getElementById('questionContainer').classList.remove('active');
        document.getElementById('dialogueBox').classList.add('active');
        document.getElementById('continueHint').style.display = 'block';
        document.getElementById('speakerName').textContent = dialogue.speaker;
        
        this.typeText(dialogue.text);
    },
    
    // Display a question
    showQuestion(dialogue) {
        document.getElementById('dialogueBox').classList.remove('active');
        document.getElementById('questionContainer').classList.add('active');
        document.getElementById('speakerName').textContent = dialogue.speaker;
        
        document.getElementById('questionText').textContent = dialogue.question;
        
        const optionsContainer = document.getElementById('answerOptions');
        optionsContainer.innerHTML = dialogue.options.map((opt, i) => `
            <button class="answer-btn" onclick="GameEngine.answerQuestion(${i})">${opt}</button>
        `).join('');
    },
    
    // Typing effect for dialogue
    typeText(text) {
        const element = document.getElementById('dialogueText');
        element.innerHTML = '';
        state.isTyping = true;
        state.currentTypingText = text; // Store current text for skip function
        
        let index = 0;
        const cursor = '<span class="typing-cursor"></span>';
        
        const type = () => {
            if (index < text.length) {
                element.innerHTML = text.substring(0, index + 1) + cursor;
                index++;
                state.typingTimeout = setTimeout(type, CONFIG.game.typingSpeed);
            } else {
                element.innerHTML = text;
                state.isTyping = false;
            }
        };
        
        type();
    },
    
    // Skip typing animation
    skipTyping() {
        if (state.isTyping) {
            clearTimeout(state.typingTimeout);
            if (state.currentTypingText) {
                document.getElementById('dialogueText').innerHTML = state.currentTypingText;
            }
            state.isTyping = false;
        }
    },
    
    // Handle click on game scene
    handleSceneClick() {
        if (state.isTyping) {
            this.skipTyping();
        } else {
            const dialogue = state.gameData.dialogues[state.currentDialogueIndex];
            if (dialogue && dialogue.type === 'dialogue') {
                state.currentDialogueIndex++;
                this.showCurrentDialogue();
            }
        }
    },
    
    // Handle answering a question
    answerQuestion(selectedIndex) {
        const dialogue = state.gameData.dialogues[state.currentDialogueIndex];
        const buttons = document.querySelectorAll('.answer-btn');
        const char = state.selectedCharacter;
        
        // Disable all buttons and show correct/incorrect
        buttons.forEach((btn, i) => {
            btn.disabled = true;
            if (i === dialogue.correct) {
                btn.classList.add('correct');
            } else if (i === selectedIndex) {
                btn.classList.add('incorrect');
            }
        });
        
        const isCorrect = selectedIndex === dialogue.correct;
        
        if (isCorrect) {
            state.currentScore++;
            document.getElementById('scoreDisplay').textContent = state.currentScore;
        }
        
        // Show reaction
        const reaction = isCorrect ? dialogue.reaction_correct : dialogue.reaction_incorrect;
        const expression = isCorrect ? dialogue.expression_correct : dialogue.expression_incorrect;
        
        this.updateCharacterSprite(char, expression);
        
        // Show reaction as a temporary dialogue
        setTimeout(() => {
            document.getElementById('questionContainer').classList.remove('active');
            document.getElementById('dialogueBox').classList.add('active');
            document.getElementById('continueHint').style.display = 'block';
            this.typeText(reaction);
            
            // Move to next dialogue
            state.currentDialogueIndex++;
            
            // Set up click handler to continue after reaction
            state.waitingForReactionClick = true;
        }, 1500);
    },
    
    // Handle click after showing reaction
    handleReactionClick() {
        if (state.waitingForReactionClick) {
            if (state.isTyping) {
                this.skipTyping();
            } else {
                state.waitingForReactionClick = false;
                this.showCurrentDialogue();
            }
        }
    },
    
    // Update character sprite
    updateCharacterSprite(character, expression) {
        const spriteContainer = document.getElementById('characterSprite');
        const imagePath = character.images[expression];
        
        // Try to load image, fallback to emoji
        const img = new Image();
        img.onload = () => {
            spriteContainer.innerHTML = `<img src="${imagePath}" alt="${character.name}" class="sprite-image">`;
        };
        img.onerror = () => {
            spriteContainer.innerHTML = `<span class="sprite-emoji">${getExpressionEmoji(character, expression)}</span>`;
        };
        img.src = imagePath;
    },
    
    // Show ending screen
    showEnding() {
        const percentage = (state.currentScore / state.totalQuestions) * 100;
        const char = state.selectedCharacter;
        
        let endingType, title;
        if (percentage >= 75) {
            endingType = 'good';
            title = t('endingGood');
        } else if (percentage >= 50) {
            endingType = 'neutral';
            title = t('endingNeutral');
        } else {
            endingType = 'bad';
            title = t('endingBad');
        }
        
        document.getElementById('endingTitle').textContent = title;
        
        // Update ending character
        const endingExpression = endingType === 'good' ? 'happy' : 
                                 endingType === 'neutral' ? 'normal' : 'angry';
        
        const endingCharContainer = document.getElementById('endingCharacter');
        const imagePath = char.images[endingExpression];
        
        const img = new Image();
        img.onload = () => {
            endingCharContainer.innerHTML = `<img src="${imagePath}" alt="${char.name}" class="ending-sprite-image">`;
        };
        img.onerror = () => {
            endingCharContainer.innerHTML = `<span class="ending-sprite-emoji">${getExpressionEmoji(char, endingExpression)}</span>`;
        };
        img.src = imagePath;
        
        document.getElementById('endingMessage').textContent = state.gameData.endings[endingType];
        document.getElementById('finalScore').textContent = state.currentScore;
        document.getElementById('finalPercentage').textContent = Math.round(percentage) + '%';
        
        // Update labels
        document.getElementById('correctAnswersLabel').textContent = t('correctAnswers');
        document.getElementById('comprehensionLabel').textContent = t('comprehension');
        document.getElementById('newPaperBtn').textContent = t('newPaperButton');
        document.getElementById('anotherRouteBtn').textContent = t('anotherRouteButton');
        
        UI.showScreen('endingScreen');
    },
    
    // Start a new game
    async start() {
        UI.showLoading(t('loadingGeneratingStory'));
        
        const char = state.selectedCharacter;
        const prompt = ApiService.buildPrompt(char, state.pdfText, state.language);
        
        try {
            const responseText = await ApiService.call(prompt);
            state.gameData = ApiService.parseResponse(responseText);
            state.currentDialogueIndex = 0;
            state.currentScore = 0;
            state.totalQuestions = state.gameData.dialogues.filter(d => d.type === 'question').length;
            state.waitingForReactionClick = false;
            
            // Update UI
            document.getElementById('totalQuestions').textContent = state.totalQuestions;
            document.getElementById('scoreDisplay').textContent = '0';
            document.getElementById('speakerName').textContent = char.name;
            document.getElementById('continueHint').textContent = t('continueHint');
            
            // Set background image
            const bgElement = document.getElementById('sceneBackground');
            if (char.background) {
                bgElement.style.backgroundImage = `url('${char.background}')`;
            } else {
                bgElement.style.backgroundImage = 'none';
            }
            
            // Initialize character sprite
            this.updateCharacterSprite(char, 'normal');
            
            UI.hideLoading();
            UI.showScreen('gameScreen');
            this.showCurrentDialogue();
            
        } catch (error) {
            UI.hideLoading();
            console.error('Error:', error);
            alert(t('errorGenerateStory') + error.message);
        }
    }
};
