// ============================================
// UI MANAGEMENT
// ============================================

const UI = {
    
    // Show a screen
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
        
        // Screen-specific initialization
        if (screenId === 'characterScreen') {
            this.renderCharacterGrid();
        }
    },
    
    // Show loading overlay
    showLoading(text) {
        document.getElementById('loadingText').textContent = text || t('loadingProcessing');
        document.getElementById('loadingOverlay').classList.add('active');
    },
    
    // Hide loading overlay
    hideLoading() {
        document.getElementById('loadingOverlay').classList.remove('active');
    },
    
    // Update API help text based on provider
    updateApiHelp() {
        const provider = document.getElementById('apiProvider').value;
        const helpText = document.getElementById('apiHelp');
        
        if (provider === 'gemini') {
            helpText.innerHTML = t('apiHelpGemini');
        } else {
            helpText.innerHTML = t('apiHelpDeepseek');
        }
    },
    
    // Save settings and continue
    saveSettings() {
        state.apiProvider = document.getElementById('apiProvider').value;
        state.apiKey = document.getElementById('apiKey').value;
        
        if (!state.apiKey) {
            alert(t('errorApiKey'));
            return;
        }
        
        if (document.getElementById('saveKey').checked) {
            localStorage.setItem('paperRomance_apiKey', state.apiKey);
            localStorage.setItem('paperRomance_apiProvider', state.apiProvider);
        }
        
        this.showScreen('uploadScreen');
    },
    
    // Render character selection grid
    renderCharacterGrid() {
        const grid = document.getElementById('characterGrid');
        grid.innerHTML = CHARACTERS.map(char => {
            const type = getCharacterText(char, 'type');
            const desc = getCharacterText(char, 'desc');
            
            return `
                <div class="character-card" data-id="${char.id}" onclick="UI.selectCharacter('${char.id}')" style="--char-color: ${char.color}">
                    <div class="character-avatar" id="avatar-${char.id}" style="background: linear-gradient(135deg, ${char.color}33, ${char.color}11)">
                        ${char.fallbackEmoji}
                    </div>
                    <div class="character-name">${char.name}</div>
                    <div class="character-type">${type}</div>
                    <div class="character-desc">${desc}</div>
                </div>
            `;
        }).join('');
        
        // Try to load avatar images
        CHARACTERS.forEach(char => {
            const avatarContainer = document.getElementById(`avatar-${char.id}`);
            const img = new Image();
            img.onload = () => {
                avatarContainer.innerHTML = `<img src="${char.avatar}" alt="${char.name}" class="avatar-image">`;
            };
            img.src = char.avatar;
        });
    },
    
    // Select a character
    selectCharacter(id) {
        state.selectedCharacter = CHARACTERS.find(c => c.id === id);
        
        document.querySelectorAll('.character-card').forEach(card => {
            card.classList.toggle('selected', card.dataset.id === id);
        });
        
        document.getElementById('startGameBtn').disabled = false;
    },
    
    // Change language
    changeLanguage(lang) {
        state.language = lang;
        localStorage.setItem('paperRomance_language', lang);
        this.updateAllText();
    },
    
    // Update all UI text based on current language
    updateAllText() {
        // Title screen
        document.getElementById('titleLogo').textContent = t('title');
        document.getElementById('titleSubtitle').textContent = t('subtitle');
        document.getElementById('startBtn').textContent = t('startButton');
        document.getElementById('privacyNotice').innerHTML = '🔒 <strong>' + t('privacyNotice').split(':')[0] + ':</strong>' + t('privacyNotice').split(':').slice(1).join(':');
        
        // Settings screen
        document.getElementById('settingsTitle').textContent = t('settingsTitle');
        document.getElementById('providerLabel').textContent = t('providerLabel');
        document.getElementById('providerGemini').textContent = t('providerGemini');
        document.getElementById('providerDeepseek').textContent = t('providerDeepseek');
        document.getElementById('apiKeyLabel').textContent = t('apiKeyLabel');
        document.getElementById('apiKey').placeholder = t('apiKeyPlaceholder');
        document.getElementById('saveKeyLabel').textContent = t('saveKeyLabel');
        document.getElementById('settingsBackBtn').textContent = t('backButton');
        document.getElementById('settingsContinueBtn').textContent = t('continueButton');
        document.getElementById('languageLabel').textContent = t('languageLabel');
        this.updateApiHelp();
        
        // Upload screen
        document.getElementById('uploadTitle').textContent = t('uploadTitle');
        document.getElementById('uploadInstruction').textContent = t('uploadInstruction');
        document.getElementById('uploadZoneText').textContent = t('uploadZoneText');
        document.getElementById('uploadBackBtn').textContent = t('backButton');
        document.getElementById('uploadContinueBtn').textContent = t('continueButton');
        
        // Character screen
        document.getElementById('characterTitle').textContent = t('characterTitle');
        document.getElementById('characterSubtitle').textContent = t('characterSubtitle');
        document.getElementById('characterBackBtn').textContent = t('backButton');
        document.getElementById('startGameBtn').textContent = t('startGameButton');
        
        // Re-render character grid with new language
        if (document.getElementById('characterScreen').classList.contains('active')) {
            this.renderCharacterGrid();
        }
    },
    
    // Initialize UI
    init() {
        // Load saved settings
        const savedKey = localStorage.getItem('paperRomance_apiKey');
        const savedProvider = localStorage.getItem('paperRomance_apiProvider');
        const savedLanguage = localStorage.getItem('paperRomance_language');
        
        if (savedKey) {
            document.getElementById('apiKey').value = savedKey;
            document.getElementById('saveKey').checked = true;
        }
        if (savedProvider) {
            document.getElementById('apiProvider').value = savedProvider;
        }
        if (savedLanguage) {
            state.language = savedLanguage;
            document.getElementById('languageSelect').value = savedLanguage;
        } else {
            state.language = CONFIG.defaultLanguage;
        }
        
        // Update all text
        this.updateAllText();
        this.updateApiHelp();
        
        // Set up PDF.js worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        
        // Set up drag and drop
        this.setupDragAndDrop();
    },
    
    // Set up drag and drop for PDF upload
    setupDragAndDrop() {
        const uploadZone = document.getElementById('uploadZone');
        
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('dragover');
        });
        
        uploadZone.addEventListener('dragleave', () => {
            uploadZone.classList.remove('dragover');
        });
        
        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type === 'application/pdf') {
                PdfService.process(file);
            }
        });
    }
};
