# Flight Booking System Frontend

## Overview
This is a React-based frontend application for a flight booking system. It provides a user-friendly interface for searching flights, managing bookings, and viewing booking history. The application includes user authentication, flight search functionality, and wallet management.

## Features
- **User Authentication**: Register and login functionality with JWT-based authentication
- **Flight Search**: Search for flights with various filters
- **Flight Booking**: Book flights and manage reservations
- **Booking History**: View and manage past and upcoming bookings
- **Wallet Management**: View and manage user wallet balance
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **Toast Notifications**: User feedback for actions and errors
- **Protected Routes**: Secure routes that require authentication

## Technologies Used
- **React**: JavaScript library for building user interfaces
- **React Router**: Client-side routing for navigation
- **Axios**: HTTP client for API communication
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Modern frontend build tool and development server
- **React Toastify**: Notification library for user feedback
- **LocalStorage**: Client-side storage for authentication tokens and user data

## Project Structure

```
frontend/src/
├── components/
│   ├── BookingHistory.jsx        # Component for viewing booking history
│   ├── BookingModal.jsx          # Modal for booking confirmation
│   ├── FlightCard.jsx            # Individual flight card display
│   ├── FlightSearch.jsx          # Flight search and filter interface
│   ├── Login.jsx                 # User login and registration
│   ├── Navbar.jsx                # Navigation bar component
│   └── Wallet.jsx                # Wallet balance and management
├── context/
│   └── AuthContext.jsx           # Authentication context and hooks
├── services/
│   └── api.js                    # API endpoints and Axios configuration
├── utils/
│   └── helpers.js                # Utility helper functions
├── App.jsx                       # Main application component
├── App.css                       # Application styles
├── main.jsx                      # Application entry point
└── index.css                     # Global styles
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory with the following variables:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## Available Scripts

- **`npm run dev`**: Start the development server with Vite
- **`npm run build`**: Build the application for production
- **`npm run lint`**: Run ESLint to check code quality
- **`npm run preview`**: Preview the production build locally

## Components Details

### Login (`Login.jsx`)
- Handles user registration and login
- Form validation
- Token storage in localStorage
- Redirects authenticated users to the main page

### FlightSearch (`FlightSearch.jsx`)
- Displays available flights
- Search and filter functionality
- Integrates with FlightCard component
- Shows loading and error states

### FlightCard (`FlightCard.jsx`)
- Displays individual flight information
- Shows flight details (departure, arrival, price, duration)
- Opens booking modal on selection

### BookingModal (`BookingModal.jsx`)
- Booking confirmation interface
- Passenger information collection
- Payment processing
- Booking confirmation

### BookingHistory (`BookingHistory.jsx`)
- Displays user's past and upcoming bookings
- Booking details and status
- Cancel booking functionality

### Wallet (`Wallet.jsx`)
- Shows current wallet balance
- Add funds functionality
- Transaction history

### Navbar (`Navbar.jsx`)
- Navigation between pages
- User profile display
- Logout functionality

## Context Management

### AuthContext (`context/AuthContext.jsx`)
Provides authentication state and functions:
- `user`: Current logged-in user information
- `isAuthenticated`: Boolean indicating if user is logged in
- `loading`: Loading state for auth checks
- `login()`: Function to authenticate user
- `register()`: Function to create new user account
- `logout()`: Function to log out user

## API Integration

### Authentication Endpoints
- `POST /auth/register`: Register new user
- `POST /auth/login`: Login user
- `GET /auth/wallet`: Fetch user wallet

### Flight Endpoints
- `GET /flights`: Get all available flights
- `GET /flights/:id`: Get specific flight details
- `POST /flights/:id/attempt`: Record flight search attempt

### Booking Endpoints
- `GET /bookings`: Get user's bookings
- `POST /bookings`: Create new booking
- `DELETE /bookings/:id`: Cancel booking

## Authentication Flow

1. User registers or logs in through the Login component
2. API returns JWT token and user data
3. Token is stored in localStorage
4. Axios interceptor automatically adds token to all requests
5. Protected routes check authentication status via AuthContext
6. Unauthenticated users are redirected to login page

## Styling

The application uses Tailwind CSS for styling with a modern, clean design:
- Color scheme: Blue, white, and gray tones
- Responsive breakpoints for mobile, tablet, and desktop
- Utility-first approach for rapid UI development

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

## Running with Backend

1. Ensure the backend server is running on `http://localhost:5000`
2. Update `VITE_API_URL` in `.env` if backend runs on different port
3. Start the frontend development server

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Error Handling

- API errors are displayed via toast notifications
- Form validation provides immediate user feedback
- Network errors are caught and handled gracefully
- Authentication errors redirect to login page

## Future Enhancements

- Add payment gateway integration
- Implement advanced flight filters (stops, airlines, price range)
- Add flight itinerary details
- Implement review and rating system
- Add booking modification functionality
- Implement real-time flight status updates

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please contact the development team or open an issue in the repository.
