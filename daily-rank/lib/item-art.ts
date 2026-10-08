// Local, deterministic thumbnail art for seeded items. Emoji render as illustrations
// without a remote image request, account, or image service.
const art: Record<string, string> = {
  "McDonald's":"🍔","Wendy's":"🍟","A&W":"🥤","Burger King":"👑","Five Guys":"🍔",
  Toronto:"🏙️",Vancouver:"🌊",Montreal:"🎨",Calgary:"🤠",Halifax:"⚓",Victoria:"🏛️",Winnipeg:"🌾",
  "Kensington Market":"🛍️","The Beaches":"🏖️","Queen West":"🎭",Yorkville:"💎","Distillery District":"🧱",
  Popcorn:"🍿",Doritos:"🔺",Pretzels:"🥨","Potato chips":"🥔",Nachos:"🧀",
  "Mario Kart 8":"🏎️","Overcooked 2":"🍳",Minecraft:"⛏️","Super Smash Bros. Ultimate":"🥊","It Takes Two":"🧸",
  Shrek:"🧅","The Princess Bride":"⚔️","Spider-Man: Into the Spider-Verse":"🕸️","Jurassic Park":"🦖","The Mummy":"🏺",
  "The Office":"📎","Stranger Things":"🚲","Schitt's Creek":"🌹","Breaking Bad":"🧪","The Great British Bake Off":"🧁",
  Raccoon:"🦝",Capybara:"🦫",Penguin:"🐧",Goat:"🐐",Otter:"🦦",
  "Golden Retriever":"🐕","Dachshund":"🐶","Shiba Inu":"🐕","Bernese Mountain Dog":"🐻",Corgi:"🐕",
  Lisbon:"🚋",Tokyo:"🗼",Banff:"🏔️","New York City":"🗽","New Orleans":"🎺",
  Italy:"🍝",Japan:"🍣",Mexico:"🌮",Thailand:"🍜",France:"🥐",
  "Hermione Granger":"📚","Leslie Knope":"🧇","Sherlock Holmes":"🔎","Lisa Simpson":"🎷","Chandler Bing":"☕",
  Catan:"🌾",Codenames:"🕵️","Ticket to Ride":"🚂",Wingspan:"🐦",Clue:"🕯️",
  Hockey:"🏒",Basketball:"🏀",Soccer:"⚽",Baseball:"⚾",Tennis:"🎾",
  "Electric kettle":"🫖","Robot vacuum":"🤖","Cast-iron pan":"🍳","Air fryer":"🍗","Weighted blanket":"🛌",
  "Eiffel Tower":"🗼","Machu Picchu":"⛰️","Great Wall of China":"🏯","Taj Mahal":"🕌",Colosseum:"🏛️",
  Pancakes:"🥞","Avocado toast":"🥑",Waffles:"🧇","Breakfast sandwich":"🥪","French toast":"🍞",
  Cheesecake:"🍰",Brownie:"🍫","Apple pie":"🥧",Tiramisu:"☕","Ice cream":"🍨",
  "Nintendo 64":"🎮","PlayStation 2":"🕹️","Game Boy Advance":"🟩","Xbox 360":"🎮","Super Nintendo":"🎮",
  Python:"🐍",JavaScript:"🟨",Rust:"🦀",Go:"🦫",Ruby:"💎",
  Pepperoni:"🍕",Mushrooms:"🍄",Pineapple:"🍍",Olives:"🫒","Hot honey":"🍯",
  Latte:"☕","Flat white":"☕","Cold brew":"🧊",Cappuccino:"☕",Americano:"☕",
  "Spider-Man":"🕸️","Wonder Woman":"⭐","Black Panther":"🐈‍⬛",Batman:"🦇","Ms. Marvel":"✨",
  "Funnel cake":"🍩","Ice cream cone":"🍦","Corn dog":"🌭","Cotton candy":"🍭","Fresh lemonade":"🍋",
  Drums:"🥁",Saxophone:"🎷","Electric guitar":"🎸",Piano:"🎹",Violin:"🎻",
  "First warm spring day":"🌷","Rainy reading day":"📖","Perfect beach day":"☀️","Crisp fall day":"🍂","Snow day":"❄️",
  Hobbiton:"🧙","Hogwarts":"🪄","Mushroom Kingdom":"🍄","Stars Hollow":"⭐",Wakanda:"🐾",
  BLT:"🥓","Grilled cheese":"🧀","Banh mi":"🥖","Club sandwich":"🥪","Peanut butter and jam":"🥜",
  Cat:"🐈",Dog:"🐕",Parrot:"🦜",Rabbit:"🐇","Bearded dragon":"🦎",
  "Small-town diner":"🍽️","Scenic lookout":"🌄","Roadside attraction":"🦕","Local bakery":"🥐","Big rest stop":"🚗"
};

export function itemEmoji(item: string): string { return art[item] ?? "✦"; }

export function itemImageUrl(item: string): string {
  const stableLock = [...item].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7) || 1;
  return `https://loremflickr.com/112/112/${encodeURIComponent(item)}?lock=${stableLock}`;
}
