// ==============================================
// PORTFOLIO CONFIGURATION FILE
// ==============================================
// Edit this file to customize your entire portfolio
// All content, links, and settings can be modified here

export const PORTFOLIO_CONFIG = {
  // ==============================================
  // PERSONAL INFORMATION
  // ==============================================
  personal: {
    fullName: "Reza Arifa Rabbani",
    displayTitle: "Portofolio", // Shown in navigation
    location: "Sukabumi, Jawa Barat – Indonesia",
    birthDate: "10 November 2010",
    status: "Pelajar", // Current status (e.g., "Student", "Freelancer", "Developer")
    passion: "Technology",
    
    // Profile & Background Images
    profileImage: "https://files.catbox.moe/lvb561.jpg",
    backgroundImage: "https://files.catbox.moe/k10jog.png",
    
    // About Me Section
    aboutMe: {
      title: "Tentang Saya",
      description: "Sejak kecil sudah saya sangat tertarik pada teknologi. Saya ingin terus belajar dan menjadi yang terbaik dalam bidang teknologi.",
      highlights: [
        "Passionate tentang teknologi",
        "Selalu ingin belajar hal baru",
        "Fokus pada pengembangan AI",
        "Aktif dalam komunitas developer"
      ]
    }
  },

  // ==============================================
  // TYPING ANIMATION
  // ==============================================
  typingAnimation: [
    "Welcome",
    "I'm A Lazy Person",
    "But I'm Still Excited", 
    "Thank You For Visiting My Website :) "
  ],

  // ==============================================
  // SOCIAL MEDIA LINKS
  // ==============================================
  socialLinks: {
    instagram: "https://instagram.com/xvrezz_",
    github: "https://github.com/rezzxzx",
    email: "rezzzyxz@gmail.com",
    
    // GitHub link for "View All Projects" button
    githubPortfolio: "https://github.com/rezzxzx"
  },

  // ==============================================
  // SKILLS CONFIGURATION
  // ==============================================
  skills: [
    { name: "GitHub", level: 70, color: "from-gray-400 to-gray-600" },
    { name: "HTML5", level: 49, color: "from-orange-400 to-red-500" },
    { name: "JavaScript", level: 37, color: "from-yellow-400 to-orange-500" },
    { name: "Python", level: 25, color: "from-blue-400 to-cyan-500" },
    { name: "Artificial Intelligence", level: 70, color: "from-purple-400 to-pink-500" }
  ],

  // ==============================================
  // PROJECTS CONFIGURATION  
  // ==============================================
  projects: [
    {
      id: 1,
      title: "Tiktok Downloader",
      description: "Aplikasi web untuk mengunduh video TikTok dengan mudah dan cepat tanpa watermark.",
      technologies: ["Web App", "JavaScript", "API"],
      status: "Dalam Pengembangan",
      icon: "Globe",
      color: "from-pink-500 to-pink-400",
      projectUrl: "https://tikdownn.vercel.app/",
      demoUrl: "https://tikdownn.vercel.app/"
    },
    {
      id: 2,
      title: "Website Portofolio",
      description: "Portfolio personal dengan desain modern dan responsif menggunakan teknologi web terdepan.",
      technologies: ["React", "TypeScript", "Tailwind"],
      status: "Dalam Pengembangan",
      icon: "Code",
      color: "from-blue-500 to-blue-400", 
      projectUrl: "/",
      demoUrl: "/"
    },
    {
      id: 3,
      title: "Website Kelas",
      description: "Platform pembelajaran online untuk kelas dengan fitur manajemen tugas dan interaksi siswa.",
      technologies: ["Web Development", "Education", "UI/UX"],
      status: "Dalam Pengembangan",
      icon: "Globe",
      color: "from-green-500 to-green-400",
      projectUrl: "https://weareeight-c.vercel.app",
      demoUrl: "https://weareeight-c.vercel.app"
    },
    {
      id: 4,
      title: "RyezX API's",
      description: "Kumpulan API dan layanan web untuk berbagai keperluan development dan integrasi aplikasi.",
      technologies: ["API", "Backend", "Web Services"],
      status: "Dalam Pengembangan",
      icon: "Code",
      color: "from-purple-500 to-purple-400",
      projectUrl: "https://apiryezx-x.vercel.app",
      demoUrl: "https://apiryezx-x.vercel.app"
    }
  ],

  // ==============================================
  // MUSIC PLAYER CONFIGURATION
  // ==============================================
  musicPlayer: {
    enabled: true, // Set to false to disable music player
    autoplay: true, // Auto start playing when website loads
    loop: true, // Loop through playlist automatically
    playlist: [
      {
        id: 1,
        title: "Untilted",
        artist: "Zerls",
        url: "https://files.catbox.moe/t5qsru.mp3",
        cover: "https://files.catbox.moe/qjssxk.jpg"
      },
      {
        id: 2,
        title: "Sorry",
        artist: "Justin Bieber", 
        url: "https://files.catbox.moe/10tgyx.mp3",
        cover: "https://files.catbox.moe/ibkefk.jpeg"
      },
      {
        id: 3,
        title: "Duvet",
        artist: "Boa",
        url: "https://files.catbox.moe/r0060r.mp3",
        cover: "https://files.catbox.moe/uansr1.jpeg"
      }
    ]
  },

  // ==============================================
  // LOGO CONFIGURATION
  // ==============================================
  logo: {
    letter: "R", // Letter to display in logo
    colors: {
      primary: "#87CEEB", // Light blue
      secondary: "#60A5FA" // Blue
    },
    animation: {
      enabled: true,
      duration: 3 // seconds
    }
  },

  // ==============================================
  // FOOTER CONFIGURATION
  // ==============================================
  footer: {
    text: "©RyezX | All Right Reserved",
    showHeartIcon: false // Set to true to show animated heart
  },

  // ==============================================
  // NAVIGATION CONFIGURATION
  // ==============================================
  navigation: [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" }
  ]
} as const;

// Legacy exports for backward compatibility
export const PERSONAL_INFO = PORTFOLIO_CONFIG.personal;
export const MUSIC_CONFIG = PORTFOLIO_CONFIG.musicPlayer;
export const SOCIAL_LINKS = PORTFOLIO_CONFIG.socialLinks;
export const NAVIGATION_ITEMS = PORTFOLIO_CONFIG.navigation;
export const SKILLS = PORTFOLIO_CONFIG.skills;
export const PROJECTS = PORTFOLIO_CONFIG.projects;
