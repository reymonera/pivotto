// ============================================
// CONFIGURATION & INTERNATIONALIZATION
// ============================================

const CONFIG = {
    // Default language: 'en' or 'es'
    defaultLanguage: 'en',
    
    // API Settings
    api: {
        gemini: {
            baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
            name: 'Google Gemini'
        },
        deepseek: {
            baseUrl: 'https://api.deepseek.com/chat/completions',
            name: 'DeepSeek'
        }
    },
    
    // Game settings
    game: {
        typingSpeed: 30, // ms per character
        questionsPerGame: 4,
        maxPdfLength: 15000 // characters to send to API
    }
};

// ============================================
// TRANSLATIONS
// ============================================

const TRANSLATIONS = {
    en: {
        // Title screen
        title: 'Pivotto',
        subtitle: 'Learn Through Love ~ 恋を通じて学ぶ',
        startButton: 'Start',
        privacyNotice: 'Your privacy matters: Your PDF is processed locally. Only the text is sent to the AI API you configure. We don\'t store any data.',
        
        // Settings screen
        settingsTitle: '⚙️ Settings',
        providerLabel: 'AI Provider',
        providerGemini: 'Google Gemini (Free)',
        providerDeepseek: 'DeepSeek (Very cheap)',
        apiKeyLabel: 'API Key',
        apiKeyPlaceholder: 'Enter your API key',
        apiHelpGemini: 'Get your free key at <a href="https://aistudio.google.com/app/apikey" target="_blank">Google AI Studio</a>',
        apiHelpDeepseek: 'Get your key at <a href="https://platform.deepseek.com/api_keys" target="_blank">DeepSeek Platform</a>',
        saveKeyLabel: 'Save API key in this browser',
        backButton: 'Back',
        continueButton: 'Continue',
        
        // Upload screen
        uploadTitle: '📄 Upload Your Paper',
        uploadInstruction: 'Drag a PDF or click to select',
        uploadZoneText: 'Academic paper PDF',
        
        // Character selection
        characterTitle: '💕 Choose Your Study Partner',
        characterSubtitle: 'Who do you want to learn with today?',
        startGameButton: 'Start!',
        
        // Game screen
        continueHint: '▼ Click to continue',
        
        // Ending screen
        endingGood: '💕 Good Ending',
        endingNeutral: '🤝 Neutral Ending',
        endingBad: '💔 Bad Ending',
        correctAnswers: 'Correct answers',
        comprehension: 'Comprehension',
        newPaperButton: 'New Paper',
        anotherRouteButton: 'Another Route',
        
        // Loading
        loadingProcessing: 'Processing...',
        loadingExtractingPdf: 'Extracting text from PDF...',
        loadingGeneratingStory: 'Generating story with AI...\nThis may take 30-60 seconds',
        
        // Errors
        errorApiKey: 'Please enter your API key',
        errorPdfProcess: 'Error processing PDF: ',
        errorGenerateStory: 'Error generating story: ',
        
        // Language selector
        languageLabel: 'Language'
    },
    
    es: {
        // Title screen
        title: 'Pivotto',
        subtitle: 'Aprende a través del amor ~ 恋を通じて学ぶ',
        startButton: 'Comenzar',
        privacyNotice: 'Tu privacidad importa: Tu PDF se procesa localmente. Solo el texto se envía a la API de IA que configures. No guardamos ningún dato.',
        
        // Settings screen
        settingsTitle: '⚙️ Configuración',
        providerLabel: 'Proveedor de IA',
        providerGemini: 'Google Gemini (Gratis)',
        providerDeepseek: 'DeepSeek (Muy barato)',
        apiKeyLabel: 'API Key',
        apiKeyPlaceholder: 'Ingresa tu API key',
        apiHelpGemini: 'Obtén tu key gratis en <a href="https://aistudio.google.com/app/apikey" target="_blank">Google AI Studio</a>',
        apiHelpDeepseek: 'Obtén tu key en <a href="https://platform.deepseek.com/api_keys" target="_blank">DeepSeek Platform</a>',
        saveKeyLabel: 'Guardar API key en este navegador',
        backButton: 'Volver',
        continueButton: 'Continuar',
        
        // Upload screen
        uploadTitle: '📄 Sube tu Paper',
        uploadInstruction: 'Arrastra un PDF o haz clic para seleccionar',
        uploadZoneText: 'PDF de paper académico',
        
        // Character selection
        characterTitle: '💕 Elige tu compañero de estudio',
        characterSubtitle: '¿Con quién quieres aprender hoy?',
        startGameButton: '¡Comenzar!',
        
        // Game screen
        continueHint: '▼ Click para continuar',
        
        // Ending screen
        endingGood: '💕 Final Bueno',
        endingNeutral: '🤝 Final Neutral',
        endingBad: '💔 Final Malo',
        correctAnswers: 'Respuestas correctas',
        comprehension: 'Comprensión',
        newPaperButton: 'Nuevo Paper',
        anotherRouteButton: 'Otra Ruta',
        
        // Loading
        loadingProcessing: 'Procesando...',
        loadingExtractingPdf: 'Extrayendo texto del PDF...',
        loadingGeneratingStory: 'Generando historia con IA...\nEsto puede tomar 30-60 segundos',
        
        // Errors
        errorApiKey: 'Por favor ingresa tu API key',
        errorPdfProcess: 'Error al procesar el PDF: ',
        errorGenerateStory: 'Error al generar la historia: ',
        
        // Language selector
        languageLabel: 'Idioma'
    }
};

// Get translation helper
function t(key) {
    const lang = state.language || CONFIG.defaultLanguage;
    return TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key] || key;
}
