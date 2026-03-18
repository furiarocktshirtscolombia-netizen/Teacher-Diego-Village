export type QuestionType = 'multiple-choice' | 'fill-blank' | 'true-false';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  image?: string;
  options?: string[];
  correctAnswer: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
}

export interface Level {
  id: number;
  title: string;
  theme: string;
  description: string;
  introDialog: string[];
  questions: Question[];
  reward: {
    name: string;
    icon: string;
    points: number;
  };
  backgroundUrl: string;
}

export const levels: Level[] = [
  {
    id: 1,
    title: "The Small House",
    theme: "House Objects",
    description: "Explore the house and find the objects.",
    introDialog: [
      "Welcome, brave student! Let's explore the village together.",
      "This is The Small House. Look carefully at the objects inside.",
      "Remember: use 'there is' for one object, and 'there are' for two or more objects."
    ],
    backgroundUrl: "https://picsum.photos/seed/rpg-house/800/600?blur=2",
    questions: [
      {
        id: "q1-1",
        type: "multiple-choice",
        text: "Look at the living room. ___ a table.",
        options: ["There is", "There are"],
        correctAnswer: "There is",
        feedbackCorrect: "Excellent! 'There is' is for one table.",
        feedbackIncorrect: "Remember: use 'there is' for one object."
      },
      {
        id: "q1-2",
        type: "multiple-choice",
        text: "___ two chairs in the kitchen.",
        options: ["There is", "There are"],
        correctAnswer: "There are",
        feedbackCorrect: "Great job! 'There are' is for plural nouns.",
        feedbackIncorrect: "Great try! Use 'there are' for plural nouns."
      },
      {
        id: "q1-3",
        type: "fill-blank",
        text: "___ a lamp in the bedroom.",
        correctAnswer: "There is",
        feedbackCorrect: "Perfect! One lamp = There is.",
        feedbackIncorrect: "Think about how many lamps. Just one!"
      }
    ],
    reward: {
      name: "Wooden Key",
      icon: "🔑",
      points: 50
    }
  },
  {
    id: 2,
    title: "The Magic Classroom",
    theme: "School Items",
    description: "Find the magical school supplies.",
    introDialog: [
      "Welcome to the Magic Classroom!",
      "Here we learn many things. What can you see?",
      "Let's practice more with 'there is' and 'there are'."
    ],
    backgroundUrl: "https://picsum.photos/seed/rpg-classroom/800/600?blur=2",
    questions: [
      {
        id: "q2-1",
        type: "multiple-choice",
        text: "___ three books on the desk.",
        options: ["There is", "There are"],
        correctAnswer: "There are",
        feedbackCorrect: "You are improving your reading!",
        feedbackIncorrect: "Remember: three books is plural."
      },
      {
        id: "q2-2",
        type: "multiple-choice",
        text: "___ a teacher in the classroom.",
        options: ["There is", "There are"],
        correctAnswer: "There is",
        feedbackCorrect: "Excellent! One teacher.",
        feedbackIncorrect: "Only one teacher. Try again!"
      },
      {
        id: "q2-3",
        type: "fill-blank",
        text: "___ five students.",
        correctAnswer: "There are",
        feedbackCorrect: "Great job using 'there are'!",
        feedbackIncorrect: "Five students is plural. What do we use?"
      }
    ],
    reward: {
      name: "Magic Book",
      icon: "📖",
      points: 50
    }
  },
  {
    id: 3,
    title: "The Forest Path",
    theme: "Nature and Animals",
    description: "Walk through the forest and observe nature.",
    introDialog: [
      "The forest is beautiful today.",
      "Look carefully. There is a cat near the house.",
      "What else can you find in the forest?"
    ],
    backgroundUrl: "https://picsum.photos/seed/rpg-forest/800/600?blur=2",
    questions: [
      {
        id: "q3-1",
        type: "multiple-choice",
        text: "___ a tree near the river.",
        options: ["There is", "There are"],
        correctAnswer: "There is",
        feedbackCorrect: "Correct! One tree.",
        feedbackIncorrect: "Use 'there is' for one object."
      },
      {
        id: "q3-2",
        type: "multiple-choice",
        text: "___ birds in the sky.",
        options: ["There is", "There are"],
        correctAnswer: "There are",
        feedbackCorrect: "Excellent! You understand plural nouns.",
        feedbackIncorrect: "Birds is plural (more than one)."
      },
      {
        id: "q3-3",
        type: "fill-blank",
        text: "___ a bridge in the forest.",
        correctAnswer: "There is",
        feedbackCorrect: "You are a reading hero!",
        feedbackIncorrect: "One bridge. Try again!"
      }
    ],
    reward: {
      name: "Green Crystal",
      icon: "💎",
      points: 50
    }
  },
  {
    id: 4,
    title: "The Old Castle",
    theme: "Rooms and Objects",
    description: "Explore the ancient castle rooms.",
    introDialog: [
      "Wow, an old castle!",
      "It is very big. Let's see what is inside.",
      "Pay attention to the rooms and objects."
    ],
    backgroundUrl: "https://picsum.photos/seed/rpg-castle/800/600?blur=2",
    questions: [
      {
        id: "q4-1",
        type: "multiple-choice",
        text: "___ a king's room.",
        options: ["There is", "There are"],
        correctAnswer: "There is",
        feedbackCorrect: "Great reading!",
        feedbackIncorrect: "One room = There is."
      },
      {
        id: "q4-2",
        type: "multiple-choice",
        text: "___ pictures on the wall.",
        options: ["There is", "There are"],
        correctAnswer: "There are",
        feedbackCorrect: "Perfect! Pictures is plural.",
        feedbackIncorrect: "Pictures means more than one."
      },
      {
        id: "q4-3",
        type: "fill-blank",
        text: "___ a treasure under the bed.",
        correctAnswer: "There is",
        feedbackCorrect: "You found a treasure!",
        feedbackIncorrect: "One treasure. What do we use?"
      }
    ],
    reward: {
      name: "Golden Crown",
      icon: "👑",
      points: 50
    }
  },
  {
    id: 5,
    title: "The Town Market",
    theme: "Places and Everyday Objects",
    description: "Visit the busy town market.",
    introDialog: [
      "The market is very busy today.",
      "There are many people and shops.",
      "Can you describe what you see?"
    ],
    backgroundUrl: "https://picsum.photos/seed/rpg-market/800/600?blur=2",
    questions: [
      {
        id: "q5-1",
        type: "multiple-choice",
        text: "___ many fruits in the market.",
        options: ["There is", "There are"],
        correctAnswer: "There are",
        feedbackCorrect: "Excellent! Many fruits = plural.",
        feedbackIncorrect: "Many fruits means plural."
      },
      {
        id: "q5-2",
        type: "multiple-choice",
        text: "___ a bakery next to the shop.",
        options: ["There is", "There are"],
        correctAnswer: "There is",
        feedbackCorrect: "Great job! One bakery.",
        feedbackIncorrect: "A bakery means one bakery."
      },
      {
        id: "q5-3",
        type: "fill-blank",
        text: "___ people in the square.",
        correctAnswer: "There are",
        feedbackCorrect: "You are doing great!",
        feedbackIncorrect: "People is plural (many persons)."
      }
    ],
    reward: {
      name: "Magic Apple",
      icon: "🍎",
      points: 50
    }
  },
  {
    id: 6,
    title: "The Final Crystal Temple",
    theme: "General Review",
    description: "The final test of your knowledge.",
    introDialog: [
      "You made it to the Final Crystal Temple!",
      "This is your final test.",
      "Show me everything you learned about 'there is' and 'there are'."
    ],
    backgroundUrl: "https://picsum.photos/seed/rpg-temple/800/600?blur=2",
    questions: [
      {
        id: "q6-1",
        type: "multiple-choice",
        text: "___ a big crystal in the center.",
        options: ["There is", "There are"],
        correctAnswer: "There is",
        feedbackCorrect: "Perfect start!",
        feedbackIncorrect: "One big crystal."
      },
      {
        id: "q6-2",
        type: "multiple-choice",
        text: "___ four small crystals around it.",
        options: ["There is", "There are"],
        correctAnswer: "There are",
        feedbackCorrect: "Excellent! Four is plural.",
        feedbackIncorrect: "Four crystals is plural."
      },
      {
        id: "q6-3",
        type: "fill-blank",
        text: "___ a magic door.",
        correctAnswer: "There is",
        feedbackCorrect: "You are a Grammar Hero!",
        feedbackIncorrect: "A magic door means one door."
      },
      {
        id: "q6-4",
        type: "multiple-choice",
        text: "___ many stars in the sky.",
        options: ["There is", "There are"],
        correctAnswer: "There are",
        feedbackCorrect: "Congratulations! You are a There Is Master!",
        feedbackIncorrect: "Many stars is plural."
      }
    ],
    reward: {
      name: "Master Crystal",
      icon: "🔮",
      points: 100
    }
  }
];
