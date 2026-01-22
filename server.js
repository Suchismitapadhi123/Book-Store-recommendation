const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

// ========== MIDDLEWARE ==========
app.use(cors());
app.use(express.json());

// ========== FILE PATHS ==========
const USERS_FILE = path.join(__dirname, "data", "users.json");
const DATA_DIR = path.join(__dirname, "data");

// ========== ENSURE DATA DIRECTORY EXISTS ==========
if (!fs.existsSync(DATA_DIR)) {
  console.log("📁 Creating 'data' directory...");
  fs.mkdirSync(DATA_DIR);
}

// ========== ENSURE users.json EXISTS ==========
if (!fs.existsSync(USERS_FILE)) {
  console.log("📄 Creating 'users.json' file...");
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

// ========== HELPER FUNCTIONS ==========

// Read users from JSON file
function getUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Error reading users file:", error);
    return [];
  }
}

// Save users to JSON file
function saveUsers(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return true;
  } catch (error) {
    console.error("❌ Error saving users file:", error);
    return false;
  }
}

// ========== API ENDPOINTS ==========

// 1. SIGNUP API
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res.json({ 
      success: false, 
      message: "All fields are required" 
    });
  }

  if (username.length < 3) {
    return res.json({ 
      success: false, 
      message: "Username must be at least 3 characters" 
    });
  }

  if (password.length < 6) {
    return res.json({ 
      success: false, 
      message: "Password must be at least 6 characters" 
    });
  }

  const users = getUsers();

  // Check if user already exists
  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.json({ 
      success: false, 
      message: "User already exists" 
    });
  }

  // Add new user
  const newUser = {
    id: Date.now(),
    username,
    password,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  if (saveUsers(users)) {
    console.log(`✅ New user registered: ${username}`);
    res.json({ 
      success: true, 
      message: "Signup successful! Please login." 
    });
  } else {
    res.json({ 
      success: false, 
      message: "Error saving user data" 
    });
  }
});

// 2. LOGIN API
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ 
      success: false, 
      message: "All fields are required" 
    });
  }

  const users = getUsers();

  const validUser = users.find(
    u => u.username === username && u.password === password
  );

  if (validUser) {
    console.log(`✅ User logged in: ${username}`);
    res.json({ 
      success: true, 
      message: "Login successful",
      user: {
        id: validUser.id,
        username: validUser.username
      }
    });
  } else {
    console.log(`❌ Failed login attempt: ${username}`);
    res.json({ 
      success: false, 
      message: "Invalid credentials" 
    });
  }
});

// 3. GET ALL BOOKS API
app.get("/books", (req, res) => {
  const books = getAllBooks();

  console.log("📚 Books list requested");
  res.json(books);
});

// 4. GET ALL USERS (For Testing Only - Remove in production)
app.get("/users", (req, res) => {
  const users = getUsers();
  console.log("👥 Users list requested");
  res.json(users);
});

// Helper function to get all books
function getAllBooks() {
  return [
    { 
      id: 1, 
      title: "The Raven", 
      author: "Edgar Allan Poe",
      genre: "Poetry",
      price: 12.99,
      rating: 4.5,
      image: "https://covers.openlibrary.org/b/id/8231856-L.jpg" 
    },
    { 
      id: 2, 
      title: "1984", 
      author: "George Orwell",
      genre: "Dystopian",
      price: 15.99,
      rating: 4.7,
      image: "https://covers.openlibrary.org/b/id/7222246-L.jpg" 
    },
    { 
      id: 3, 
      title: "Pride and Prejudice", 
      author: "Jane Austen",
      genre: "Romance",
      price: 10.99,
      rating: 4.6,
      image: "https://covers.openlibrary.org/b/id/8235647-L.jpg" 
    },
    { 
      id: 4, 
      title: "The Great Gatsby", 
      author: "F. Scott Fitzgerald",
      genre: "Classics",
      price: 13.99,
      rating: 4.4,
      image: "https://covers.openlibrary.org/b/id/7222281-L.jpg" 
    },
    { 
      id: 5, 
      title: "To Kill a Mockingbird", 
      author: "Harper Lee",
      genre: "Drama",
      price: 14.99,
      rating: 4.8,
      image: "https://covers.openlibrary.org/b/id/8228691-L.jpg" 
    },
    { 
      id: 6, 
      title: "Moby Dick", 
      author: "Herman Melville",
      genre: "Adventure",
      price: 16.99,
      rating: 4.2,
      image: "https://covers.openlibrary.org/b/id/7883312-L.jpg" 
    },
    { 
      id: 7, 
      title: "Jane Eyre", 
      author: "Charlotte Brontë",
      genre: "Romance",
      price: 11.99,
      rating: 4.7,
      image: "https://covers.openlibrary.org/b/id/8236475-L.jpg" 
    }
  ];
}

