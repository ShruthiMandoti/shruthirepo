# Android Login App with Jetpack Compose

A modern and beautiful login screen implementation using Jetpack Compose and Material Design 3.

## Features

- 🎨 **Modern UI**: Beautiful Material Design 3 interface with gradient backgrounds and rounded corners
- 🔐 **Login Form**: Email and password input fields with proper validation
- 👁️ **Password Visibility**: Toggle password visibility with eye icon
- ⚡ **Loading States**: Animated loading indicator during login process
- 🌈 **Custom Theme**: Modern color scheme with primary/secondary colors
- 📱 **Responsive Design**: Works on different screen sizes with scrollable layout
- 🔗 **Social Login**: Google sign-in option placeholder
- 🎯 **Navigation**: Sign up link for new users

## Design Elements

### Visual Components
- Gradient background with subtle primary color
- Card-based form layout with elevation
- Custom text fields with leading icons
- Rounded corners throughout the interface
- Proper spacing and typography hierarchy

### Interactive Features
- Password visibility toggle
- Form validation (fields must be filled)
- Loading state with circular progress indicator
- Clickable forgot password link
- Social login button
- Sign up navigation

## Technical Stack

- **Jetpack Compose**: Modern UI toolkit for Android
- **Material Design 3**: Latest Material Design components
- **Kotlin**: Programming language
- **Android Gradle Plugin**: Build system
- **Compose BOM**: Bill of Materials for consistent versions

## Project Structure

```
app/
├── src/main/
│   ├── java/com/example/loginapp/
│   │   ├── MainActivity.kt              # Main activity with Compose setup
│   │   ├── LoginScreen.kt               # Main login screen composable
│   │   └── ui/theme/
│   │       ├── Color.kt                 # Color definitions
│   │       ├── Theme.kt                 # Material theme setup
│   │       └── Type.kt                  # Typography definitions
│   ├── res/
│   │   ├── values/
│   │   │   ├── colors.xml               # XML color resources
│   │   │   ├── strings.xml              # String resources
│   │   │   └── themes.xml               # XML theme definitions
│   │   └── xml/
│   │       ├── backup_rules.xml         # Backup configuration
│   │       └── data_extraction_rules.xml # Data extraction rules
│   └── AndroidManifest.xml              # App manifest
├── build.gradle.kts                     # App-level build configuration
└── proguard-rules.pro                   # ProGuard rules
```

## Getting Started

### Prerequisites
- Android Studio Arctic Fox or later
- Android SDK 24 or higher
- Kotlin 1.9.0 or later

### Building the Project

1. **Clone or copy the project files**
2. **Open in Android Studio**
3. **Sync Gradle files** - Android Studio will automatically download dependencies
4. **Run the app** - Click the run button or use `Ctrl+F10`

### Gradle Commands

```bash
# Build the project
./gradlew build

# Install debug APK
./gradlew installDebug

# Run tests
./gradlew test
```

## Customization

### Colors
Modify colors in `app/src/main/java/com/example/loginapp/ui/theme/Color.kt`:

```kotlin
val Primary = Color(0xFF6366F1)        // Primary brand color
val Secondary = Color(0xFF06B6D4)      // Secondary accent color
val Background = Color(0xFFFAFAFA)     // Background color
```

### Typography
Update typography in `app/src/main/java/com/example/loginapp/ui/theme/Type.kt`

### Layout
The main login interface is in `LoginScreen.kt` - modify the composable functions to adjust the layout.

## Key Components

### LoginScreen
The main composable that renders the entire login interface including:
- App logo/icon
- Welcome text
- Email and password fields
- Login button with loading state
- Social login options
- Sign up navigation

### CustomTextField
Reusable text field component with:
- Leading icons
- Optional trailing icons (like password visibility toggle)
- Consistent styling and validation

## Authentication Integration

The current implementation includes placeholders for authentication logic. To integrate with a real backend:

1. **Replace the login button onClick** with actual authentication calls
2. **Add network dependencies** (Retrofit, OkHttp, etc.)
3. **Implement proper error handling** and validation
4. **Add navigation** to post-login screens
5. **Integrate social login SDKs** (Google Sign-In, etc.)

## Dependencies

Key dependencies used in this project:

```kotlin
// Jetpack Compose
implementation("androidx.compose.ui:ui")
implementation("androidx.compose.material3:material3")
implementation("androidx.activity:activity-compose")

// Material Icons
implementation("androidx.compose.material:material-icons-extended")

// Android Core
implementation("androidx.core:core-ktx")
implementation("androidx.lifecycle:lifecycle-runtime-ktx")
```

## License

This project is open source and available under the MIT License.

## Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Support

For questions or issues, please open an issue in the project repository.