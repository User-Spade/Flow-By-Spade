# How to Run Your App on Expo

## ✅ VERIFIED WORKING STEPS (Just Tested!)

### The Complete Command (Copy & Paste This)
```powershell
cd "c:\Code\WEBS BY SPADE\webs-by-spade-mobile"; npx.cmd expo start
```

That's it! One command does everything.

---

## 🚀 Step-by-Step Instructions

### Step 1: Open Terminal in VS Code
1. Open VS Code
2. Press `` Ctrl+` `` (backtick) to open the integrated terminal
3. Or go to **Terminal → New Terminal**

### Step 2: Run This Command
Copy and paste this exact command into your terminal:

```powershell
cd "c:\Code\WEBS BY SPADE\webs-by-spade-mobile"; npx.cmd expo start
```

Press Enter.

### Step 3: Wait 5-10 Seconds
You'll see this exact output:

```
Starting project at C:\Code\WEBS BY SPADE\webs-by-spade-mobile
Starting Metro Bundler
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █▀▀ ████  █ ▄▄▄▄▄ █
█ █   █ █▄▀██▀██  █ █   █ █
█ █▄▄▄█ █ ▄ █ ▄▀ ██ █▄▄▄█ █
█▄▄▄▄▄▄▄█ █ ▀▄█▄█▄█▄▄▄▄▄▄▄█
█▄▄▀ ██▄ █▀█  ▄▀▄▄▀  ▄▀▄▄▀█
█  █▄█▄▄▄▄▀▀  ▀ ▀▄▄▀ ▀▀█▄▄█
██▀▀  ▄▄▄ ▀▄ █  █▀█ ▄█ ██▀█
█▄▀██▄█▄▄▀▄█ █▀██ ▄▄ ▀▀██▄█
█▄▄█▄▄▄▄█▀█▀█ ▀▄  ▄▄▄ █ ▄ █
█ ▄▄▄▄▄ █▄ █▄ █▄  █▄█  ▀ ▄█
█ █   █ █▀ ▀▀▄▄▀▀▄ ▄▄ █▀▄██
█ █▄▄▄█ █▀▀▀██  █  █▄  ▄█▄█
█▄▄▄▄▄▄▄█▄▄███▄▄█▄███▄▄█▄▄█

› Metro waiting on exp://192.168.1.202:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Web is waiting on http://localhost:8081

› Using Expo Go
› Press s │ switch to development build

› Press a │ open Android
› Press w │ open web

› Press j │ open debugger
› Press r │ reload app
› Press m │ toggle menu
› shift+m │ more tools
› Press o │ open project code in your editor

› Press ? │ show all commands

Logs for your project will appear below. Press Ctrl+C to exit.
```

**✅ Success!** The QR code is now showing!

---

## 📱 How to View Your App

### Option 1: On Your Phone (Recommended)

#### For Android:
1. Install **Expo Go** from Google Play Store
2. Open Expo Go app
3. Tap **"Scan QR code"**
4. Point camera at the QR code in your terminal
5. App loads automatically! 🎉

#### For iOS:
1. Install **Expo Go** from Apple App Store
2. Open your **Camera** app (not Expo Go)
3. Point camera at the QR code in your terminal
4. Tap the notification that appears
5. App opens in Expo Go! 🎉

### Option 2: In Web Browser
In the terminal where Expo is running, press:
```
w
```
Your browser opens automatically at http://localhost:8081

### Option 3: Android Emulator
In the terminal, press:
```
a
```
(Requires Android Studio with emulator set up)

### Option 4: iOS Simulator (Mac Only)
In the terminal, press:
```
i
```
(Requires Xcode with iOS Simulator)

---

## 🔄 Making the QR Code Appear

### If QR Code Doesn't Show:

**Method 1: Restart Expo**
```powershell
# Press Ctrl+C to stop
# Then restart:
npx.cmd expo start
```

**Method 2: Clear Cache and Restart**
```powershell
npx.cmd expo start --clear
```

**Method 3: Ensure You're in the Right Directory**
```powershell
# Make sure you're in the mobile project folder
cd "c:\Code\WEBS BY SPADE\webs-by-spade-mobile"
pwd  # Should show: C:\Code\WEBS BY SPADE\webs-by-spade-mobile
npx.cmd expo start
```

**Method 4: Check if Metro Bundler Started**
Look for this message in the terminal:
```
Starting Metro Bundler
```

If you see errors instead, you may need to:
```powershell
# Reinstall dependencies
npm.cmd install

# Then try again
npx.cmd expo start
```

---

## ⌨️ Useful Terminal Commands While Expo is Running

Once Expo is running, you can press these keys in the terminal:

| Key | Action |
|-----|--------|
| `w` | Open in **web browser** |
| `a` | Open in **Android emulator** |
| `i` | Open in **iOS simulator** (Mac only) |
| `r` | **Reload** the app |
| `m` | Toggle **dev menu** |
| `j` | Open **debugger** |
| `shift+m` | **More tools** |
| `?` | Show **all commands** |
| `Ctrl+C` | **Stop** Expo server |

---

## 🛑 How to Stop the Server

Press `Ctrl+C` in the terminal where Expo is running.

You'll see:
```
› Stopped server
```

---

## 🔥 Live Reload (Automatic!)

Once your app is running on your phone or browser:

1. **Edit any file** in VS Code (e.g., `app/index.tsx`)
2. **Save the file** (`Ctrl+S`)
3. **Watch the app reload automatically** on your phone/browser! ✨

No need to restart Expo - changes appear instantly!

---

## 🐛 Troubleshooting

### QR Code Not Appearing?
- Make sure you ran `npx.cmd expo start` (not just `npm start` in some cases)
- Wait 10-15 seconds for Metro Bundler to fully start
- Check for error messages in the terminal
- Try `npx.cmd expo start --clear`

### "Command not found" Error?
```powershell
# Use npx.cmd instead of npx on Windows
npx.cmd expo start
```

### Can't Scan QR Code?
- Make sure your phone and computer are on the **same Wi-Fi network**
- Try opening the app manually in Expo Go → "Enter URL manually" → type the `exp://` URL shown in terminal

### App Won't Load?
```powershell
# Stop the server (Ctrl+C)
# Clear cache and restart
npx.cmd expo start --clear
```

### Port Already in Use?
```powershell
# Stop all Node processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Start again
npx.cmd expo start
```

---

## 📝 Complete Example Session

```powershell
# 1. Navigate to project
cd "c:\Code\WEBS BY SPADE\webs-by-spade-mobile"

# 2. Start Expo
npx.cmd expo start

# 3. Wait for QR code to appear (10-15 seconds)
# 4. Scan QR code with Expo Go app on your phone
# 5. App loads!

# To view in browser instead, press: w

# To stop the server later: Ctrl+C
```

---

## ✅ Success Checklist

You know it's working when you see:

- ✅ "Starting Metro Bundler" message
- ✅ QR code displayed in terminal
- ✅ "Metro waiting on exp://..." message
- ✅ No error messages in red
- ✅ Can scan QR code and app loads on phone

---

## 🎯 Quick Reference

**Start the app:**
```powershell
cd "c:\Code\WEBS BY SPADE\webs-by-spade-mobile"
npx.cmd expo start
```

**Stop the app:**
```
Ctrl+C
```

**View in browser:**
```
Press: w
```

**Reload after making changes:**
- Automatically reloads (just save your files!)
- Or press `r` in terminal for manual reload
- Or shake your phone → tap "Reload"

---

**That's it! Your app should now be running on Expo!** 🎉
