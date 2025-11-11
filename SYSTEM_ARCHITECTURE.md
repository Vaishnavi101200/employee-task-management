# Employee Management System - System Architecture & Technology Stack

## 1. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER (Frontend)                         │
│                       React + Vite + Tailwind CSS                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌──────────────────────┐         ┌──────────────────────────────────┐ │
│  │  React Components    │         │     Authentication Context      │ │
│  │  - Login             │◄───────►│  (useAuth Hook)                  │ │
│  │  - Admin Dashboard   │         │  - User State                    │ │
│  │  - Employee Mgmt     │         │  - Token Management             │ │
│  │  - Department Mgmt   │         └──────────────────────────────────┘ │
│  └──────────────────────┘                        ▲                      │
│           ▲                                       │                      │
│           │ axios (HTTP Client)                  │ localStorage         │
│           │                                      │ (JWT Token)          │
└───────────┼──────────────────────────────────────┼──────────────────────┘
            │                                      │
            │ REST API Calls                       │ Token Retrieval
            │ http://localhost:5000/api            │
            ▼                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        API GATEWAY & MIDDLEWARE                          │
│                           Express.js Server                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ CORS Middleware │ Auth Middleware │ Request Logging              │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                            ▼                                            │
└─────────────────────────────────────────────────────────────────────────┘
            ▲                                      ▼
            │ JWT Verification                    │
            │ Bearer Token Validation             │
            ▼                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER - ROUTES & CONTROLLERS              │
│                                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐              │
│  │ Auth Routes  │  │ Dept Routes  │  │ Employee Routes  │              │
│  ├──────────────┤  ├──────────────┤  ├──────────────────┤              │
│  │ POST /login  │  │ GET /        │  │ GET /            │              │
│  │ GET /verify  │  │ POST /add    │  │ GET /:id         │              │
│  │              │  │ PUT /:id     │  │ POST /add        │              │
│  │              │  │ DELETE /:id  │  │ PUT /:id         │              │
│  │              │  │              │  │ DELETE /:id      │              │
│  └──────────────┘  └──────────────┘  └──────────────────┘              │
│                            ▼                                            │
│              Controllers & Business Logic                               │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ authController │ departmentController │ employeeController      │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                            ▼                                            │
└─────────────────────────────────────────────────────────────────────────┘
            ▲                                      ▼
            │ Mongoose ORM (Schema Validation)     │
            │                                      │
            ▼                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    DATA LAYER - MONGOOSE MODELS                          │
│                                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐              │
│  │ User Model   │  │ Department   │  │ Employee Model   │              │
│  ├──────────────┤  │ Model        │  ├──────────────────┤              │
│  │ _id          │  ├──────────────┤  │ _id              │              │
│  │ name         │  │ _id          │  │ userId (Ref)     │              │
│  │ email        │  │ dep_name     │  │ employeeId       │              │
│  │ password     │  │ description  │  │ dob              │              │
│  │ role         │  │ createdAt    │  │ gender           │              │
│  │ profileImage │  │ updatedAt    │  │ maritalStatus    │              │
│  │ createdAt    │  │              │  │ designation      │              │
│  │ updatedAt    │  │              │  │ department (Ref) │              │
│  └──────────────┘  └──────────────┘  │ salary           │              │
│                                       │ createdAt        │              │
│                                       │ updatedAt        │              │
│                                       └──────────────────┘              │
│                                                                           │
│         (Relationships)                                                 │
│         User ◄──────┐ (1:1)                                            │
│                     │                                                   │
│                Employee                                                │
│                     │ (N:1)                                            │
│         Department ◄┘                                                  │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
            ▲                                      ▼
            │ MongoDB Driver                       │
            │                                      │
            ▼                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       DATABASE LAYER - MONGODB                           │
│                     (Stores all collections & documents)                 │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Tools and Technologies Used

### **FRONTEND**
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | UI component library & state management |
| **React Router DOM** | 7.9.5 | Client-side routing (admin/employee dashboards) |
| **Vite** | 7.1.14 (rolldown-vite) | Fast development server & build tool |
| **Tailwind CSS** | 4.1.17 | Utility-first CSS framework for styling |
| **@tailwindcss/vite** | 4.1.17 | Tailwind CSS plugin for Vite |
| **Axios** | 1.13.2 | HTTP client for API requests |
| **React Data Table Component** | 7.7.0 | Data tables/grids for employee/department lists |
| **React Icons** | 5.5.0 | Icon library for UI components |
| **ESLint** | 9.36.0 | Code linting & quality |

