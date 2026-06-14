export type ActivityType =
  | 'welcome' | 'mirror' | 'bubbles' | 'spinwheel' | 'sealedletter'
  | 'breathe' | 'question' | 'balloon' | 'fortune' | 'shootingstar'
  | 'scratch' | 'reasons' | 'giftbox' | 'flower' | 'affirmations'
  | 'hug' | 'loveletter' | 'oursong' | 'promises' | 'typewriter'
  | 'lovemeter' | 'goldenkey';

export interface DoorData {
  id: number;
  chapter: string;
  activityType: ActivityType;
  title: string;
  message: string;
  // Flexible config for specific activity types
  options?: string[];
  items?: string[];
  image?: string;
}

export const doorsData: DoorData[] = [
  // === Chapter 1: The Little Star ⭐ (1-5) ===
  {
    id: 1, chapter: "The Little Star ⭐", activityType: 'welcome',
    title: "Welcome, Chululu!",
    message: "22 years ago, the universe created something extraordinary. That was you. Get ready for 22 surprises made just for you to feel safe and cherished. 💖",
  },
  {
    id: 2, chapter: "The Little Star ⭐", activityType: 'mirror',
    title: "Look Who's Here",
    message: "The girl who tries so hard every single day. Take a deep breath, Chululu. You are doing amazing.",
  },
  {
    id: 3, chapter: "The Little Star ⭐", activityType: 'bubbles',
    title: "Pop to Reveal!",
    message: "You don't have to be perfect to be wonderful.",
    items: ["You", "don't", "have", "to", "be", "perfect", "to", "be", "wonderful", "✨"],
  },
  {
    id: 4, chapter: "The Little Star ⭐", activityType: 'spinwheel',
    title: "Spin for a Truth!",
    message: "",
    items: [
      "Your best is always enough ✨",
      "It is okay to pause and rest 🤍",
      "You don't have to figure it all out today 🌿",
      "You are stronger than your anxious thoughts 💪",
      "It's okay to let go of control sometimes 🎈",
      "You are safe right now 🕯️",
    ],
  },
  {
    id: 5, chapter: "The Little Star ⭐", activityType: 'sealedletter',
    title: "A Note From The Past",
    message: "Dear little Chululu, it's okay to rest. The world won't fall apart if you take a break. You are safe. Be gentle with yourself today. ⭐",
  },

  // === Chapter 2: The Glow Up 🌟 (6-15) ===
  {
    id: 6, chapter: "The Glow Up 🌟", activityType: 'breathe',
    title: "Breathe With Me",
    message: "Chululu, before we continue, let's take a moment together. You deserve peace. Breathe in... let go of the weight. Breathe out... you are safe here. No stress, just this moment. 🤍",
  },
  {
    id: 7, chapter: "The Glow Up 🌟", activityType: 'question',
    title: "Quick Question!",
    message: "That's perfect. No matter what you choose, I just want you to have peace, Chululu. You are the most special part of my life. 💕",
    options: ["A quiet, cozy evening 🌙", "Listening to the rain 🌧️", "A warm, comforting hug 🤗", "Watching the clouds float by ☁️"],
    items: ["What sounds the most peaceful right now?"],
  },
  {
    id: 8, chapter: "The Glow Up 🌟", activityType: 'balloon',
    title: "Pop Me!",
    message: "Imagine all your stress inside this balloon. You just popped it, and let it go. You survived 100% of your bad days, Chululu. 🎈",
  },
  {
    id: 9, chapter: "The Glow Up 🌟", activityType: 'fortune',
    title: "Your Fortune",
    message: "Everything is going to work out beautifully for you, Chululu. You don't need to carry the weight of the future today. 🥠✨",
  },
  {
    id: 10, chapter: "The Glow Up 🌟", activityType: 'shootingstar',
    title: "Make a Wish!",
    message: "Every shooting star I've ever seen, I wished for your peace of mind and happiness, Chululu. Every single one. ⭐",
  },
  {
    id: 11, chapter: "The Glow Up 🌟", activityType: 'scratch',
    title: "Scratch to Reveal!",
    message: "Under all that overthinking is a beautiful, kind mind that deserves a break. Be gentle with yourself today, Chululu. ✨",
  },
  {
    id: 12, chapter: "The Glow Up 🌟", activityType: 'reasons',
    title: "Why You're So Special",
    message: "",
    items: ["You care so deeply 💛", "You try your best every day 💪", "Your smile brings warmth ✨", "You have a beautiful soul 🌸", "You are perfectly imperfect 💖", "Everything about you 🥰"],
  },
  {
    id: 13, chapter: "The Glow Up 🌟", activityType: 'giftbox',
    title: "A Special Gift",
    message: "The thing about you, Chululu, is that you care so deeply about everyone around you. But today, it's time to care for yourself. You deserve it. 💝",
  },
  {
    id: 14, chapter: "The Glow Up 🌟", activityType: 'flower',
    title: "Watch It Bloom",
    message: "Flowers don't force themselves to bloom before they're ready. Take your time, Chululu. There is no rush in life. 🌸",
  },
  {
    id: 15, chapter: "The Glow Up 🌟", activityType: 'affirmations',
    title: "Swipe Through These",
    message: "",
    items: [
      "You don't have to figure it all out today 🌿",
      "Your best is always enough 🤍",
      "It is okay to pause and rest 🛋️",
      "Your thoughts are just thoughts, they don't control you 🦋",
      "You are safe right now, in this exact moment ✨"
    ],
  },

  // === Chapter 3: Our Story 💕 (16-21) ===
  {
    id: 16, chapter: "Our Story 💕", activityType: 'hug',
    title: "Come Here",
    message: "A long, tight hug to melt away all the overthinking and stress. I've got you, Chululu. You can let your guard down here. 🤗",
  },
  {
    id: 17, chapter: "Our Story 💕", activityType: 'loveletter',
    title: "A Special Note",
    message: "Chululu, meeting you was like finding a missing piece I didn't even know was gone. Your presence brings so much warmth and meaning into my life. 💌",
  },
  {
    id: 18, chapter: "Our Story 💕", activityType: 'oursong',
    title: "This Reminds Me of Us",
    message: "Every soothing melody I hear, I think of you. I want to be the calm music that plays in the background of your busy mind, Chululu. 🎵",
  },
  {
    id: 19, chapter: "Our Story 💕", activityType: 'promises',
    title: "My Promises to You",
    message: "",
    items: [
      "I promise to be your calm when your mind is too loud 🌿",
      "I promise to hold your hand when you're overwhelmed 🤝",
      "I promise to always remind you to breathe 🤍"
    ],
  },
  {
    id: 20, chapter: "Our Story 💕", activityType: 'typewriter',
    title: "Read This Slowly",
    message: "I know your mind runs a mile a minute sometimes. But I want you to know that to me, you are a place of peace. You don't have to carry the weight of the world alone, Chululu. 💕",
  },
  {
    id: 21, chapter: "Our Story 💕", activityType: 'lovemeter',
    title: "Let's Measure This",
    message: "ERROR: Chululu's importance exceeds all known measurements. System overloaded. 💥✨",
  },

  // === Chapter 4: The Present 🎂 (22) ===
  {
    id: 22, chapter: "The Present 🎂", activityType: 'goldenkey',
    title: "The Final Gift",
    message: "You made it through 21 gifts, Chululu. But the biggest one is still waiting. Take this key, let go of all your worries, and unlock your birthday surprise... 🔑✨",
  },
];
