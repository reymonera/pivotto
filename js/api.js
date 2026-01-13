// ============================================
// API SERVICE
// ============================================

const ApiService = {
    
    async callGemini(prompt, apiKey) {
        const response = await fetch(`${CONFIG.api.gemini.baseUrl}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.8,
                    topP: 0.95,
                    maxOutputTokens: 8192,
                }
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Gemini API Error');
        }
        
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    },
    
    async callDeepSeek(prompt, apiKey) {
        const response = await fetch(CONFIG.api.deepseek.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'user', content: prompt }
                ],
                temperature: 0.8,
                max_tokens: 8192
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'DeepSeek API Error');
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    },
    
    async call(prompt) {
        if (state.apiProvider === 'gemini') {
            return this.callGemini(prompt, state.apiKey);
        } else {
            return this.callDeepSeek(prompt, state.apiKey);
        }
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
    "good": "Good ending message (3-4 correct). Romantic/warm.",
    "neutral": "Neutral ending message (2 correct). Friendly but distant.",
    "bad": "Bad ending message (0-1 correct). Disappointed but gives hope."
  }
}

IMPORTANT:
- The story should flow naturally, alternating explanation with character moments
- Questions should be distributed throughout the explanation
- Include 15-25 dialogues total (including the ${CONFIG.game.questionsPerGame} questions)
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
