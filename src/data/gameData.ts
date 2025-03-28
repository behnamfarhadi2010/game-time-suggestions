
export interface Game {
  id: string;
  title: string;
  description: string;
  minAge: number;
  maxAge: number;
  timeRequired: number; // in minutes
  videoId: string;
  tags: string[];
}

export const games: Game[] = [
  {
    id: "1",
    title: "Hide and Seek",
    description: "A classic game where one person counts while others hide, then tries to find them.",
    minAge: 2,
    maxAge: 10,
    timeRequired: 10,
    videoId: "MGKcmXAkXhQ",
    tags: ["indoor", "outdoor", "active"]
  },
  {
    id: "2",
    title: "Simon Says",
    description: "Follow the leader's instructions, but only when they start with 'Simon says'.",
    minAge: 3,
    maxAge: 8,
    timeRequired: 10,
    videoId: "lob3mrCjkCQ",
    tags: ["indoor", "learning", "group"]
  },
  {
    id: "3",
    title: "I Spy",
    description: "One player spots something and gives a clue, others try to guess what it is.",
    minAge: 3,
    maxAge: 7,
    timeRequired: 5,
    videoId: "gRW5qeWLwfY",
    tags: ["indoor", "outdoor", "quiet", "travel"]
  },
  {
    id: "4",
    title: "Musical Chairs",
    description: "Players walk around chairs while music plays, trying to sit when music stops.",
    minAge: 4,
    maxAge: 10,
    timeRequired: 15,
    videoId: "pDGTNBsovgw",
    tags: ["indoor", "active", "group", "party"]
  },
  {
    id: "5",
    title: "Freeze Dance",
    description: "Dance while the music plays, freeze when it stops!",
    minAge: 2,
    maxAge: 8,
    timeRequired: 10,
    videoId: "2UcZWXvgMZE",
    tags: ["indoor", "active", "music"]
  },
  {
    id: "6",
    title: "Balloon Keep Up",
    description: "Keep a balloon from touching the ground as long as possible.",
    minAge: 2,
    maxAge: 6,
    timeRequired: 5,
    videoId: "MjCEHbp0EZ0",
    tags: ["indoor", "active", "simple"]
  },
  {
    id: "7",
    title: "Red Light, Green Light",
    description: "Move on green light, freeze on red light. Don't get caught moving!",
    minAge: 4,
    maxAge: 10,
    timeRequired: 15,
    videoId: "iDlrN-OsI4Q",
    tags: ["indoor", "outdoor", "active", "group"]
  },
  {
    id: "8",
    title: "Scavenger Hunt",
    description: "Find items on a list within a time limit.",
    minAge: 4,
    maxAge: 12,
    timeRequired: 20,
    videoId: "6PKMZS-hWJM",
    tags: ["indoor", "outdoor", "thinking", "active"]
  },
  {
    id: "9",
    title: "Paper Airplane Race",
    description: "Fold paper airplanes and see whose flies the farthest.",
    minAge: 5,
    maxAge: 12,
    timeRequired: 15,
    videoId: "7KPaxKUDj6I",
    tags: ["indoor", "creative", "science"]
  },
  {
    id: "10",
    title: "Hopscotch",
    description: "Draw numbered squares, toss a marker, hop through without stepping on marker's square.",
    minAge: 4,
    maxAge: 10,
    timeRequired: 15,
    videoId: "9PA3RsVVdh8",
    tags: ["outdoor", "active", "classic"]
  },
  {
    id: "11",
    title: "Finger Painting",
    description: "Create art using fingers and washable paint.",
    minAge: 1,
    maxAge: 5,
    timeRequired: 20,
    videoId: "r2S5Fcc6-2o",
    tags: ["indoor", "creative", "art", "messy"]
  },
  {
    id: "12",
    title: "Duck, Duck, Goose",
    description: "Sit in a circle, one player taps heads saying 'duck' until saying 'goose', then runs.",
    minAge: 3,
    maxAge: 8,
    timeRequired: 10,
    videoId: "xvRARkOcI6c",
    tags: ["indoor", "outdoor", "active", "group"]
  }
];

export const findGames = (age: number, availableTime: number, category?: string, featuredId?: string): Game[] => {
  // If a specific featured game is requested, find and return just that game
  if (featuredId) {
    const featuredGame = games.find(game => game.id === featuredId);
    return featuredGame ? [featuredGame] : [];
  }
  
  // Filter games based on age and time
  let filteredGames = games.filter(
    game => 
      age >= game.minAge && 
      age <= game.maxAge && 
      game.timeRequired <= availableTime
  );
  
  // Additional filtering by category if provided
  if (category && category !== 'all') {
    const categoryMap: Record<string, string[]> = {
      'indoor': ['indoor'],
      'outdoor': ['outdoor'],
      'active': ['active'],
      'quiet': ['quiet'],
      'learning': ['learning'],
      'creative': ['creative', 'art'],
      'group': ['group', 'party']
    };
    
    const relevantTags = categoryMap[category] || [];
    if (relevantTags.length > 0) {
      filteredGames = filteredGames.filter(game => 
        game.tags.some(tag => relevantTags.includes(tag))
      );
    }
  }
  
  return filteredGames;
};
