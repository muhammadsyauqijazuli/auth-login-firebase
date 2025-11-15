# Manual Testing Log - Authentication System

## Test Session Information
- **Date:** November 15, 2025
- **Tester:** Muhammad Syauqi Jazuli
- **Environment:** Development (localhost:3000)
- **Browser:** Chrome/Edge

---

## 🔵 1. Testing Fitur Login

### 1.1 Email & Password Login

| Test Case | Input | Expected Result | Status | Notes |
|-----------|-------|----------------|--------|-------|
| Valid login | email: test@example.com, password: Test123! | Redirect to dashboard | ⏳ PENDING | |
| Invalid email | email: notexist@example.com | Error: "Email atau password salah" | ⏳ PENDING | |
| Wrong password | password: wrongpass | Error: "Email atau password salah" | ⏳ PENDING | |
| Empty fields | email: "", password: "" | Validation errors shown | ⏳ PENDING | |
| Invalid email format | email: "notanemail" | Error: "Format email tidak valid" | ⏳ PENDING | |

### 1.2 Google Login

| Test Case | Expected Result | Status | Notes |
|-----------|----------------|--------|-------|
| Google popup login | Popup opens, user selects account | ⏳ PENDING | |
| Google redirect fallback | Redirect if popup blocked | ⏳ PENDING | |
| Cancel Google login | Error handled gracefully | ⏳ PENDING | |
| Auto-verified email | emailVerified = true | ⏳ PENDING | |

### 1.3 Reset Password

| Test Case | Expected Result | Status | Notes |
|-----------|----------------|--------|-------|
| Request reset (valid email) | Success message + email sent | ⏳ PENDING | |
| Request reset (invalid email) | No error exposed (security) | ⏳ PENDING | |
| Email validation | Button disabled if invalid | ⏳ PENDING | |
| Click reset link | Firebase password reset page | ⏳ PENDING | |
| Login with new password | Login successful | ⏳ PENDING | |

### 1.4 Logout

| Test Case | Expected Result | Status | Notes |
|-----------|----------------|--------|-------|
| Logout from dashboard | Redirect to /login | ⏳ PENDING | |
| Access dashboard after logout | Redirect to /login | ⏳ PENDING | |
| Session cleared | No auth state in localStorage | ⏳ PENDING | |

---

## 🔴 2. Testing Error Handling

### 2.1 Login/Logout Errors

| Test Case | Simulation Method | Expected Result | Status | Notes |
|-----------|------------------|----------------|--------|-------|
| Network error | Disable internet | Error: "Tidak ada koneksi internet" | ⏳ PENDING | |
| Firebase error | Invalid API key | Friendly error message | ⏳ PENDING | |
| Rate limit | Multiple requests | Error: "Terlalu banyak percobaan" | ⏳ PENDING | |

### 2.2 Validation Errors

| Field | Invalid Input | Expected Error | Status |
|-------|--------------|----------------|--------|
| Email | "" | "Email harus diisi" | ⏳ PENDING |
| Email | "notvalid" | "Format email tidak valid" | ⏳ PENDING |
| Password | "" | "Password harus diisi" | ⏳ PENDING |
| Password | "123" | "Password minimal 6 karakter" | ⏳ PENDING |
| Confirm Password | Mismatch | "Password tidak cocok" | ⏳ PENDING |

---

## 🟤 3. Testing Keamanan

### 3.1 Email Verification

| Test Case | Expected Result | Status | Notes |
|-----------|----------------|--------|-------|
| Register new user | Verification email sent | ⏳ PENDING | |
| Access dashboard (unverified) | Redirect to /verify-email | ⏳ PENDING | |
| Resend verification | New email sent | ⏳ PENDING | |
| Resend rate limit | Error after multiple resends | ⏳ PENDING | |
| Reload verification status | Check if verified, redirect if true | ⏳ PENDING | |

### 3.2 Firestore Security Rules

| Test Case | Method | Expected Result | Status | Notes |
|-----------|--------|----------------|--------|-------|
| Read own notes | Query notes with uid match | ✅ ALLOWED | ⏳ PENDING | |
| Read other's notes | Query notes with different uid | ❌ DENIED | ⏳ PENDING | |
| Write with correct uid | Create note with auth.uid | ✅ ALLOWED | ⏳ PENDING | |
| Write with wrong uid | Create note with different uid | ❌ DENIED | ⏳ PENDING | |
| Unauthenticated read | No auth | ❌ DENIED | ⏳ PENDING | |

**Test in Firestore Rules Playground:**
```javascript
// Test 1: Read own data
match /notes/{noteId} {
  allow read: if request.auth.uid == resource.data.uid;
}
// Auth: user1@example.com
// Read: /notes/note123 (uid: user1_uid)
// Expected: ✅ ALLOWED

// Test 2: Read other's data
// Auth: user1@example.com
// Read: /notes/note456 (uid: user2_uid)
// Expected: ❌ PERMISSION DENIED
```

### 3.3 Input Validation

