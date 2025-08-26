// এই ফাইলে আমাদের অ্যাপ্লিকেশনের সব ডাটা এবং কালার থিম থাকবে।

// --- কালার থিম ---
export const colors = {
  blue: {
    bg: "bg-blue-600",
    shadow: "hover:shadow-blue-500/40",
    text: "text-blue-400",
    gradient: "from-blue-400 to-cyan-400",
    button: "bg-blue-600 hover:bg-blue-700",
    successButton: "bg-green-600 hover:bg-green-700", // আনলক বাটনের জন্য
  },
  purple: {
    bg: "bg-purple-600",
    shadow: "hover:shadow-purple-500/40",
    text: "text-purple-400",
    gradient: "from-purple-400 to-pink-400",
    button: "bg-purple-600 hover:bg-purple-700",
  },
};

// --- বিভিন্ন প্রোগ্রামের ডাটা ---
export const programsData = {
  '3p': {
    title: '3P Programme',
    description: 'A comprehensive program designed to enhance your skills through structured levels, each containing unique challenges and learning modules.',
    color: 'blue',
    // We now use a 'levels' array
    levels: [
      {
        level: 1,
        cards: [
          { id: '3p-1-1', title: 'Module 1.1: Introduction', description: 'Understanding the fundamentals.' },
          { id: '3p-1-2', title: 'Module 1.2: Core Concepts', description: 'Exploring the main principles.' },
          { id: '3p-1-3', title: 'Module 1.3: First Steps', description: 'Putting theory into practice.' },
        ]
      },
      {
        level: 2,
        cards: [
          { id: '3p-2-1', title: 'Module 2.1: Advanced Techniques', description: 'Building on the basics.' },
          { id: '3p-2-2', title: 'Module 2.2: Case Studies', description: 'Learning from real-world examples.' },
          { id: '3p-2-3', title: 'Module 2.3: Practical Application', description: 'Hands-on project work.' },
        ]
      },
      // ... Add levels 3, 4, 5, 6 with their own cards
      { level: 3, cards: [/* ... */] },
      { level: 4, cards: [/* ... */] },
      { level: 5, cards: [/* ... */] },
      { level: 6, cards: [/* ... */] },
    ],
  },







  
  "6p": {
    title: "6P Program",
    color: "blue",
    description: "Advanced programs for deep specialization and achieving mastery.",
    cards: [
      { level: 1, title: "Innovate", description: "Explore cutting-edge techniques." },
      { level: 2, title: "Lead", description: "Mentor and guide project development." },
      { level: 3, title: "Specialize", description: "Focus on a niche, high-demand area." },
      { level: 4, title: "Master", description: "Achieve expert-level proficiency." },
      { level: 5, title: "Synthesize", description: "Combine multiple disciplines to solve complex problems." },
      { level: 6, title: "Pioneer", description: "Create new patterns and contribute to the field." },
    ],
  },
  "vip": {
    title: "VIP Program",
    color: "purple",
    description: "Exclusive, personalized coaching for elite performance and industry leadership.",
    cards: [
      { level: 'VIP', title: "Strategy", description: "Define your long-term career trajectory." },
      { level: 'VIP', title: "Execution", description: "Receive 1-on-1 guidance on major projects." },
      { level: 'VIP', title: "Networking", description: "Access an exclusive professional network." },
      { level: 'VIP', title: "Branding", description: "Build your personal brand as an expert." },
      { level: 'VIP', title: "Influence", description: "Shape industry standards and practices." },
      { level: 'VIP', title: "Legacy", description: "Create a lasting impact with your work." },
    ],
  },
};