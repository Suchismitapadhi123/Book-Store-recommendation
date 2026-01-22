const API_URL = "http://localhost:3000";

// Signup function
async function signup() {
  const username = document.getElementById("su-username").value;
  const password = document.getElementById("su-password").value;
  const errorMsg = document.getElementById("error-msg");

  // Clear previous errors
  errorMsg.textContent = "";
  errorMsg.className = "error-msg";

  // Validation
  if (!username || !password) {
    errorMsg.textContent = "Please fill in all fields";
    return;
  }

  if (username.length < 3) {
    errorMsg.textContent = "Username must be at least 3 characters";
    return;
  }

  if (password.length < 6) {
    errorMsg.textContent = "Password must be at least 6 characters";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      errorMsg.textContent = "Signup successful! Redirecting...";
      errorMsg.className = "success-msg";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } else {
      errorMsg.textContent = data.message;
      errorMsg.className = "error-msg";
    }
  } catch (error) {
    errorMsg.textContent = "Error connecting to server. Make sure backend is running on port 3000.";
    console.error("Signup error:", error);
  }
}

// Login function
async function login() {
  const username = document.getElementById("li-username").value;
  const password = document.getElementById("li-password").value;
  const errorMsg = document.getElementById("error-msg");

  // Clear previous errors
  errorMsg.textContent = "";
  errorMsg.className = "error-msg";

  // Validation
  if (!username || !password) {
    errorMsg.textContent = "Please fill in all fields";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      errorMsg.textContent = "Login successful! Redirecting...";
      errorMsg.className = "success-msg";
      localStorage.setItem("user", JSON.stringify(data.user));
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } else {
      errorMsg.textContent = data.message;
      errorMsg.className = "error-msg";
    }
  } catch (error) {
    errorMsg.textContent = "Error connecting to server. Make sure backend is running on port 3000.";
    console.error("Login error:", error);
  }
}

// Redirect if already logged in
function checkAuth() {
  const user = localStorage.getItem("user");
  if (!user && (window.location.pathname.includes("index.html") || window.location.pathname.endsWith("/"))) {
    window.location.href = "login.html";
  }
  if (user && window.location.pathname.includes("login.html")) {
    window.location.href = "index.html";
  }
}

// Logout function
function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("cart");
  window.location.href = "login.html";
}

// Go to Recommendations page
function goToRecommendations() {
  window.location.href = "recommendations.html";
}

// Books data
const books = [
  { id: 1, title: "The Raven", author: "Edgar Allan Poe", price: 12.99, image: "https://covers.openlibrary.org/b/id/8231856-L.jpg" },
  { id: 2, title: "1984", author: "George Orwell", price: 15.99, image: "https://covers.openlibrary.org/b/id/7222246-L.jpg" },
  { id: 3, title: "Pride and Prejudice", author: "Jane Austen", price: 10.99, image: "https://covers.openlibrary.org/b/id/8235647-L.jpg" },
  { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 13.99, image: "https://covers.openlibrary.org/b/id/7222281-L.jpg" },
  { id: 5, title: "To Kill a Mockingbird", author: "Harper Lee", price: 14.99, image: "https://covers.openlibrary.org/b/id/8228691-L.jpg" },
  { id: 6, title: "Moby Dick", author: "Herman Melville", price: 16.99, image: "https://covers.openlibrary.org/b/id/7883312-L.jpg" },
  { id: 7, title: "Jane Eyre", author: "Charlotte Brontë", price: 11.99, image: "https://covers.openlibrary.org/b/id/8236475-L.jpg" }
];

// Display books on the page
async function displayBooks() {
  try {
    const response = await fetch(`${API_URL}/books`);
    const booksData = await response.json();
    const booksContainer = document.getElementById("books-container");
    const carouselContainer = document.getElementById("carousel-books");
    
    if (!booksContainer && !carouselContainer) return;

    // Populate grid
    if (booksContainer) {
      booksContainer.innerHTML = "";
      booksData.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        bookCard.innerHTML = `
          <img src="${book.image}" alt="${book.title}">
          <h3>${book.title}</h3>
          <p class="author">by ${book.author}</p>
          <p class="price">$${book.price}</p>
          <button onclick="addToCart(${book.id})">Add to Cart</button>
        `;
        booksContainer.appendChild(bookCard);
      });
    }

    // Populate carousel
    if (carouselContainer) {
      initCarousel(booksData);
    }
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

// Initialize Swiper carousel with 3D effect
function initCarousel(booksData) {
  const container = document.getElementById("carousel-books");
  if (!container) return;
  
  container.innerHTML = "";
  booksData.forEach(book => {
    container.innerHTML += `
      <div class="swiper-slide">
        <img src="${book.image}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <p class="price">$${book.price}</p>
      </div>
    `;
  });

  // Initialize Swiper with 3D coverflow effect
  new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
      slideShadows: true
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  });
}

// Add to cart function
function addToCart(bookId) {
  const book = books.find(b => b.id === bookId);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(book);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${book.title} added to cart!`);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  displayBooks();
});
