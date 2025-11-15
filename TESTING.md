# Testing Guide - Authify System Login

Panduan testing lengkap sesuai dengan diagram testing chart untuk sistem authentication.

## 📋 Testing Checklist

### 1. **Testing - Fitur Login** 🔵

#### 1.1 Email & Password
- [ ] Login dengan email & password valid
- [ ] Login dengan email tidak terdaftar
- [ ] Login dengan password salah
- [ ] Login dengan email format tidak valid
- [ ] Login dengan field kosong
- [ ] Logout setelah login berhasil

#### 1.2 Login dengan Google
- [ ] Login dengan akun Google berhasil
- [ ] Cancel Google popup
- [ ] Google login dengan popup blocked (fallback to redirect)
- [ ] Logout setelah Google login

#### 1.3 Reset Password
- [ ] Request reset password dengan email valid
- [ ] Request reset password dengan email tidak terdaftar
- [ ] Request reset password dengan email invalid
- [ ] Cek email masuk di inbox/spam
- [ ] Klik link reset di email
- [ ] Ubah password baru
- [ ] Login dengan password baru

#### 1.4 Logout
- [ ] Logout dari dashboard
- [ ] Auto redirect ke login page
- [ ] Session cleared completely
- [ ] Protected routes tidak accessible

---

### 2. **Testing - Cek Error Handling** 🔴

#### 2.1 Test Login/Logout Errors
- [ ] Network error (disconnect internet)
- [ ] Firebase service down (simulate)
- [ ] Rate limit exceeded
- [ ] Invalid credentials error message
- [ ] Session timeout handling

#### 2.2 Verifikasi Keamanan
- [ ] Email verification diperlukan sebelum akses dashboard
- [ ] Redirect ke /verify-email jika belum verified
- [ ] Resend verification email bekerja
- [ ] Reload button check verification status
- [ ] Protected routes blocked tanpa auth

---

### 3. **Keamanan - Security Testing** 🟤

#### 3.1 Firestore Security Rules
- [ ] User hanya bisa read/write data sendiri (uid match)
- [ ] User tidak bisa akses data user lain
- [ ] Unauthenticated user tidak bisa read/write
- [ ] Test dengan Firestore Rules Playground

#### 3.2 Email Verification
- [ ] User baru otomatis terkirim verification email
- [ ] Unverified user tidak bisa akses dashboard
- [ ] Resend email dengan rate limit (cooldown)
- [ ] Link verification expire handling

#### 3.3 Validation Input
- [ ] Email format validation (regex)
- [ ] Password minimum length (6 chars)
- [ ] Password strength indicator akurat
- [ ] Confirm password must match
- [ ] XSS prevention (input sanitization)
- [ ] SQL injection prevention (Firestore handles)

---

### 4. **Frontend - UI/UX Testing** 💜

#### 4.1 Form Login/Register
- [ ] Semua field validation bekerja
- [ ] Error messages muncul di bawah field yang error
- [ ] Password strength indicator real-time
- [ ] Confirm password validation
- [ ] Button disabled saat loading
- [ ] Loading spinner muncul saat submit

#### 4.2 Handle Error
- [ ] Error messages dalam bahasa Indonesia
- [ ] Friendly error messages (bukan raw Firebase error)
- [ ] Error messages fade-in dengan smooth animation
- [ ] Toast/alert untuk error global
- [ ] Per-field error untuk validation

#### 4.3 Auth State
- [ ] Loading state saat check authentication
- [ ] Auto redirect jika sudah login (login page → dashboard)
- [ ] Auto redirect jika belum login (dashboard → login)
- [ ] Persistent login (refresh page tetap login)
- [ ] Session restoration after browser restart

---

### 5. **Backend - Implementasi** 💜

#### 5.1 Firebase Auth
- [ ] Firebase config valid (API keys)
- [ ] Authentication methods enabled (Email/Password, Google)
- [ ] Email templates configured
- [ ] Auth domain whitelisted
- [ ] COOP/COEP headers untuk Google popup

#### 5.2 Firestore Database
- [ ] Firestore initialized correctly
- [ ] Collections & documents structure correct
- [ ] Security rules deployed
- [ ] Indexes created (if needed)
- [ ] Offline persistence enabled

#### 5.3 Security Rules
- [ ] Rules deployed to Firestore
- [ ] Rules tested via Firestore console
- [ ] User isolation (uid check) working
- [ ] Write permissions correct
- [ ] Read permissions correct

---

### 6. **Persiapan - Setup** ⚪

#### 6.1 Setup Firebase Project
- [ ] Firebase project created
- [ ] Web app registered
- [ ] Firebase config added to .env.local
- [ ] Authentication enabled
- [ ] Firestore database created