| Test Case | Input | Expected Result | Status |
|-----------|-------|----------------|--------|
| XSS attempt | `<script>alert('xss')</script>` | Sanitized/escaped | ⏳ PENDING |
| SQL injection | `'; DROP TABLE users; --` | Firestore handles safely | ⏳ PENDING |
| Long note text | 501+ characters | Blocked by maxLength | ⏳ PENDING |
| Special characters | Unicode, emoji | Stored correctly | ⏳ PENDING |

---

## 💜 4. Testing Frontend

### 4.1 Form UI/UX

| Test Case | Expected Result | Status | Notes |
|-----------|----------------|--------|-------|
| Password strength indicator | Changes color weak→medium→strong | ⏳ PENDING | |
| Per-field error messages | Show below each field | ⏳ PENDING | |
| Error fade-in animation | Smooth animation | ⏳ PENDING | |
| Button disabled when loading | Cannot double-submit | ⏳ PENDING | |
| Loading spinner | Shows during async operations | ⏳ PENDING | |
| Character counter | Shows X/500, orange at 90% | ⏳ PENDING | |
| Delete confirmation | window.confirm before delete | ⏳ PENDING | |

### 4.2 Auth State Management

| Test Case | Expected Result | Status | Notes |
|-----------|----------------|--------|-------|
| Refresh page (logged in) | Stay logged in | ⏳ PENDING | |
| Refresh page (logged out) | Stay logged out | ⏳ PENDING | |
| Browser restart | Session persists | ⏳ PENDING | |
| Auto-redirect (logged in → /login) | Redirect to /dashboard | ⏳ PENDING | |
| Auto-redirect (logged out → /dashboard) | Redirect to /login | ⏳ PENDING | |

### 4.3 Animations

| Element | Animation | Expected Behavior | Status |
|---------|-----------|------------------|--------|
| Auth cards | slide-up on load | Smooth 0.5s animation | ⏳ PENDING |
| Form headers | fade-in | Opacity 0→1 | ⏳ PENDING |
| Dashboard stats | stagger animation | Delays 0.1s-0.4s | ⏳ PENDING |
| Notes list | scale-in stagger | Each note animates | ⏳ PENDING |
| Hover effects | scale + shadow | Cards lift on hover | ⏳ PENDING |
| Error messages | fade-in | Smooth appearance | ⏳ PENDING |

---

## 💜 5. Testing Backend

### 5.1 Firebase Auth Configuration

| Item | Check | Status | Notes |
|------|-------|--------|-------|
| Email/Password enabled | Auth settings | ⏳ PENDING | |
| Google provider enabled | OAuth configured | ⏳ PENDING | |
| Authorized domains | localhost, vercel added | ⏳ PENDING | |
| API keys valid | .env.local configured | ⏳ PENDING | |
| COOP/COEP headers | next.config.ts, middleware | ⏳ PENDING | |

### 5.2 Firestore Database

| Item | Check | Status | Notes |
|------|-------|--------|-------|
| Database created | Firestore mode | ⏳ PENDING | |
| Collections structure | /notes collection | ⏳ PENDING | |
| Security rules deployed | Rules tab | ⏳ PENDING | |
| Indexes created | Automatic/composite | ⏳ PENDING | |

---

## 📋 Test Execution Checklist

### Prerequisites
- [ ] Firebase project created
- [ ] Environment variables set (.env.local)
- [ ] Dev server running (npm run dev)
- [ ] Firebase Auth enabled (Email + Google)
- [ ] Firestore created with security rules

### Manual Test Flow
1. [ ] Register new account (email/password)
2. [ ] Check verification email received
3. [ ] Try access dashboard (should redirect to /verify-email)
4. [ ] Verify email via link
5. [ ] Reload and access dashboard
6. [ ] Test CRUD operations on notes
7. [ ] Test character limit (500)
8. [ ] Test delete confirmation
9. [ ] Logout
10. [ ] Login with same credentials
11. [ ] Test Google login
12. [ ] Test reset password flow
13. [ ] Test error cases (invalid inputs)
14. [ ] Test Firestore security rules in console
15. [ ] Test animations and UX
16. [ ] Test on mobile responsive
17. [ ] Test in different browsers

---

## 🐛 Known Issues / Bugs Found

| Issue # | Description | Severity | Status | Notes |
|---------|-------------|----------|--------|-------|
| - | - | - | - | - |

---

## ✅ Test Summary

**Total Tests:** 0/80
- ✅ Passed: 0
- ❌ Failed: 0
- ⏳ Pending: 80
- ⚠️ Warnings: 0

**Overall Status:** ⏳ NOT STARTED

---

## 📝 Testing Notes

### Environment Setup
- Development server: `npm run dev`
- Firebase project: [PROJECT_ID]
- Test accounts: 
  - test@example.com / Test123!
  - test2@example.com / Test123!

### Next Steps
1. Complete manual testing checklist
2. Document all test results
3. Fix any failed tests
4. Re-test failed cases
5. Deploy to production

---

**Testing Started:** [DATE]
**Testing Completed:** [DATE]
**Tested By:** Muhammad Syauqi Jazuli
