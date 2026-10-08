export type Puzzle = { id: number; date: string; category: string; prompt: string; items: string[]; ranking: string[]; explanation?: string };

// Fictional demo rankings, seeded locally. Replace `ranking` with an aggregated source later.
const seeds: Omit<Puzzle, "id" | "date">[] = [
  ["Fast Food", "Rank these fast-food chains by how much the crowd loves them.", ["McDonald's","Wendy's","A&W","Burger King","Five Guys"], ["Five Guys","A&W","McDonald's","Wendy's","Burger King"], "A fictional demo ranking, built for play."],
  ["Canadian Cities", "Which Canadian cities would people most want to spend a weekend in?", ["Toronto","Vancouver","Montreal","Calgary","Halifax"], ["Montreal","Vancouver","Toronto","Halifax","Calgary"]],
  ["Toronto Neighbourhoods", "Rank these Toronto neighbourhoods by weekend vibes.", ["Kensington Market","The Beaches","Queen West","Yorkville","Distillery District"], ["Kensington Market","Queen West","The Beaches","Distillery District","Yorkville"]],
  ["Salty Snacks", "Which snacks disappear fastest at a movie night?", ["Popcorn","Doritos","Pretzels","Potato chips","Nachos"], ["Potato chips","Popcorn","Nachos","Doritos","Pretzels"]],
  ["Video Games", "Rank these games by all-time couch co-op energy.", ["Mario Kart 8","Overcooked 2","Minecraft","Super Smash Bros. Ultimate","It Takes Two"], ["Mario Kart 8","Super Smash Bros. Ultimate","Overcooked 2","Minecraft","It Takes Two"]],
  ["Movies", "Which movie would the crowd rewatch tonight?", ["Shrek","The Princess Bride","Spider-Man: Into the Spider-Verse","Jurassic Park","The Mummy"], ["Shrek","Jurassic Park","Spider-Man: Into the Spider-Verse","The Princess Bride","The Mummy"]],
  ["TV Shows", "Rank these shows for a ‘just one more episode’ binge.", ["The Office","Stranger Things","Schitt's Creek","Breaking Bad","The Great British Bake Off"], ["The Office","Schitt's Creek","Stranger Things","The Great British Bake Off","Breaking Bad"]],
  ["Animals", "Which animals would make the best very impractical roommates?", ["Raccoon","Capybara","Penguin","Goat","Otter"], ["Capybara","Otter","Raccoon","Penguin","Goat"]],
  ["Dog Breeds", "Rank these dogs by their imaginary sitcom sidekick potential.", ["Golden Retriever","Dachshund","Shiba Inu","Bernese Mountain Dog","Corgi"], ["Corgi","Golden Retriever","Dachshund","Shiba Inu","Bernese Mountain Dog"]],
  ["Vacation Spots", "Where would the crowd pick for a no-plans getaway?", ["Lisbon","Tokyo","Banff","New York City","New Orleans"], ["Tokyo","Lisbon","New Orleans","Banff","New York City"]],
  ["Countries", "Rank these countries for a food-focused trip.", ["Italy","Japan","Mexico","Thailand","France"], ["Japan","Italy","Mexico","Thailand","France"]],
  ["Fictional Characters", "Who would you most want on your trivia team?", ["Hermione Granger","Leslie Knope","Sherlock Holmes","Lisa Simpson","Chandler Bing"], ["Hermione Granger","Leslie Knope","Lisa Simpson","Sherlock Holmes","Chandler Bing"]],
  ["Board Games", "Which game wins game night most often?", ["Catan","Codenames","Ticket to Ride","Wingspan","Clue"], ["Codenames","Catan","Ticket to Ride","Clue","Wingspan"]],
  ["Sports", "Rank these sports by how fun they are to watch live.", ["Hockey","Basketball","Soccer","Baseball","Tennis"], ["Hockey","Basketball","Baseball","Soccer","Tennis"]],
  ["Household Products", "Which household item quietly deserves a design award?", ["Electric kettle","Robot vacuum","Cast-iron pan","Air fryer","Weighted blanket"], ["Electric kettle","Weighted blanket","Air fryer","Cast-iron pan","Robot vacuum"]],
  ["Landmarks", "Which landmark belongs on the most dream-trip lists?", ["Eiffel Tower","Machu Picchu","Great Wall of China","Taj Mahal","Colosseum"], ["Eiffel Tower","Machu Picchu","Colosseum","Great Wall of China","Taj Mahal"]],
  ["Breakfast Foods", "Build the crowd's ideal lazy Sunday breakfast order.", ["Pancakes","Avocado toast","Waffles","Breakfast sandwich","French toast"], ["French toast","Breakfast sandwich","Waffles","Pancakes","Avocado toast"]],
  ["Desserts", "Which dessert gets the last bite?", ["Cheesecake","Brownie","Apple pie","Tiramisu","Ice cream"], ["Ice cream","Brownie","Cheesecake","Tiramisu","Apple pie"]],
  ["Game Consoles", "Rank these consoles by nostalgia power.", ["Nintendo 64","PlayStation 2","Game Boy Advance","Xbox 360","Super Nintendo"], ["PlayStation 2","Nintendo 64","Super Nintendo","Game Boy Advance","Xbox 360"]],
  ["Programming Languages", "Which language would people choose for a fun side project?", ["Python","JavaScript","Rust","Go","Ruby"], ["Python","JavaScript","Ruby","Rust","Go"]],
  ["Pizza Toppings", "Rank these toppings by crowd-pleasing power.", ["Pepperoni","Mushrooms","Pineapple","Olives","Hot honey"], ["Pepperoni","Hot honey","Mushrooms","Pineapple","Olives"]],
  ["Coffee Orders", "What order has the strongest café regular energy?", ["Latte","Flat white","Cold brew","Cappuccino","Americano"], ["Latte","Cold brew","Cappuccino","Flat white","Americano"]],
  ["Superheroes", "Who would the crowd most want to see lead a movie?", ["Spider-Man","Wonder Woman","Black Panther","Batman","Ms. Marvel"], ["Spider-Man","Batman","Black Panther","Wonder Woman","Ms. Marvel"]],
  ["Boardwalk Treats", "Rank these treats for a perfect summer afternoon.", ["Funnel cake","Ice cream cone","Corn dog","Cotton candy","Fresh lemonade"], ["Ice cream cone","Fresh lemonade","Funnel cake","Corn dog","Cotton candy"]],
  ["Musical Instruments", "Which instrument brings the most main-character energy?", ["Drums","Saxophone","Electric guitar","Piano","Violin"], ["Electric guitar","Drums","Piano","Saxophone","Violin"]],
  ["Weather", "Pick the crowd's favourite kind of day.", ["First warm spring day","Rainy reading day","Perfect beach day","Crisp fall day","Snow day"], ["Crisp fall day","First warm spring day","Snow day","Perfect beach day","Rainy reading day"]],
  ["Fictional Places", "Where would people book a one-week stay?", ["Hobbiton","Hogwarts","Mushroom Kingdom","Stars Hollow","Wakanda"], ["Hogwarts","Stars Hollow","Hobbiton","Wakanda","Mushroom Kingdom"]],
  ["Sandwiches", "Which sandwich belongs at the top of the lunch leaderboard?", ["BLT","Grilled cheese","Banh mi","Club sandwich","Peanut butter and jam"], ["Grilled cheese","Banh mi","BLT","Peanut butter and jam","Club sandwich"]],
  ["Pets", "Rank these pets by how much personality they bring home.", ["Cat","Dog","Parrot","Rabbit","Bearded dragon"], ["Dog","Cat","Parrot","Rabbit","Bearded dragon"]],
  ["Road Trip Stops", "Which stop makes the best road-trip memory?", ["Small-town diner","Scenic lookout","Roadside attraction","Local bakery","Big rest stop"], ["Local bakery","Scenic lookout","Small-town diner","Roadside attraction","Big rest stop"]]
].map(([category, prompt, items, ranking, explanation]) => ({ category: category as string, prompt: prompt as string, items: items as string[], ranking: ranking as string[], explanation: explanation as string | undefined }));

export const puzzles: Puzzle[] = seeds.map((p, i) => ({ ...p, id: i + 1, date: new Date(Date.UTC(2026, 9, 6 + i)).toISOString().slice(0, 10) }));

export function puzzleForDate(date: Date): Puzzle | undefined {
  const key = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().slice(0, 10);
  return puzzles.find((p) => p.date === key);
}
