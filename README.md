# 📚 Online Bookstore

A full-stack web application for an online bookstore with AI-powered book recommendations, user authentication, and a beautiful responsive UI.

## ✨ Features

- **🔐 User Authentication** - Secure signup and login system
- **📖 Book Catalog** - Browse a collection of books with details, prices, and ratings
- **🤖 AI Recommendations** - Get personalized book recommendations using natural language
- **🔍 Smart Filtering** - Filter books by genre and price range
- **⭐ Book Ratings** - View ratings for each book
- **🛒 Add to Cart** - (Ready for integration)
- **📱 Responsive Design** - Works on desktop, tablet, and mobile devices
- **🎨 Modern UI** - Beautiful glass-morphism design with smooth animations

## 📁 Project Structure

```
book store/
├── Bookstore-backend/          # Backend API (Express.js)
│   ├── server.js              # Main server file
│   ├── package.json           # Backend dependencies
│   ├── data/
│   │   └── users.json         # User database
│   └── users.json             # (Legacy)
│
└── bookstore-frontend/         # Frontend (HTML/CSS/JavaScript)
    ├── index.html             # Home page with book catalog
    ├── signup.html            # User signup page
    ├── login.html             # User login page
    ├── recommendations.html   # AI recommendations page
    ├── script.js              # Frontend logic
    └── style.css              # Global styles
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** v14+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)

### Installation

#### 1. Backend Setup
```bash
cd "Bookstore-backend"
npm install
```

#### 2. Frontend Setup
No installation needed! Frontend is vanilla HTML/CSS/JavaScript.

### Running the Application

#### Start Backend Server
```bash
cd "Bookstore-backend"
npm run dev
```
Server will run on `http://localhost:3000`

**Output:**
```
🚀 BOOKSTORE API SERVER STARTED
📡 Server running on: http://localhost:3000
```

#### Start Frontend
1. Open a terminal in `bookstore-frontend` directory
2. Use VS Code's Live Server extension or any local HTTP server:
```bash
# Using Python
python -m http.server 8000

# Or using Node's http-server
npx http-server
```
3. Open browser to `http://localhost:8000` (or your server port)

## 🔌 API Endpoints

### Authentication
- **POST** `/signup` - Register new user
- **POST** `/login` - Login user

### Books
- **GET** `/books` - Get all books with details and ratings

### Recommendations
- **POST** `/ai-recommend` - Get AI-powered recommendations
  ```json
  {
    "userId": "user123",
    "preference": "romantic drama"
  }
  ```

- **POST** `/recommend` - Get filtered recommendations
  ```json
  {
    "userId": "user123",
    "genre": "Romance",
    "priceRange": { "min": 10, "max": 15 },
    "limit": 5
  }
  ```

### Other
- **GET** `/users` - Get all users (testing only)
- **GET** `/` - Health check

## 💻 Usage Guide

### 1. Create Account
- Go to signup page
- Enter username (min 3 characters) and password (min 6 characters)
- Click "Sign Up"

### 2. Login
- Enter your credentials
- Click "Login"

### 3. Browse Books
- View all books on home page
- See book details, ratings, and prices

### 4. Get Recommendations
- Click "🤖 Get Recommendations" button
- **Option A - AI Recommendations:**
  - Type a preference: "romantic drama", "sci-fi adventure", "mystery thriller"
  - Click "🤖 AI Recommendations"
  - Get personalized suggestions

- **Option B - Smart Filter:**
  - Select genre (optional)
  - Set max price (optional)
  - Click "🔍 Smart Filter"
  - Get filtered results sorted by rating

## 🛠 Technologies Used

### Backend
- **Express.js** - Web framework
- **Node.js** - JavaScript runtime
- **CORS** - Cross-Origin Resource Sharing
- **File System** - JSON file-based database

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling (Glass-morphism, gradients, animations)
- **Vanilla JavaScript** - Interactivity
- **Fetch API** - HTTP requests

## 📊 Book Catalog

Current books in the system:
1. **The Raven** - Edgar Allan Poe (Poetry) - $12.99 ⭐4.5
2. **1984** - George Orwell (Dystopian) - $15.99 ⭐4.7
3. **Pride and Prejudice** - Jane Austen (Romance) - $10.99 ⭐4.6
4. **The Great Gatsby** - F. Scott Fitzgerald (Classics) - $13.99 ⭐4.4
5. **To Kill a Mockingbird** - Harper Lee (Drama) - $14.99 ⭐4.8
6. **Moby Dick** - Herman Melville (Adventure) - $16.99 ⭐4.2
7. **Jane Eyre** - Charlotte Brontë (Romance) - $11.99 ⭐4.7

## 🔐 Security Notes

⚠️ **Current Implementation:**
- Passwords are stored as plain text (for development only)
- No JWT tokens (basic session storage)

✅ **Production Recommendations:**
- Use bcryptjs for password hashing
- Implement JWT authentication
- Add HTTPS/SSL encryption
- Validate and sanitize all inputs
- Use environment variables for sensitive data

## 🚦 Troubleshooting

### Backend not responding
```bash
# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>

# Restart server
npm run dev
```

### CORS errors
- Make sure backend is running on `http://localhost:3000`
- Frontend should be on different port (8000, 5000, etc.)

### Port already in use
- Change PORT in `server.js` to a different number
- Update API_URL in `script.js` accordingly

## 🎯 Future Enhancements

- [ ] Shopping cart functionality
- [ ] Order management
- [ ] Payment integration (Stripe/PayPal)
- [ ] Book reviews and ratings
- [ ] Advanced search with filters
- [ ] User wishlist
- [ ] Email notifications
- [ ] Database migration (MongoDB/PostgreSQL)
- [ ] Admin panel
- [ ] Book recommendations based on purchase history
- [ ] Social sharing features
- [ ] Mobile app (React Native)

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as a full-stack learning project combining Node.js backend with vanilla JavaScript frontend.

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review the API Endpoints documentation
3. Ensure both frontend and backend are running properly

---

**Happy Reading! 📚✨**
