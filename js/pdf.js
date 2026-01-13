// ============================================
// PDF SERVICE
// ============================================

const PdfService = {
    
    async process(file) {
        UI.showLoading(t('loadingExtractingPdf'));
        
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            
            let fullText = '';
            
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + '\n\n';
            }
            
            state.pdfText = fullText.trim();
            state.pdfName = file.name;
            
            document.getElementById('fileName').textContent = `✓ ${file.name} (${Math.round(fullText.length / 1000)}k chars)`;
            document.getElementById('fileInfo').classList.add('visible');
            document.getElementById('uploadContinueBtn').disabled = false;
            
            UI.hideLoading();
        } catch (error) {
            UI.hideLoading();
            alert(t('errorPdfProcess') + error.message);
            console.error(error);
        }
    },
    
    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            this.process(file);
        }
    }
};
