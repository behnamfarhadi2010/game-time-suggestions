
import { Game } from '../data/gameData';

// Helper function to get API key from local storage
export const getGeminiApiKey = (): string | null => {
  return localStorage.getItem('geminiApiKey');
};

// Helper function to save API key to local storage
export const saveGeminiApiKey = (apiKey: string): void => {
  localStorage.setItem('geminiApiKey', apiKey);
};

// Helper function to remove API key from local storage
export const removeGeminiApiKey = (): void => {
  localStorage.removeItem('geminiApiKey');
};

// Function to enhance game suggestions using Gemini API
export const enhanceGameSuggestions = async (
  games: Game[],
  age: number,
  time: number
): Promise<Game[]> => {
  const apiKey = getGeminiApiKey();
  
  if (!apiKey) {
    console.log("No Gemini API key found");
    return games; // Return original games if no API key
  }

  try {
    // Add randomness factor and additional context for diverse recommendations
    const randomSeed = Math.floor(Math.random() * 1000);
    const randomScenario = getRandomScenario();

    // Prepare data for the Gemini API with more dynamic prompting
    const prompt = `
      I have a ${age} year old child and ${time} minutes to play.
      ${randomScenario}
      I have these game options: ${games.map(g => g.title).join(', ')}.
      
      Please rank these games from best to worst for my specific situation and explain why.
      Consider different factors like educational value, fun factor, and engagement level.
      Use random seed ${randomSeed} to ensure diversity in your recommendations.
      
      Return ONLY a JSON array with game titles in order from best to worst.
      Format: ["Game1", "Game2", "Game3"]
    `;

    // Updated API endpoint to use the correct version
    const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
          topK: 40,
          topP: 0.95
        }
      })
    });

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      console.error("Invalid response from Gemini API:", data);
      return games;
    }
    
    // Extract the ranked list from the response
    const text = data.candidates[0].content.parts[0].text;
    let rankedTitles: string[] = [];
    
    try {
      // Extract JSON array from text (it might be surrounded by other text)
      const match = text.match(/\[.*?\]/s);
      if (match) {
        rankedTitles = JSON.parse(match[0]);
      } else {
        throw new Error("No JSON array found in response");
      }
    } catch (err) {
      console.error("Failed to parse Gemini response:", err);
      return games;
    }
    
    // Reorder games based on AI ranking
    const gameMap = new Map(games.map(game => [game.title, game]));
    const aiSortedGames: Game[] = [];
    
    // Add games in the order suggested by AI
    for (const title of rankedTitles) {
      const game = gameMap.get(title);
      if (game) {
        aiSortedGames.push(game);
        gameMap.delete(title);
      }
    }
    
    // Add any remaining games that weren't in the AI response
    gameMap.forEach(game => {
      aiSortedGames.push(game);
    });
    
    return aiSortedGames;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return games;
  }
};

// Helper function to get a random scenario to add variety to the AI prompt
const getRandomScenario = (): string => {
  const scenarios = [
    "We're at home and need a quiet activity.",
    "We're feeling energetic today and need something active.",
    "We want a game that helps with learning.",
    "We're looking for something creative.",
    "It's a rainy day and we need an indoor activity.",
    "We want a game that involves the whole family.",
    "We're tired and need something calm and relaxing.",
    "We want to practice problem-solving skills.",
    "We need a game that requires minimal setup.",
    "We want a game that helps with physical coordination."
  ];
  
  return scenarios[Math.floor(Math.random() * scenarios.length)];
};