### **AUTHENTICATION**
| Technology | Version | Purpose |
|------------|---------|---------|
| **JWT (jsonwebtoken)** | 9.0.2 | Token-based authentication (backend) |
| **bcrypt** | 6.0.0 | Password hashing (backend) |
| **localStorage** | Native | Stores JWT token on client-side |
| **Bearer Token** | - | Token sent via Authorization header |

**Auth Flow:**
- User logs in → backend validates email/password → hashes password with bcrypt → generates JWT token
- Token stored in localStorage → sent with every API request in `Authorization: Bearer <token>` header
- Backend verifies JWT using secret key before allowing access

### **BACKEND**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | JavaScript runtime for server |
| **Express.js** | 5.1.0 | Web framework for REST API |
| **nodemon** | 3.1.10 | Auto-reload server during development |
| **Mongoose** | 8.19.3 | ODM (Object Data Modeling) for MongoDB |
| **CORS** | 2.8.5 | Enable cross-origin requests |
| **Multer** | 2.0.2 | File upload middleware (optional/future use) |

### **DATABASE**
| Technology | Purpose |
|------------|---------|
| **MongoDB** | NoSQL document database |
| **Mongoose Schemas** | Define data structure & validation |

**Collections:**
- `users` — User accounts (admin/employee)
- `departments` — Department information
- `employees` — Employee records with references to users & departments

### **DEVELOPMENT TOOLS**
| Tool | Purpose |
|------|---------|
| **npm** | Package manager |
| **Visual Studio Code** | Code editor |
| **Git** | Version control |
| **DevTools (Browser)** | Frontend debugging |
| **MongoDB Compass / Shell** | Database inspection & management |
| **Postman / Thunder Client** | API testing |
| **.env file** | Environment variables (JWT_KEY, MONGODB_URL, PORT) |

---

## 3. Data Flow & Authentication

### **Login Data Flow**

```
1. USER ENTERS CREDENTIALS
   └─→ Email & Password (Plain Text)

2. FRONTEND SENDS REQUEST
   POST http://localhost:5000/api/auth/login
   Body: { email, password }

3. BACKEND PROCESSING (authController.login)
   ├─ Find User by email in MongoDB
   ├─ Compare password with stored hash using bcrypt.compare()
   ├─ IF MATCH:
   │  ├─ Generate JWT Token
   │  │  └─ jwt.sign({ _id: user._id }, process.env.JWT_KEY)
   │  └─ Return { success: true, token, user }
   └─ IF NO MATCH:
      └─ Return { success: false, error: "Invalid credentials" }

4. FRONTEND STORES TOKEN
   └─ localStorage.setItem("token", response.data.token)

5. UPDATE AUTH CONTEXT
   └─ login(user) → setUser(user) globally available
```

### **Authenticated API Request Flow**

```
1. USER CLICKS ACTION (e.g., View Employee)
   └─ Frontend retrieves id from URL params: useParams()

2. FRONTEND MAKES REQUEST
   GET http://localhost:5000/api/employee/:id
   Headers: {
     Authorization: "Bearer <token_from_localStorage>"
   }

3. SERVER RECEIVES REQUEST
   ├─ Extract Authorization header
   ├─ Validate "Bearer" format
   ├─ Extract token

4. AUTH MIDDLEWARE (authMiddleware.js)
   ├─ Verify JWT signature using jwt.verify(token, JWT_KEY)
   ├─ Extract user._id from token payload
   ├─ Query User by _id
   ├─ IF VALID:
   │  └─ req.user = user
   │  └─ next() → proceed to controller
   └─ IF INVALID:
      └─ Return 401/403/404 error

5. CONTROLLER PROCESSES REQUEST
   ├─ Access req.user from middleware
   ├─ Query MongoDB for Employee by id
   └─ Return populated document

6. RESPONSE SENT TO FRONTEND
   Response: { success: true, employee: {...} }

7. FRONTEND UPDATES UI
   └─ setEmployee(response.data.employee)
```

### **Route Protection & Role-Based Access**

