// ============================================
// API SERVICE
// ============================================

const ApiService = {
    
    // Call our backend API (which securely calls DeepSeek)
    async call(prompt) {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'API Error');
        }
        
        const data = await response.json();
        return data.content;
    },
    
    buildPrompt(character, pdfText, language) {
        const personality = getCharacterText(character, 'personality');
        const context = getCharacterText(character, 'context');
        
        const langInstruction = language === 'es' 
            ? 'IMPORTANTE: Genera todo el contenido en ESPAÑOL.'
            : 'IMPORTANT: Generate all content in ENGLISH.';
        
        return `${personality}

STORY CONTEXT:
${context}

ACADEMIC PAPER TO EXPLAIN:
${pdfText.substring(0, CONFIG.game.maxPdfLength)}

---

${langInstruction}

Your task is to create an educational visual novel/dating sim experience. You must:

1. Explain the paper content in an accessible way
2. Maintain your personality throughout the interaction
3. Include subtle personal/romantic connection moments
4. Include exactly ${CONFIG.game.questionsPerGame} comprehension questions interspersed

RESPONSE FORMAT (strict JSON):
{
  "title": "Short paper title",
  "dialogues": [
    {
      "type": "dialogue",
      "speaker": "${character.name}",
      "text": "Dialogue text",
      "expression": "normal|happy|angry|blush|surprised|thinking"
    },
    {
      "type": "question",
      "speaker": "${character.name}",
      "question": "Question about the content?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": 0,
      "reaction_correct": "Reaction if correct (in character)",
      "reaction_incorrect": "Reaction if incorrect (in character)",
      "expression_correct": "happy",
      "expression_incorrect": "angry"
    }
  ],
  "endings": {
    "good": "Good ending message (6-8 correct). Romantic/warm.",
    "neutral": "Neutral ending message (4-5 correct). Friendly but distant.",
    "bad": "Bad ending message (0-3 correct). Disappointed but gives hope."
  }
}

IMPORTANT:
- The story should flow naturally, alternating explanation with character moments
- Questions should be distributed throughout the explanation
- Include 20-35 dialogues total (including the ${CONFIG.game.questionsPerGame} questions)
- Keep your personality consistent
- Romantic content should be subtle and appropriate
- Respond ONLY with the JSON, no additional text`;
    },
    
    parseResponse(responseText) {
        // Clean the response - remove markdown code blocks if present
        let cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        // Try to find JSON object in the response
        const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            cleaned = jsonMatch[0];
        }
        
        return JSON.parse(cleaned);
    }
};