#### 6.2 Konfigurasi Firestore
- [ ] Security rules written
- [ ] Security rules deployed
- [ ] Test data created
- [ ] Collections initialized

#### 6.3 Aktifkan Authentication
- [ ] Email/Password provider enabled
- [ ] Google provider enabled
- [ ] Authorized domains added (localhost, vercel domain)
- [ ] Email templates customized (optional)

---

## 🧪 Manual Testing Steps

### Test Case 1: Register → Verify → Login → Dashboard

1. **Register new account**
   ```
   Email: test@example.com
   Password: Test123!@#
   Name: Test User
   ```
   - ✅ Check: Redirected to /verify-email
   - ✅ Check: Email received in inbox

2. **Verify email**
   - Click link in email
   - ✅ Check: Email verified status = true
   - Go back to app, click "Reload"
   - ✅ Check: Redirected to /dashboard

3. **Test Dashboard**
   - ✅ Check: User info displayed correctly
   - ✅ Check: Stats cards show correct data
   - ✅ Check: Can add note
   - ✅ Check: Can delete note with confirmation
   - ✅ Check: Character counter works (max 500)

4. **Logout**
   - Click logout button in navbar
   - ✅ Check: Redirected to /login
   - ✅ Check: Cannot access /dashboard

---

### Test Case 2: Google Login

1. **Login with Google**
   - Click "Masuk dengan Google"
   - Select Google account
   - ✅ Check: Popup opens (or redirect if blocked)
   - ✅ Check: Redirected to /dashboard
   - ✅ Check: Display name from Google account

2. **Test auto-verified**
   - ✅ Check: Google users auto verified (emailVerified = true)
   - ✅ Check: No redirect to /verify-email

---

### Test Case 3: Reset Password

1. **Request reset**
   - Go to /reset
   - Enter email: test@example.com
   - Click "Kirim Email Reset"
   - ✅ Check: Success message shown
   - ✅ Check: Email received

2. **Reset password**
   - Click link in email
   - Enter new password: NewPass123!
   - ✅ Check: Password updated
   - Try login with new password
   - ✅ Check: Login successful

---

### Test Case 4: Error Handling

1. **Invalid login**
   - Email: wrong@example.com
   - Password: wrongpass
   - ✅ Check: Error message: "Email atau password salah"

2. **Network error**
   - Disconnect internet
   - Try to login
   - ✅ Check: Error message: "Tidak ada koneksi internet"

3. **Validation errors**
   - Empty fields → "Email harus diisi", "Password harus diisi"
   - Invalid email → "Format email tidak valid"
   - Short password → "Password minimal 6 karakter"
   - Password mismatch → "Password tidak cocok"

---

### Test Case 5: Security Rules

1. **Test in Firestore Console**
   ```javascript
   // Try to read another user's note
   get /databases/(default)/documents/notes/{noteId}
   // Auth: user1@example.com
   // noteId: document with uid: user2_uid
   // ✅ Expected: Permission denied
   ```

2. **Test write access**
   ```javascript
   // Try to write with wrong uid
   create /databases/(default)/documents/notes/new_note
   {
     text: "Test",
     uid: "different_user_uid",
     createdAt: request.time
   }
   // ✅ Expected: Permission denied (uid mismatch)
   ```

---

## 🎯 Testing Tools

### Browser DevTools
- Console: Check errors and warnings
- Network: Check Firebase API calls
- Application: Check localStorage/cookies
- Console: Check auth state changes

### Firebase Console
- Authentication: Check registered users
- Firestore: Check data structure
- Rules Playground: Test security rules
- Usage: Monitor quotas

### Manual Testing
- Different browsers (Chrome, Firefox, Safari)
- Mobile responsive (phone, tablet)
- Slow network (throttle in DevTools)
- Private/Incognito mode

---

## 📊 Test Results Template

```
Date: [DATE]
Tester: [NAME]
Browser: [BROWSER VERSION]
Environment: [DEVELOPMENT/PRODUCTION]

✅ PASSED: [X/Y tests]
❌ FAILED: [N tests]
⚠️  WARNINGS: [W issues]

Failed Tests:
1. [Test Name] - [Error Description]
2. ...

Notes:
- [Any observations]
- [Performance issues]
- [Suggestions]
```

---

## 🚀 Next Steps After Testing

1. ✅ All tests passed → Ready for deployment
2. ❌ Tests failed → Fix issues and re-test
3. 📝 Document known issues
4. 🔄 Setup CI/CD for automated testing
5. 📊 Setup monitoring (Firebase Analytics, Sentry)

---

**Last Updated:** November 15, 2025
**Version:** 1.0
**Status:** Ready for Testing