// 5. BOOK RECOMMENDATION API
app.post("/recommend", (req, res) => {
  const { userId, genre, priceRange, limit = 5 } = req.body;

  if (!userId) {
    return res.json({ 
      success: false, 
      message: "User ID is required" 
    });
  }

  const books = getAllBooks();
  let recommendations = [...books];

  // Filter by genre if specified
  if (genre) {
    recommendations = recommendations.filter(
      book => book.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  // Filter by price range if specified
  if (priceRange) {
    const { min = 0, max = 1000 } = priceRange;
    recommendations = recommendations.filter(
      book => book.price >= min && book.price <= max
    );
  }

  // Sort by rating (highest first)
  recommendations.sort((a, b) => b.rating - a.rating);

  // Limit results
  recommendations = recommendations.slice(0, limit);

  console.log(`✨ Recommendations generated for user ${userId}: ${recommendations.length} books`);
  
  res.json({
    success: true,
    message: "Recommendations generated successfully",
    data: {
      userId,
      recommendedBooks: recommendations,
      count: recommendations.length,
      timestamp: new Date().toISOString()
    }
  });
});

// 5b. AI RECOMMENDATION API (Mock AI with keyword analysis)
app.post("/ai-recommend", (req, res) => {
  const { userId, preference } = req.body;

  if (!userId || !preference) {
    return res.json({ 
      success: false, 
      message: "User ID and preference are required" 
    });
  }

  const books = getAllBooks();
  
  // Simple keyword matching for AI recommendations
  const keywords = preference.toLowerCase().split(" ");
  
  let recommendations = books.map(book => {
    let score = 0;
    
    // Score based on genre match
    keywords.forEach(keyword => {
      if (book.genre.toLowerCase().includes(keyword)) score += 3;
      if (book.title.toLowerCase().includes(keyword)) score += 2;
      if (book.author.toLowerCase().includes(keyword)) score += 2;
    });
    
    // Boost score for high-rated books
    score += book.rating;
    
    return { ...book, matchScore: score };
  });

  // Filter books with positive score and sort by score
  recommendations = recommendations
    .filter(book => book.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);

  // Remove matchScore from response
  recommendations = recommendations.map(({ matchScore, ...book }) => book);

  console.log(`🤖 AI Recommendations for user ${userId}: "${preference}" → ${recommendations.length} books`);
  
  res.json({
    success: true,
    message: "AI recommendations generated based on your preference",
    data: {
      userId,
      userPreference: preference,
      recommendedBooks: recommendations,
      count: recommendations.length,
      timestamp: new Date().toISOString()
    }
  });
});

// 6. HEALTH CHECK
app.get("/", (req, res) => {
  res.json({ 
    status: "✅ OK", 
    message: "Bookstore API is running successfully!",
    timestamp: new Date().toISOString(),
    endpoints: {
      signup: "POST /signup",
      login: "POST /login",
      books: "GET /books",
      recommend: "POST /recommend",
      aiRecommend: "POST /ai-recommend",
      users: "GET /users"
    }
  });
});

// ========== START SERVER ==========
app.listen(PORT, () => {
  console.log("\n" + "=".repeat(50));
  console.log("🚀 BOOKSTORE API SERVER STARTED");
  console.log("=".repeat(50));
  console.log(`📡 Server running on: http://localhost:${PORT}`);
  console.log(`📁 Users file: ${USERS_FILE}`);
  console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
  console.log("=".repeat(50) + "\n");
  console.log("📋 Available Endpoints:");
  console.log("   POST http://localhost:3000/signup");
  console.log("   POST http://localhost:3000/login");
  console.log("   GET  http://localhost:3000/books");
  console.log("   POST http://localhost:3000/recommend (with genre, priceRange filters)");
  console.log("   POST http://localhost:3000/ai-recommend (AI-powered suggestions)");
  console.log("   GET  http://localhost:3000/users");
  console.log("\n💡 Press Ctrl+C to stop the server\n");
});

// ========== ERROR HANDLING ==========
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Rejection:', error);
});