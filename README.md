# roast

AI code reviewer that roasts your code with humor and honesty.

[![npm version](https://badge.fury.io/js/@muin%2Froast.svg)](https://www.npmjs.com/package/@muin/roast)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/muinmomin/roast.svg?style=social)](https://github.com/muinmomin/roast)

## What is this?

`roast` is a CLI tool that uses Claude to review your code and deliver feedback that's accurate, funny, and useful. Think Gordon Ramsay meets your senior developer.

## Why use this?

**Before:**
```
You: "Is this code good?"
Brain: "Probably fine..."
*ships to production*
*everything breaks*
```

**After:**
```bash
$ roast bubble-sort.js
```
```
🔥 Oh boy, bubble sort in 2026? What's next, a floppy disk driver?

🔥 This function mutates the input array. That's like borrowing 
someone's car and returning it as a motorcycle.

💡 Use Array.prototype.toSorted() if you're on Node 20+
```

**Real problems:**
- Code reviews take days
- Teammates are too nice to be honest
- You're working solo with no feedback
- CI catches bugs after you commit
- Writing tests doesn't catch design issues

`roast` gives you instant, brutally honest feedback before you commit. Use roast mode for your own code, serious mode for team reviews.

## Installation

```bash
npm install -g @muin/roast
```

Or run without installing:
```bash
npx @muin/roast your-file.js
```

## Setup

Get your Anthropic API key at [console.anthropic.com](https://console.anthropic.com/settings/keys)

```bash
export ANTHROPIC_API_KEY="your-key-here"
```

Add to `~/.bashrc` or `~/.zshrc` to make it permanent.

## Usage

### Roast mode (default)
```bash
roast src/app.js
```

Output:
```
🔥 CODE ROAST 🔥
Victim: bubble-sort.js (JavaScript)
──────────────────────────────────────────────────

🔥 Oh boy, bubble sort in 2026? What's next, a floppy disk driver?

🔥 This function mutates the input array. That's like borrowing 
someone's car and returning it as a motorcycle.

💡 Use Array.prototype.toSorted() if you're on Node 20+, or 
at least clone the array first: const sorted = [...arr]

🔥 No input validation. Passing a string? Enjoy your runtime error.

✨ At least you got the algorithm right. It's bad, but it's 
correctly bad.

──────────────────────────────────────────────────
Roasted with ❤️  by Claude
```

### Serious mode
```bash
roast --serious src/app.js
```

Output:
```
📋 Professional Code Review
File: api-handler.js (JavaScript)
──────────────────────────────────────────────────

🚨 No input sanitization on user data - SQL injection risk

⚠️  Synchronous file operations will block the event loop

💡 Consider using async/await with fs.promises

✅ Good error handling structure

──────────────────────────────────────────────────
```

### Custom model
```bash
roast --model claude-opus-4 src/app.js
```

## Supported Languages

JavaScript, TypeScript, Python, Go, Rust, Java, C, C++, Ruby, PHP, Swift, Kotlin, Shell, SQL, HTML, CSS

## Options

```
-s, --serious              Professional review mode (no humor)
--severity <level>         Roast severity: mild, medium, harsh (default: medium)
-m, --model <model>        AI model to use (default: claude-sonnet-4-5)
--no-color                 Disable colors
-V, --version              Output version
-h, --help                 Display help
```

### Severity Levels

**Mild** (😊 Be Nice Mode): Friendly, encouraging feedback. Perfect for beginners or when you want constructive criticism with a supportive tone.
```bash
roast --severity mild src/app.js
```

**Medium** (🔥 Default): Balanced mix of humor and criticism. Sarcastic but helpful, like a senior dev at code review.
```bash
roast src/app.js
# or explicitly:
roast --severity medium src/app.js
```

**Harsh** (💀 No Mercy): Brutally honest, savage roasts. Only use this if you can handle the truth. Gordon Ramsay mode.
```bash
roast --severity harsh src/app.js
```

## Examples

### Example 1: Quick file roast

```bash
$ roast src/utils/array-helpers.js

🔥 CODE ROAST 🔥
Victim: array-helpers.js (JavaScript)
──────────────────────────────────────────────────

🔥 You wrote a custom array flatten function? Array.flat() 
has been in JavaScript since 2019. ES2019 is not "too new."

🔥 uniqueArray uses indexOf in a loop - O(n²) complexity.
Set([...arr]) is O(n) and already built in.

💡 Half these functions are one-liners with modern JS:
   flatten: arr.flat()
   unique: [...new Set(arr)]
   last: arr.at(-1)

✨ At least they work correctly. But you've essentially 
reinvented lodash, poorly.

──────────────────────────────────────────────────
```

### Example 2: Serious mode for team PR review

```bash
$ roast --serious src/api/auth.ts

📋 Professional Code Review
File: auth.ts (TypeScript)
──────────────────────────────────────────────────

🚨 Password comparison using === instead of timing-safe compare
   Risk: Timing attacks could leak password information

⚠️  JWT secret loaded from process.env without fallback check
   Will crash on startup if JWTOSECRET is not set

💡 Consider using express-validator for input sanitization

✅ Good: Proper async/await usage throughout
✅ Good: TypeScript types are well-defined

⚠️  Token expiration set to 30 days - consider shorter duration
   for sensitive operations

──────────────────────────────────────────────────
```

### Example 3: Review from stdin (pipe or paste)

```bash
$ cat suspicious-code.py | roast

🔥 CODE ROAST 🔥
Victim: stdin (Python)
──────────────────────────────────────────────────

🔥 eval() on user input? That's not a security vulnerability,
that's a welcome mat for hackers.

🔥 Bare except: catches everything including KeyboardInterrupt.
You can't even Ctrl+C out of this disaster.

🔥 Global variables modified inside functions with no documentation.
Reading this code is like a mystery novel where the butler did it,
but also the gardener, and maybe the protagonist.

💡 Use ast.literal_eval() for safe evaluation, or better yet,
json.loads() if you're parsing data.

──────────────────────────────────────────────────
```

### Example 4: Git diff review before commit

```bash
$ git diff src/payment-processor.js | roast --serious

📋 Professional Code Review
──────────────────────────────────────────────────

🚨 Changed error handling to swallow exceptions silently
   Original code logged errors, new code hides them

⚠️  Removed input validation for transaction amount
   Could now process negative or NaN values

🚨 API timeout increased from 5s to 60s
   May cause cascading failures under load

Recommendation: These changes reduce system reliability.
Suggest reverting the exception handling changes.

──────────────────────────────────────────────────
```

### Example 5: Custom model for complex code

```bash
$ roast --model claude-opus-4 src/distributed-lock.go

🔥 CODE ROAST 🔥
Victim: distributed-lock.go (Go)
──────────────────────────────────────────────────

🔥 Your distributed lock implementation has a race condition
between checking and acquiring. Classic "check-then-act" bug.

🔥 Lock timeout is hardcoded to 10 seconds. Production load
spikes will turn this into a deadlock factory.

💡 Redis SETNX is atomic - use it directly instead of GET + SET.
Or better yet, use Redlock algorithm for multi-node safety.

🔥 Panic on Redis connection error. In distributed systems,
network failures are features, not exceptions.

✨ Good use of context for cancellation. That's the one part
that won't cause a 3 AM page.

──────────────────────────────────────────────────
```

## Real-World Scenarios

### Pre-commit sanity check
```bash
# About to commit that refactor you've been working on
$ git diff HEAD src/auth.js | roast

🔥 You're exporting the private key in plaintext? Bold strategy.

🔥 This regex will match "admin@evil.com" as a valid admin email.
Better tighten that up unless you're running a very open company.

💡 hash.compare() is async but you're not awaiting it. This will
always return true. Always. Every time. 100% authentication success rate!

# ...okay maybe I should test this first
```

### Reviewing that "quick fix" from 2am
```bash
$ roast src/hotfix-do-not-touch.js

🔥 File name is literally "do-not-touch.js" - that's a red flag
wrapped in another red flag

🔥 You're catching errors and logging "it broke lol". When production
is on fire, your logs will just say "it broke lol" repeated 50,000 times.

🔥 This setTimeout is set to 86400000ms. That's 24 hours. Hope nobody's
waiting for this response.

✨ The actual logic is... fine? But please, for the love of debugging,
add better error messages.
```

### Checking tutorial code before copy-paste
```bash
$ curl -s https://example.com/tutorial.js | roast

🔥 This tutorial is using var in 2026. It was written during the
Mesozoic Era and hasn't been updated since.

⚠️  jQuery is loaded from an HTTP URL. That's a mixed content warning
waiting to happen.

💡 Modern replacement using fetch() would be 10 lines and zero
dependencies. Just saying.
```

### The "I learned this yesterday" review
```bash
# Just picked up Rust, wrote first program
$ roast hello.rs --serious

📋 Professional Code Review
──────────────────────────────────────────────────

✅ Proper error handling with Result type

⚠️  .unwrap() on line 8 will panic on error. Consider using
    expect() with a meaningful message, or propagate with ?

💡 String ownership is correct, but you're cloning unnecessarily
   on line 12. Use a reference: &user_name

✅ Good use of match for control flow

Overall: Solid first program. Remove the unwrap() and you're good to go.
```

### Legacy code archaeology
```bash
$ roast legacy/customer-import-final-v3-NEW-USE-THIS.php

🔥 Based on the filename, this has been "final" at least 3 times.
That's not a good sign.

🔥 mysql_connect() was deprecated in PHP 5.5 (2013) and removed in
PHP 7 (2015). This code is old enough to vote.

🔥 SQL query is concatenating user input directly. This is how
Little Bobby Tables drops your database.

🔥 No password hashing - passwords stored in plaintext. In the
event of a breach, this is "directly to jail, do not pass go" territory.

💡 Complete rewrite recommended. Start fresh with PDO and password_hash().
This is beyond roasting, this needs a Viking funeral.
```

### Team code style check
```bash
# Check if the new junior's code matches your style
$ roast --serious src/components/UserCard.jsx

📋 Professional Code Review
──────────────────────────────────────────────────

⚠️  Component is 450 lines long. Consider splitting into smaller pieces.

⚠️  Inline styles instead of CSS modules/styled-components

💡 Three useState hooks could be combined into useReducer

✅ Proper PropTypes definitions

✅ Good accessibility attributes (aria-labels, roles)

⚠️  useEffect missing dependency 'userId' - will cause stale closures

Recommendation: Works, but needs refactoring before it grows larger.
```

### Example 8: Database query optimization check

```bash
$ roast src/queries.js

🔥 CODE ROAST 🔥
Victim: queries.js (JavaScript)
──────────────────────────────────────────────────

🔥 You're fetching the entire users table with SELECT * and THEN 
filtering in JavaScript. Congratulations, you've reinvented the 
world's worst database.

🔥 N+1 query problem in getUserPosts(). You're making 1 query for 
users, then 1 query per user for posts. For 100 users that's 101 
queries. Your database called, it wants a divorce.

💡 Use JOIN:
   SELECT users.*, posts.* FROM users 
   LEFT JOIN posts ON users.id = posts.user_id

🔥 No connection pooling. Every request opens a new connection. 
You're treating database connections like disposable coffee cups.

💡 Use a connection pool:
   const pool = mysql.createPool({ ... });

✨ At least you're using prepared statements. That's the only thing 
standing between you and a SQL injection disaster.

──────────────────────────────────────────────────
```

---

### Example 9: TypeScript migration review

```bash
$ roast --serious src/legacy-migrated.ts

📋 Professional Code Review
File: legacy-migrated.ts (TypeScript)
──────────────────────────────────────────────────

⚠️  80% of types are 'any' - defeats the purpose of TypeScript
    Found: function processData(data: any, config: any): any

🚨 Type assertion 'as any' used 47 times throughout the file
   This is TypeScript surrender, not TypeScript migration

⚠️  @ts-ignore comments covering actual type errors
   Line 23: @ts-ignore
   Line 45: @ts-ignore  
   Line 67: @ts-ignore

💡 Gradual migration approach:
   1. Start with proper interface definitions
   2. Replace 'any' one function at a time
   3. Remove @ts-ignore, fix the actual issues
   4. Enable strict mode: "strict": true in tsconfig.json

✅ Good: Converted var to const/let consistently
✅ Good: Removed jQuery dependencies

Current grade: D+ (compiles but doesn't provide type safety)
Recommended: Dedicate sprint to proper typing before adding features

──────────────────────────────────────────────────
```

---

### Example 10: Performance bottleneck detection

```bash
$ roast --severity harsh performance/data-processor.py

🔥 CODE ROAST 🔥
Victim: data-processor.py (Python)
Severity: 💀 NO MERCY MODE
──────────────────────────────────────────────────

💀 Nested loops with O(n³) complexity processing a 10,000 item list.
Your runtime complexity is "heat death of the universe."

💀 You're reading the same CSV file 500 times inside a loop. I've 
seen people use AWS more efficiently than this, and I've seen people 
mine Bitcoin on Raspberry Pis.

💀 Loading entire 2GB JSON file into memory with json.load(). 
You're one large file away from an OOMKiller visit.

💡 Use streaming JSON parser:
   import ijson
   for item in ijson.items(file, 'item'):
       process(item)

💀 Pandas DataFrame.iterrows() in production code. Did you even 
read the Pandas docs? They literally beg you not to do this.

💡 Use vectorized operations:
   df['result'] = df['col1'] * df['col2']  # 1000x faster

💀 No caching, no memoization, no optimization whatsoever. You're 
recalculating the same Fibonacci sequence 50,000 times.

💡 Add @lru_cache decorator:
   from functools import lru_cache
   @lru_cache(maxsize=128)
   def expensive_calc(n): ...

The good news: This code works.
The bad news: It'll work sometime next Tuesday.

──────────────────────────────────────────────────
```

---

## Framework Integration Examples

### React Component Review (Pre-PR Workflow)

```bash
# Review component before creating PR
$ roast src/components/UserProfile.tsx

🔥 CODE ROAST 🔥
Victim: UserProfile.tsx (TypeScript)
──────────────────────────────────────────────────

🔥 useEffect with no dependency array. Congratulations, you've created
an infinite render loop waiting to happen.

💡 Add dependencies or use useMemo:
   useEffect(() => { fetchUser() }, [userId])

🔥 Inline styles in JSX for every single div. CSS-in-JS libraries
exist for a reason. Your bundle size is crying.

💡 Extract to styled-components or CSS modules:
   const Container = styled.div`margin: 20px;`

✅ Props are properly typed with TypeScript interfaces

⚠️  No error boundary. When this component crashes, it'll take
    the whole app down with it.

💡 Wrap in ErrorBoundary:
   <ErrorBoundary fallback={<ErrorUI />}>
     <UserProfile />
   </ErrorBoundary>

──────────────────────────────────────────────────
```

---

### Next.js API Route Security Check

```bash
$ roast pages/api/users/[id].ts --serious

📋 Professional Code Review
File: pages/api/users/[id].ts (TypeScript)
──────────────────────────────────────────────────

🚨 No authentication middleware - API route is publicly accessible
   Anyone can call /api/users/123 and get user data

💡 Add auth check:
   export default async function handler(req, res) {
     const session = await getServerSession(req, res, authOptions)
     if (!session) return res.status(401).json({ error: 'Unauthorized' })
     // ... rest of handler
   }

🚨 Direct database query with user input - SQL injection risk
   const user = await db.query(`SELECT * FROM users WHERE id = ${req.query.id}`)

💡 Use parameterized queries:
   const user = await db.query('SELECT * FROM users WHERE id = $1', [req.query.id])

⚠️  No rate limiting - vulnerable to abuse

💡 Add rate limiting with next-rate-limit:
   import rateLimit from 'next-rate-limit'
   const limiter = rateLimit({ interval: 60000, uniqueTokenPerInterval: 500 })

✅ Good: Proper TypeScript types for request/response

──────────────────────────────────────────────────
```

---

### Express.js Middleware Chain Review

```bash
$ roast src/middleware/auth.js

🔥 CODE ROAST 🔥
Victim: auth.js (JavaScript)
──────────────────────────────────────────────────

🔥 You're calling next() inside a try block and also in the catch.
One error and the middleware chain gets called twice. Brilliant.

💡 Fix:
   try {
     // ... auth logic
     next()
   } catch (err) {
     res.status(401).json({ error: err.message })
     // Don't call next() here!
   }

🔥 jwt.verify() but you're not checking token expiration separately.
Expired tokens = valid tokens in your world.

💡 Check exp claim:
   const decoded = jwt.verify(token, secret)
   if (decoded.exp * 1000 < Date.now()) {
     throw new Error('Token expired')
   }

🔥 Setting req.user but never checking if it exists in other middleware.
Runtime errors incoming.

──────────────────────────────────────────────────
```

---

### Vue 3 Composition API Review

```bash
$ roast src/composables/useAuth.ts --severity mild

😊 CODE ROAST 🔥
Victim: useAuth.ts (TypeScript)
Severity: Mild
──────────────────────────────────────────────────

😊 Good use of composables pattern! Separating auth logic makes sense.

⚠️  You're using ref() for complex objects. Consider reactive() instead:
   // Instead of: const user = ref({ name: '', email: '' })
   const user = reactive({ name: '', email: '' })

💡 Token stored in ref but not persisted. Add localStorage:
   const token = ref(localStorage.getItem('token'))
   watch(token, (newToken) => {
     if (newToken) localStorage.setItem('token', newToken)
   })

😊 Login function handles errors well with try/catch

💡 Consider adding auto-refresh logic:
   let refreshTimeout: NodeJS.Timeout
   watch(token, (newToken) => {
     if (newToken) {
       const decoded = jwtDecode(newToken)
       const expiresIn = decoded.exp * 1000 - Date.now() - 60000 // 1 min before expiry
       refreshTimeout = setTimeout(refreshToken, expiresIn)
     }
   })

──────────────────────────────────────────────────
```

---

### FastAPI Python Backend Review

```bash
$ roast app/routers/users.py --serious

📋 Professional Code Review
File: users.py (Python)
──────────────────────────────────────────────────

🚨 No input validation on email field - accepts any string
   email: str  # Will accept "notanemail" as valid

💡 Use Pydantic EmailStr:
   from pydantic import EmailStr
   class UserCreate(BaseModel):
       email: EmailStr  # Validates email format

⚠️  Password length not enforced - users can set "123" as password

💡 Add Pydantic validator:
   from pydantic import validator, Field
   password: str = Field(min_length=8)
   
   @validator('password')
   def validate_password(cls, v):
       if not any(c.isupper() for c in v):
           raise ValueError('Must contain uppercase')
       return v

🚨 No pagination on /users endpoint - will return entire table
   @app.get("/users")  # Returns all users!

💡 Add pagination:
   @app.get("/users")
   async def list_users(skip: int = 0, limit: int = 100):
       return db.query(User).offset(skip).limit(limit).all()

✅ Good: Using Pydantic models for request/response validation
✅ Good: Async/await for database queries

──────────────────────────────────────────────────
```

---

### Django Views Security Audit

```bash
$ roast views.py --severity harsh

🔥 CODE ROAST 🔥
Victim: views.py (Python)
Severity: 💀 NO MERCY
──────────────────────────────────────────────────

💀 You imported User with from .models import * - A guaranteed way to
have no idea what's in scope. Hope you enjoy debugging mystery bugs.

💀 Raw SQL with string formatting. This is a SQL injection tutorial.
   cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")

💡 Use Django ORM or parameterized queries:
   User.objects.get(id=user_id)  # ORM (safe)
   # Or:
   cursor.execute("SELECT * FROM users WHERE id = %s", [user_id])

💀 @login_required decorator missing on sensitive views. Your "admin only"
endpoints are accessible to anyone with a browser.

💀 No CSRF protection on POST endpoints. Every form submission is a
phishing opportunity.

💡 Add CSRF middleware and use {% csrf_token %} in templates

💀 Returning user passwords in API responses. Even hashed passwords
shouldn't be exposed. This is privacy 101.

💡 Exclude password from serializer:
   class UserSerializer(serializers.ModelSerializer):
       class Meta:
           model = User
           exclude = ['password']

The good news: Django is a good framework.
The bad news: You're not using any of its security features.

──────────────────────────────────────────────────
```

---

### Vue 3 Composition API Review

```bash
$ roast src/components/UserProfile.vue --serious

📋 Professional Code Review
File: UserProfile.vue (TypeScript)
──────────────────────────────────────────────────

⚠️  Using reactive() for an array - should use ref() instead
   const users = reactive([])  // Will lose reactivity on reassignment

💡 Fix:
   const users = ref([])
   // Access with users.value

🚨 watch() without cleanup in onUnmounted - memory leak risk
   watch(userId, async (newId) => {
     const interval = setInterval(fetchUser, 5000)
     // Never cleared!
   })

💡 Add cleanup:
   let interval = null
   watch(userId, async (newId) => {
     if (interval) clearInterval(interval)
     interval = setInterval(fetchUser, 5000)
   })
   onUnmounted(() => clearInterval(interval))

⚠️  Computed property making API calls - should be in watchEffect
   const userData = computed(() => {
     fetch(`/api/users/${userId.value}`)  // Computed should be synchronous
   })

💡 Use watchEffect instead:
   const userData = ref(null)
   watchEffect(async () => {
     userData.value = await fetch(`/api/users/${userId.value}`)
   })

✅ Good: Proper use of <script setup> syntax
✅ Good: TypeScript interfaces defined for props

⚠️  v-for without :key on dynamic list
   <div v-for="user in users">  // Missing key

💡 Always add :key:
   <div v-for="user in users" :key="user.id">

──────────────────────────────────────────────────
```

---

### Vue 3 State Management Review (Pinia)

```bash
$ roast stores/user.ts

🔥 CODE ROAST 🔥
Victim: user.ts (TypeScript)
──────────────────────────────────────────────────

🔥 Mutating state directly in components instead of using actions.
You have a state management library. Use it!

💡 Instead of:
   // In component
   const store = useUserStore()
   store.user.name = 'John'  // Direct mutation

   Use actions:
   // In store
   actions: {
     updateUserName(name: string) {
       this.user.name = name
     }
   }

🔥 Async state updates without loading/error states. When the API is
slow, your users stare at stale data wondering if it broke.

💡 Add loading states:
   state: () => ({
     user: null,
     loading: false,
     error: null
   }),
   actions: {
     async fetchUser(id: number) {
       this.loading = true
       this.error = null
       try {
         this.user = await api.getUser(id)
       } catch (e) {
         this.error = e.message
       } finally {
         this.loading = false
       }
     }
   }

🔥 No state persistence. Refresh the page and boom, everything's gone.
Your users will love logging in 50 times a day.

💡 Use pinia-plugin-persistedstate:
   import { createPinia } from 'pinia'
   import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
   
   const pinia = createPinia()
   pinia.use(piniaPluginPersistedstate)

✨ Good use of getters for computed state

──────────────────────────────────────────────────
```

---

### Angular Component Review

```bash
$ roast user-list.component.ts --serious

📋 Professional Code Review
File: user-list.component.ts (TypeScript)
──────────────────────────────────────────────────

🚨 Subscriptions not unsubscribed - memory leak on every route change
   ngOnInit() {
     this.userService.getUsers().subscribe(users => {
       this.users = users
     })
     // Subscription never cleaned up!
   }

💡 Fix with takeUntilDestroyed (Angular 16+):
   private destroy$ = new Subject<void>()
   
   ngOnInit() {
     this.userService.getUsers()
       .pipe(takeUntil(this.destroy$))
       .subscribe(users => this.users = users)
   }
   
   ngOnDestroy() {
     this.destroy$.next()
     this.destroy$.complete()
   }

   Or use async pipe (better):
   users$ = this.userService.getUsers()
   // Template: <div *ngFor="let user of users$ | async">

🚨 No error handling on HTTP requests
   this.http.get('/api/users').subscribe(data => {
     this.users = data
     // What if this fails?
   })

💡 Add error handler:
   this.http.get('/api/users').subscribe({
     next: (data) => this.users = data,
     error: (err) => {
       this.errorMessage = 'Failed to load users'
       console.error(err)
     }
   })

⚠️  ChangeDetectionStrategy.Default - unnecessary change detection cycles
   @Component({
     // Missing changeDetection
   })

💡 Use OnPush for better performance:
   @Component({
     selector: 'app-user-list',
     changeDetection: ChangeDetectionStrategy.OnPush
   })

✅ Good: Dependency injection properly used
✅ Good: Component is focused (single responsibility)

⚠️  Constructor logic - should be in ngOnInit
   constructor(private userService: UserService) {
     this.loadUsers()  // Don't do work in constructor
   }

💡 Move to lifecycle hook:
   ngOnInit() {
     this.loadUsers()
   }

──────────────────────────────────────────────────
```

---

### Angular Service with RxJS Patterns

```bash
$ roast user.service.ts

🔥 CODE ROAST 🔥
Victim: user.service.ts (TypeScript)
──────────────────────────────────────────────────

🔥 Nested subscriptions - classic "callback hell" in RxJS form.
We invented operators to avoid this!

💡 Instead of:
   getUser(id: number) {
     this.http.get(`/users/${id}`).subscribe(user => {
       this.http.get(`/users/${user.managerId}`).subscribe(manager => {
         // Nested nightmare
       })
     })
   }

   Use switchMap:
   getUser(id: number): Observable<User> {
     return this.http.get<User>(`/users/${id}`).pipe(
       switchMap(user => 
         this.http.get<User>(`/users/${user.managerId}`).pipe(
           map(manager => ({ ...user, manager }))
         )
       )
     )
   }

🔥 No caching - hammering the API with duplicate requests.
Your backend engineer is crying.

💡 Add ShareReplay:
   private cache$ = new Map<number, Observable<User>>()
   
   getUser(id: number): Observable<User> {
     if (!this.cache$.has(id)) {
       this.cache$.set(
         id,
         this.http.get<User>(`/users/${id}`).pipe(
           shareReplay({ bufferSize: 1, refCount: true })
         )
       )
     }
     return this.cache$.get(id)!
   }

🔥 Manual error handling instead of using catchError operator.
You're writing the same try-catch 50 times.

💡 Use catchError:
   getUser(id: number): Observable<User> {
     return this.http.get<User>(`/users/${id}`).pipe(
       catchError(err => {
         console.error('User fetch failed:', err)
         return throwError(() => new Error('Failed to load user'))
       })
     )
   }

✨ At least you're using typed observables. That's something.

──────────────────────────────────────────────────
```

---

### Angular Template Optimization Review

```bash
$ roast user-list.component.html --severity mild

😊 CODE ROAST 🔥
Victim: user-list.component.html (HTML)
Severity: Mild
──────────────────────────────────────────────────

😊 Good use of trackBy in *ngFor - performance win!

⚠️  Multiple async pipe subscriptions to same observable
   <div>{{ users$ | async }}</div>
   <div>{{ users$ | async }}</div>  // Two subscriptions!

💡 Store in variable:
   <div *ngIf="users$ | async as users">
     <div>{{ users }}</div>
     <div>{{ users }}</div>
   </div>

💡 Pipes inside *ngFor - recalculated on every change detection
   <div *ngFor="let user of users">
     {{ user.name | uppercase }}  // Fine
     {{ formatDate(user.createdAt) }}  // Function call - bad!
   </div>

💡 Create a pure pipe:
   @Pipe({ name: 'formatDate', pure: true })
   export class FormatDatePipe implements PipeTransform {
     transform(date: Date): string {
       return new Intl.DateTimeFormat().format(date)
     }
   }

😊 Proper null checks with optional chaining - nice!

⚠️  Inline styles instead of CSS classes
   <div [style.color]="user.active ? 'green' : 'red'">

💡 Use CSS classes:
   <div [class.active]="user.active" [class.inactive]="!user.active">
   
   // styles.css
   .active { color: green; }
   .inactive { color: red; }

──────────────────────────────────────────────────
```

---

### Svelte Component Review

```bash
$ roast UserCard.svelte --serious

📋 Professional Code Review
File: UserCard.svelte (JavaScript)
──────────────────────────────────────────────────

🚨 Reactive statement depending on async operation - race condition risk
   $: if (userId) {
     fetch(`/api/users/${userId}`)
       .then(r => r.json())
       .then(data => user = data)
   }

💡 Use proper async handling:
   import { onMount } from 'svelte'
   
   let userPromise
   $: userPromise = userId ? fetch(`/api/users/${userId}`).then(r => r.json()) : null
   
   // Template:
   {#await userPromise}
     Loading...
   {:then user}
     {user.name}
   {:catch error}
     Error: {error.message}
   {/await}

⚠️  Store subscription not unsubscribed - memory leak
   import { userStore } from './stores'
   
   userStore.subscribe(value => {
     currentUser = value
     // Never unsubscribed!
   })

💡 Use $ auto-subscription:
   import { userStore } from './stores'
   
   $: currentUser = $userStore  // Auto cleanup

✅ Good: Props properly typed with TypeScript

⚠️  Direct DOM manipulation instead of binding
   let inputEl
   function focusInput() {
     inputEl.focus()  // Works but not ideal
   }

💡 Use action or bind:
   <script>
     import { onMount } from 'svelte'
     let inputEl
     
     onMount(() => {
       inputEl.focus()
     })
   </script>
   
   <input bind:this={inputEl} />

🚨 Component state not persisted - loses data on navigation
   let formData = { name: '', email: '' }

💡 Use localStorage or a store:
   import { writable } from 'svelte/store'
   import { persisted } from 'svelte-local-storage-store'
   
   const formData = persisted('formData', { name: '', email: '' })

──────────────────────────────────────────────────
```

---

### Svelte Store Patterns Review

```bash
$ roast stores.js

🔥 CODE ROAST 🔥
Victim: stores.js (JavaScript)
──────────────────────────────────────────────────

🔥 Writable store exposed directly - anyone can write to it.
That's not state management, that's state chaos.

💡 Create derived store with controlled updates:
   import { writable, derived } from 'svelte/store'
   
   // Private
   const _users = writable([])
   
   // Public read-only
   export const users = derived(_users, $users => $users)
   
   // Controlled updates
   export const addUser = (user) => {
     _users.update(u => [...u, user])
   }

🔥 Async operations directly in stores without loading state.
Your UI has no idea if it's loading, loaded, or errored.

💡 Add request states:
   function createAsyncStore() {
     const { subscribe, set, update } = writable({
       data: null,
       loading: false,
       error: null
     })
     
     return {
       subscribe,
       fetch: async (id) => {
         update(state => ({ ...state, loading: true, error: null }))
         try {
           const response = await fetch(`/api/users/${id}`)
           const data = await response.json()
           set({ data, loading: false, error: null })
         } catch (error) {
           set({ data: null, loading: false, error: error.message })
         }
       }
     }
   }
   
   export const userStore = createAsyncStore()

🔥 No store persistence - close tab, lose everything.
Hope your users love re-entering form data!

💡 Create persistent store:
   import { writable } from 'svelte/store'
   
   function persistedStore(key, initial) {
     const stored = localStorage.getItem(key)
     const store = writable(stored ? JSON.parse(stored) : initial)
     
     store.subscribe(value => {
       localStorage.setItem(key, JSON.stringify(value))
     })
     
     return store
   }
   
   export const preferences = persistedStore('preferences', {
     theme: 'light',
     language: 'en'
   })

✨ At least you're using stores instead of prop drilling everywhere.

──────────────────────────────────────────────────
```

---

### SvelteKit Route Load Function Review

```bash
$ roast src/routes/users/[id]/+page.ts --serious

📋 Professional Code Review
File: +page.ts (TypeScript)
──────────────────────────────────────────────────

🚨 No error handling in load function - errors bubble to global error page
   export async function load({ params }) {
     const user = await fetch(`/api/users/${params.id}`).then(r => r.json())
     return { user }
   }

💡 Add proper error handling:
   import { error } from '@sveltejs/kit'
   
   export async function load({ params, fetch }) {
     try {
       const response = await fetch(`/api/users/${params.id}`)
       
       if (!response.ok) {
         throw error(response.status, {
           message: 'User not found'
         })
       }
       
       const user = await response.json()
       return { user }
     } catch (err) {
       throw error(500, {
         message: 'Failed to load user'
       })
     }
   }

⚠️  No loading state - users see blank screen during fetch
   
💡 Use streaming with promises:
   export async function load({ params, fetch }) {
     return {
       user: fetch(`/api/users/${params.id}`).then(r => r.json())
     }
   }
   
   // In +page.svelte:
   {#await data.user}
     <Loading />
   {:then user}
     <UserProfile {user} />
   {/await}

✅ Good: Using SvelteKit's fetch for SSR

⚠️  Not using typed load function
   export async function load({ params }) {
     // No types!
   }

💡 Add types:
   import type { PageLoad } from './$types'
   
   export const load: PageLoad = async ({ params, fetch }) => {
     // Type-safe!
   }

──────────────────────────────────────────────────
```

---

## CI/CD Integration

### GitHub Actions Pre-Merge Hook

Add automated roasting to your CI pipeline:

```yaml
# .github/workflows/code-review.yml
name: AI Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  roast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install roast
        run: npm install -g @muin/roast
      
      - name: Get changed files
        id: changed-files
        uses: tj-actions/changed-files@v39
      
      - name: Review changed code
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          echo "## 🔥 AI Code Review" >> $GITHUB_STEP_SUMMARY
          for file in ${{ steps.changed-files.outputs.all_changed_files }}; do
            if [[ "$file" =~ \.(js|ts|py|go|rs)$ ]]; then
              echo "### $file" >> $GITHUB_STEP_SUMMARY
              roast --serious "$file" >> $GITHUB_STEP_SUMMARY || true
              echo "" >> $GITHUB_STEP_SUMMARY
            fi
          done
      
      - name: Comment on PR
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const summary = fs.readFileSync(process.env.GITHUB_STEP_SUMMARY, 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: summary
            });
```

---

### Pre-commit Hook (Local Development)

```bash
# .git/hooks/pre-commit
#!/bin/bash

echo "🔥 Roasting your changes before commit..."

# Get staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(js|ts|py|go|rs)$')

if [ -z "$STAGED_FILES" ]; then
  exit 0
fi

# Roast each file
for file in $STAGED_FILES; do
  echo "Reviewing: $file"
  roast --serious "$file" || {
    echo "❌ Code review found issues. Fix them or commit with --no-verify"
    exit 1
  }
done

echo "✅ Code review passed!"
exit 0
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

---

### VS Code Integration (Task)

```json
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Roast Current File",
      "type": "shell",
      "command": "roast --serious ${file}",
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "problemMatcher": []
    },
    {
      "label": "Roast Changed Files",
      "type": "shell",
      "command": "git diff --name-only | grep -E '\\.(js|ts|py)$' | xargs -I {} roast --serious {}",
      "presentation": {
        "reveal": "always"
      }
    }
  ]
}
```

Use: `Cmd+Shift+P` → "Run Task" → "Roast Current File"

---

## Advanced Usage Patterns

### Team Code Review Workflow

**1. Junior developer submits PR:**
```bash
$ git checkout feature/user-authentication
$ git diff main...HEAD | roast --serious > review.txt
$ cat review.txt
# Fix issues found
$ git add .
$ git commit -m "fix: address code review feedback"
```

**2. Senior developer validates fixes:**
```bash
$ gh pr checkout 123
$ roast --severity mild src/auth/* --no-color | tee pr-review.md
$ gh pr comment --body-file pr-review.md
```

---

### Pair Programming Mode

```bash
# Developer A writes code, Developer B reviews in real-time
$ fswatch -o src/ | xargs -n1 -I{} roast src/index.js

# Every file save triggers a roast
```

---

### Custom Roast Severity Config

```json
// .roastrc.json
{
  "severity": "medium",
  "model": "claude-sonnet-4-5",
  "excludePatterns": [
    "*.test.js",
    "*.spec.ts",
    "dist/*",
    "node_modules/*"
  ],
  "focusAreas": [
    "security",
    "performance",
    "best-practices"
  ],
  "output": {
    "color": true,
    "emoji": true,
    "format": "table"
  }
}
```

Usage:
```bash
$ roast src/app.js  # Uses .roastrc.json config
```

---

### Batch Roasting (Entire Project Audit)

```bash
# Roast all JavaScript files, save to report
$ find src -name "*.js" -type f | while read file; do
    echo "## $file" >> audit-report.md
    roast --serious "$file" --no-color >> audit-report.md
    echo "" >> audit-report.md
  done

# Generate summary
$ echo "# Code Audit Summary" > summary.md
$ grep "🚨" audit-report.md | wc -l | xargs echo "Critical issues:" >> summary.md
$ grep "⚠️" audit-report.md | wc -l | xargs echo "Warnings:" >> summary.md
$ cat summary.md audit-report.md > final-audit.md
```

---

## Tips

- **Share your roasts** - They're designed to be screenshot-friendly
- **Use serious mode for PRs** - Save the humor for your own code
- **Review before committing** - Catch bugs before your CI does
- **Roast legacy code** - Therapeutic and educational
- **Pipe from git diff** - Review only what changed: `git diff | roast`
- **Works with stdin** - `cat sketch.py | roast` or `pbpaste | roast`
- **Integrate with CI/CD** - Automate code reviews in your pipeline
- **Create team standards** - Use roast to enforce coding conventions
- **Custom configs** - Set project-specific roast rules with `.roastrc.json`

## Contributing

Found a bug? Want to add a feature?

```bash
# Clone the repo
git clone https://github.com/muinmomin/roast.git
cd roast

# Install dependencies
npm install

# Test locally
npm link
roast test-file.js

# Run tests (if available)
npm test
```

Pull requests welcome! Please:
- Keep the humor sharp but not mean
- Add tests for new features
- Follow existing code style
- Update README if adding options

## License

MIT

## Credits

Built with:
- [Anthropic Claude](https://anthropic.com) - The AI doing the roasting
- [Commander.js](https://github.com/tj/commander.js) - CLI framework
- [Chalk](https://github.com/chalk/chalk) - Terminal colors

---

Made by [muin](https://github.com/muinmomin)

*Roast responsibly. Don't roast production code in public without permission.*
