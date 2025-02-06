1. cd lorekeep
2. npm install
3. eas build --profile=development
4. npm run start

To create a build to share with others:

1. cd lorekeep
2. npm install
3. eas build --profile=preview

---

### **Plan for Future Tasks**

#### 1. **Implement Login/SignUp Screens**

- **Why?**
  - A polished login/signup flow improves user experience and makes your app more professional.
- **Tasks:**

  - Design a **Login Screen** with Google Sign-In button.
  - Design a **SignUp Screen** (if needed, though Google Sign-In might handle this).
  - Add **input validation** for forms (e.g., email, password).
  - Add **error handling** for failed login/signup attempts.
  - Add a **"Forgot Password"** option (if using email/password login).
  - Use a **loading state** during authentication.

- **Tech Stack:**
  - Use a UI library like **React Native Paper** for pre-built components.
  - Use **React Hook Form** for form management.

---

#### 2. **Implement Web Scraping**

- **Why?**
  - Web scraping can fetch external data (e.g., news, product prices, or other dynamic content) to enrich your app.
- **Tasks:**

  - Choose a **web scraping library** (e.g., **Cheerio** for Node.js or **Puppeteer** for headless browsing).
  - Set up a **backend service** (e.g., using **Express.js** or **Firebase Functions**) to handle scraping (avoid doing it on the client side for performance and security reasons).
  - Define the **data sources** (e.g., specific websites or APIs).
  - Parse and format the scraped data for your app.
  - Cache the scraped data to reduce repeated requests (e.g., using **Redis** or **Firestore**).

- **Tech Stack:**
  - Backend: **Node.js** with **Express.js** or **Firebase Functions**.
  - Scraping: **Cheerio** (for static HTML) or **Puppeteer** (for dynamic content).
  - Caching: **Redis** or **Firestore**.

---

#### 3. **Implement Backup**

- **Why?**
  - Backup functionality ensures user data is safe and can be restored if needed.
- **Tasks:**

  - Use **Google Drive API** or **Firebase Storage** to store backups.
  - Allow users to **manually trigger backups** (e.g., a "Backup Now" button).
  - Implement **automatic backups** (e.g., daily or weekly).
  - Add a **restore functionality** to retrieve backups.
  - Encrypt sensitive data before backing it up (e.g., using **AES encryption**).

- **Tech Stack:**
  - Backup Storage: **Google Drive API** or **Firebase Storage**.
  - Encryption: **crypto-js** or **React Native Crypto**.
  - Scheduling: Use **Firebase Functions** or a cron job for automatic backups.

---

### **Additional Suggestions**

#### 1. **User Profile Management**

- Allow users to **update their profile** (e.g., name, profile picture).
- Add a **settings screen** for managing preferences (e.g., theme, notifications).

#### 2. **Push Notifications**

- Use **Firebase Cloud Messaging (FCM)** to send push notifications.
- Notify users about important updates (e.g., backup completion, new features).

#### 3. **Analytics**

- Integrate **Google Analytics** or **Firebase Analytics** to track user behavior.
- Monitor key metrics like active users, screen views, and feature usage.

#### 4. **Offline Support**

- Use **Redux Persist** or **AsyncStorage** to cache data locally.
- Allow users to perform CRUD operations offline and sync when online.

#### 5. **Dark Mode**

- Add a **dark mode** toggle in the settings.
- Use a **theme provider** (e.g., **Styled Components** or **React Navigation Themes**) to manage themes.

#### 6. **Error Tracking**

- Use **Sentry** or **Bugsnag** to track and log errors in production.

#### 7. **Testing**

- Write **unit tests** for your Zustand store and components (e.g., using **Jest** and **React Testing Library**).
- Write **integration tests** for critical workflows (e.g., login, backup).

#### 8. **Documentation**

- Write a **README.md** for your project with setup instructions and feature descriptions.
- Add **code comments** and **JSDoc** for complex functions.

---

### **Proposed Timeline**

#### **Phase 1: Login/SignUp Screens (1-2 Days)**

- Design and implement the login/signup screens.
- Integrate with Google Sign-In.

#### **Phase 2: Web Scraping (3-5 Days)**

- Set up a backend for scraping.
- Define data sources and parse scraped data.
- Cache and display data in the app.

#### **Phase 3: Backup (3-5 Days)**

- Implement manual and automatic backups.
- Add restore functionality.
- Encrypt sensitive data.

#### **Phase 4: Additional Features (Ongoing)**

- Add user profile management, push notifications, analytics, etc.
- Continuously improve based on user feedback.

---

### **Follow-Up Tasks**

1. **User Feedback**:
   - Add a feedback form or rating prompt to gather user input.
2. **Performance Optimization**:
   - Optimize app performance (e.g., lazy loading, reducing re-renders).
3. **Localization**:
   - Add support for multiple languages using **i18n**.
4. **Accessibility**:
   - Ensure your app is accessible (e.g., screen reader support, contrast ratios).

---