```
PRIVATE ROUTES (PrivateRoutes.jsx)
  ├─ Checks if user exists in auth context
  ├─ If logged in → render component
  └─ If not logged in → redirect to /login

ROLE-BASED ROUTES (RoleBasedRoutes.jsx)
  ├─ Checks req.user.role (admin/employee)
  ├─ If role matches required roles → render component
  └─ If role mismatch → redirect or deny access

Example:
<RoleBasedRoutes requiredRole={['admin']}>
  <AdminDashboard />
</RoleBasedRoutes>
```

### **Data Models & Relationships**

```
USER
├─ _id (ObjectId)
├─ name
├─ email (unique)
├─ password (hashed)
├─ role (admin / employee)
├─ profileImage
├─ createdAt
└─ updatedAt

EMPLOYEE (1:1 with User, N:1 with Department)
├─ _id (ObjectId)
├─ userId (Reference to User._id) ◄───┐
├─ employeeId (String, unique)        │ Foreign Key
├─ dob                                 │
├─ gender                              │
├─ maritalStatus                       │
├─ designation                         │
├─ department (Reference to Dept._id)  │
├─ salary                              │
├─ createdAt                           │
└─ updatedAt                           │
                                       │
USER._id ◄─────────────────────────────┘

DEPARTMENT (1:N with Employee)
├─ _id (ObjectId)
├─ dep_name
├─ description
├─ createdAt
└─ updatedAt
       ▲
       │ Foreign Key Reference
       │
   EMPLOYEE.department
```

### **API Endpoints**

```
AUTH
├─ POST   /api/auth/login          → { email, password } → { token, user }
└─ GET    /api/auth/verify         → (with Bearer token) → { user }

DEPARTMENTS
├─ GET    /api/department          → List all departments
├─ POST   /api/department/add      → Create new department
├─ PUT    /api/department/:id      → Update department
└─ DELETE /api/department/:id      → Delete department

EMPLOYEES
├─ GET    /api/employee            → List all employees (with populate)
├─ GET    /api/employee/:id        → Get single employee (tries findById, userId, employeeId)
├─ POST   /api/employee/add        → Create new employee + User
├─ PUT    /api/employee/:id        → Update employee (future)
└─ DELETE /api/employee/:id        → Delete employee (future)
```

---

## 4. Request-Response Cycle Example

### **Fetch Employee Details (Current Implementation)**

```
FRONTEND (View.jsx)
  │
  ├─ useParams() → Extract id from URL
  ├─ useEffect() → Fetch on component mount
  │
  ├─ axios.get(`/api/employee/${id}`, {
  │    headers: { Authorization: `Bearer ${token}` }
  │  })
  │
  └─────────────────────────────────────────────────────────────► NETWORK
                                                                   │
                                                      REQUEST
                                                  GET /api/employee/69135e6f...
                                              Headers: {Authorization: Bearer ...}
                                                      │
                                                      ▼
                                    SERVER (Express)
                                      │
                                      ├─ CORS middleware ✓
                                      ├─ Request logging ✓
                                      ├─ Auth middleware
                                      │  ├─ Verify Bearer token
                                      │  ├─ Extract user from JWT
                                      │  └─ Attach req.user
                                      │
                                      ├─ Route handler: router.get('/:id', authMiddleware, getEmployee)
                                      │
                                      ├─ getEmployee controller
                                      │  ├─ Extract id from req.params
                                      │  ├─ Try Employee.findById(id)
                                      │  ├─ If not found, try findOne({ userId: id })
                                      │  ├─ If not found, try findOne({ employeeId: id })
                                      │  ├─ Populate userId (exclude password)
                                      │  ├─ Populate department
                                      │  └─ Return employee data or 404
                                      │
                                      ├─ Mongoose Query
                                      │  ├─ MongoDB query
                                      │  └─ Join data from User & Department collections
                                      │
                                      └─────────────────────────────────────────► NETWORK
                                                                                   │
                                                                        RESPONSE
                                                        { success: true, employee: {...} }
                                                                       │
                                                                       ▼
FRONTEND (View.jsx)
  │
  ├─ axios response.data.success ✓
  ├─ setEmployee(response.data.employee)
  ├─ Re-render with populated data
  │
  └─ Display: Name, Email, DOB, Gender, Department, etc.
```

---

## 5. Error Handling & Debugging

### **Common Error Scenarios**

