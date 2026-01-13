// ============================================
// GLOBAL STATE
// ============================================

const state = {
    // Settings
    language: 'en',
    apiProvider: 'gemini',
    apiKey: '',
    
    // PDF data
    pdfText: '',
    pdfName: '',
    
    // Game state
    selectedCharacter: null,
    gameData: null,
    currentDialogueIndex: 0,
    currentScore: 0,
    totalQuestions: 0,
    
    // UI state
    isTyping: false,
    typingTimeout: null,
    waitingForReactionClick: false
};
