# Job Seeker App 🔍

A modern mobile application built with React Native and Expo for managing job applications and tracking your job search journey.

## Features ✨

- **Job Listings**: Browse and search through available job opportunities
- **Job Applications**: Track all jobs you've applied to
- **Application Management**: Apply to jobs directly through the app
- **Job Details**: View comprehensive information about each job posting
- **User Profile**: Manage your profile and edit personal information
- **Theme Support**: Light and dark mode support with Redux state management
- **Persistent Storage**: Local data storage using AsyncStorage

## Tech Stack 🛠️

- **Framework**: React Native with Expo (~52.0.25)
- **Routing**: Expo Router (~4.0.15) for file-based navigation
- **State Management**: Redux Toolkit (~2.11.2) with React Redux (~9.2.0)
- **Data Fetching**: TanStack React Query (~5.90.16)
- **UI Components**: React Navigation with bottom tabs and drawer navigation
- **Storage**: AsyncStorage for persistent local data
- **TypeScript**: Full TypeScript support for type safety

## Project Structure 📁

```
app/
  ├── (tabs)/           # Tab-based screens
  │   ├── index.tsx     # Home/Jobs listing
  │   ├── apply.tsx     # Job application screen
  │   ├── applied.tsx   # Applied jobs list
  │   ├── job-detail.tsx # Job details
  │   └── profile.tsx   # User profile
  ├── edit-profile.tsx  # Profile editing screen
  └── _layout.tsx       # Root layout with providers
state/
  ├── store.ts          # Redux store configuration
  ├── themeSlice.ts     # Theme state management
  └── userSlice.ts      # User state management
lib/
  ├── storage.ts        # AsyncStorage utilities
  └── theme.ts          # Theme configuration
hooks/
  └── useAppliedJobs.ts # Custom hooks for job data
```

## Getting Started 🚀

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/developervision32/Job-Seeker-App.git
   cd job-management
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npx expo start
   ```

4. Run the app

   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan QR code with Expo Go app on your physical device

## Available Scripts 📜

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint for code quality

## Features in Detail 📋

### Job Management
- View all available job listings on the home screen
- Browse job details including requirements, salary, and company information
- Apply to jobs with a single tap
- Track application status and history

### Profile Management
- View and edit user profile information
- Update personal details including name, email, phone, and location
- Change profile picture
- Manage account settings

### Theme Customization
- Toggle between light and dark themes
- Persistent theme preference across app sessions
- Smooth theme transitions

## State Management 🔄

The app uses Redux Toolkit for centralized state management:
- **Theme Slice**: Manages app theme (light/dark mode)
- **User Slice**: Handles user profile data and authentication state

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is open source and available under the MIT License.

## Contact 📧

For questions or support, please open an issue on GitHub.