```
SCENARIO 1: 404 Employee Not Found
  Issue   → Employee id doesn't exist in MongoDB
  Cause   → Wrong id passed (userId vs employee._id mismatch)
  Fix     → Use employee._id from List.jsx (already implemented)
           → Verify Employee document exists in MongoDB

SCENARIO 2: 401/403 Unauthorized
  Issue   → Auth token invalid or missing
  Cause   → Token expired, not sent in header, or JWT_KEY mismatch
  Fix     → Login again, localStorage.token is populated
           → Confirm Authorization header format: "Bearer <token>"

SCENARIO 3: 500 Server Error
  Issue   → Controller or Mongoose error
  Cause   → DB connection, validation error, or bad query
  Fix     → Check server logs for error details
           → Verify MongoDB connection string
           → Validate request body

SCENARIO 4: CORS Error
  Issue   → Frontend blocked by browser (CORS policy)
  Cause   → Server missing CORS middleware or misconfigured
  Fix     → app.use(cors()) is enabled in server/index.js
```

### **Debugging Tips**

```
FRONTEND Debugging
  1. Open DevTools Console (F12)
  2. Check Network tab → inspect GET request
  3. Look for response status (200, 404, 401, 500)
  4. View Response JSON for server error messages
  5. Use console.log(response.data) to inspect data

BACKEND Debugging
  1. Watch server terminal output (nodemon logs)
  2. Check console.log() messages in controllers
  3. Verify authMiddleware logs token verification
  4. Inspect MongoDB queries: db.employees.findOne({...})

DATABASE Debugging
  1. Open MongoDB Compass or mongosh shell
  2. Query collections: db.employees.find({_id: ObjectId("...")})
  3. Verify document structure & references
  4. Check if userId & department fields are populated
```

---

## 6. Technology Justification

| Component | Technology | Why |
|-----------|-----------|-----|
| Frontend UI | React | Component-based, large ecosystem, hooks for state management |
| Styling | Tailwind CSS | Utility-first, responsive design, faster development |
| Build Tool | Vite | Lightning-fast HMR, modern ES modules, optimized builds |
| Routing | React Router DOM v7 | Industry standard for SPA routing, nested routes |
| HTTP Client | Axios | Promise-based, interceptors, automatic JSON transform |
| Data Tables | react-data-table-component | Sortable, filterable, responsive tables out-of-box |
| Backend | Express.js | Lightweight, flexible, large middleware ecosystem |
| Database | MongoDB | Flexible schema, JSON-like documents, Mongoose ORM integration |
| Authentication | JWT + bcrypt | Stateless, scalable, industry standard for REST APIs |
| Database Access | Mongoose | Schema validation, population (joins), hooks, middleware |
| Dev Server Auto-Reload | nodemon | Faster development cycle, watches file changes |

---

## 7. Deployment Architecture (Future)

```
DEVELOPMENT
  Client (localhost:5175) ◄──► Server (localhost:5000) ◄──► MongoDB (localhost:27017)

PRODUCTION (Example)
  ┌──────────────────────────────────────────────┐
  │         Vercel / Netlify (Frontend)          │
  │  (Hosts built React app, serves dist/)      │
  │  https://myapp.vercel.app                   │
  └──────────────────────────────────────────────┘
           ▲
           │ API calls
           ▼
  ┌──────────────────────────────────────────────┐
  │      Railway / Heroku / AWS (Backend)        │
  │  (Node.js server running Express)            │
  │  https://api.myapp.com                       │
  └──────────────────────────────────────────────┘
           ▲
           │ Mongoose queries
           ▼
  ┌──────────────────────────────────────────────┐
  │   MongoDB Atlas (Cloud MongoDB)              │
  │  mongodb+srv://user:pass@cluster.mongodb.net │
  └──────────────────────────────────────────────┘
```

---

## Summary

This Employee Management System follows a **three-tier architecture** (Frontend → Backend → Database) with:
- **Modern frontend stack**: React + Vite + Tailwind for fast, responsive UX
- **Secure authentication**: JWT tokens + bcrypt password hashing
- **RESTful API**: Express.js with role-based access control
- **NoSQL database**: MongoDB with Mongoose ODM for flexible schema
- **Real-time development**: Hot module replacement (HMR), auto-reload

The system demonstrates **full-stack development** best practices including error handling, authorization, data validation, and separation of concerns.
