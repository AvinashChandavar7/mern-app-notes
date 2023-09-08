# 1. Folder Structure

![Folder Structure](lesson11.png)

# 2. package.json

```npm
 npm i jwt-decode
```

```js
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^6.4.2",
    "@fortawesome/free-solid-svg-icons": "^6.4.2",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "@reduxjs/toolkit": "^1.9.5",
    "jwt-decode": "^3.1.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.1.2",
    "react-router-dom": "^6.15.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

```

# 3. hooks/useAuth.jsx

The code you provided defines a custom hook called `useAuth` that is intended to retrieve and decode the authentication token from the Redux store and determine the user's role and status based on the token's contents. Let's break down this code with comments to understand its functionality:

```javascript
// Import necessary dependencies and functions
import { useSelector } from 'react-redux'; // Redux hook for selecting data from the store
import { selectCurrentToken } from '../features/auth/authSlice'; // Selector for the current authentication token
import jwtDecode from 'jwt-decode'; // Library for decoding JSON Web Tokens (JWTs)

// Define the custom 'useAuth' hook
const useAuth = () => {
  // Use the 'useSelector' hook to retrieve the current authentication token from Redux store
  const token = useSelector(selectCurrentToken);

  // Initialize variables to determine user roles and status
  let isManager = false;
  let isAdmin = false;
  let status = 'Employee';

  // Check if a valid token is available
  if (token) {
    // Decode the JWT token to access its payload
    const decoded = jwtDecode(token);

    // Extract relevant information from the decoded JWT payload
    const { username, roles } = decoded.UserInfo;

    // Check if the user has the 'Manager' role
    isManager = roles.includes('Manager');

    // Check if the user has the 'Admin' role
    isAdmin = roles.includes('Admin');

    // Update the 'status' based on user roles
    if (isManager) {
      status = 'Manager';
    }

    if (isAdmin) {
      status = 'Admin';
    }

    // Return an object with user information
    return { username, roles, status, isManager, isAdmin };
  }

  // Return default values if there is no valid token
  return { username: '', roles: [], isManager, isAdmin, status };
};

// Export the 'useAuth' hook for use in other components
export default useAuth;
```

Now, let's provide detailed comments for the functionality of the `useAuth` hook:

1. The hook starts by importing the necessary dependencies and functions, including `useSelector` for accessing the Redux store, `selectCurrentToken` for selecting the current authentication token, and `jwtDecode` for decoding JWT tokens.

2. Inside the hook function, it uses `useSelector` to retrieve the current authentication token (`token`) from the Redux store.

3. It initializes variables `isManager`, `isAdmin`, and `status` to determine the user's role and status. These variables will be updated based on the decoded JWT token.

4. The code checks if a valid token (`token`) is available.

5. If a valid token is present, it proceeds to decode the JWT token using `jwtDecode`. The decoded payload typically contains information about the user, including their `username` and `roles`.

6. It extracts the `username` and `roles` from the decoded payload.

7. It checks if the user has the 'Manager' role by using `roles.includes('Manager')`.

8. It checks if the user has the 'Admin' role by using `roles.includes('Admin')`.

9. Based on the user's roles, it updates the `status` variable to reflect the user's status, which could be 'Employee', 'Manager', or 'Admin'.

10. Finally, it returns an object containing user information, including `username`, `roles`, `status`, `isManager`, and `isAdmin`, if a valid token is available.

11. If there is no valid token (token is falsy), it returns default values for `username`, `roles`, `isManager`, `isAdmin`, and `status`.

12. The `useAuth` hook is exported, making it available for use in other components. Components can call this hook to access user authentication information from the Redux store and determine the user's role and status based on their JWT token.

# 4. components/DashFooter.jsx

The provided code defines a React component called `DashFooter`, which appears to be a footer section for a dashboard. It includes navigation to the dashboard's home page, information about the current user's username and status, and an icon button for navigating to the home page. Let's break down this code with comments to understand its functionality:

```javascript
// Import necessary dependencies and components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Icon component
import { faHouse } from '@fortawesome/free-solid-svg-icons'; // Home icon
import { useNavigate, useLocation } from 'react-router-dom'; // Routing-related hooks
import useAuth from '../hooks/useAuth'; // Custom hook for authentication data

// Define the 'DashFooter' component
const DashFooter = () => {
  // Use the custom 'useAuth' hook to get user authentication data
  const { username, status } = useAuth();

  // Use the 'useNavigate' hook to get the navigation function
  const navigate = useNavigate();

  // Use the 'useLocation' hook to get the current location (pathname)
  const { pathname } = useLocation();

  // Define a function to handle clicking on the "Home" button
  const onGoHomeClicked = () => navigate('/dash');

  // Initialize the 'goHomeButton' variable to null
  let goHomeButton = null;

  // Check if the current pathname is not '/dash'
  if (pathname !== '/dash') {
    // If not on the dashboard home page, create a "Home" button
    goHomeButton = (
      <button
        className="dash-footer__button icon-button"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  // Create the content for the footer
  const content = (
    <footer className="dash-footer">
      {goHomeButton} {/* Render the "Home" button if applicable */}
      <p>Current User: {username}</p> {/* Display the current username */}
      <p>Status: {status}</p>{' '}
      {/* Display the user's status (e.g., Employee, Manager) */}
    </footer>
  );

  // Return the content to be rendered
  return content;
};

// Export the 'DashFooter' component for use in other parts of the application
export default DashFooter;
```

Here are detailed comments explaining the functionality of the `DashFooter` component:

1. The component imports necessary dependencies, including the `FontAwesomeIcon` component for rendering icons, the `faHouse` icon for the home button, routing-related hooks (`useNavigate` and `useLocation`), and the custom `useAuth` hook for accessing user authentication data.

2. Inside the component function, it uses the `useAuth` hook to retrieve the `username` and `status` of the current user. These values are used to display the username and user status in the footer.

3. It uses the `useNavigate` hook to get the navigation function (`navigate`) for programmatic navigation within the application.

4. The `useLocation` hook is used to get the current location (`pathname`) within the application. This is used to determine whether the user is on the dashboard's home page or not.

5. The `onGoHomeClicked` function is defined to handle clicking on the "Home" button. It uses the `navigate` function to navigate to the dashboard's home page (`'/dash'`).

6. The `goHomeButton` variable is initialized as `null`. It will be set to a button element if the current pathname is not `/dash`.

7. It checks if the current `pathname` is not equal to `/dash`. If it's not the home page, it creates an icon button with the "Home" icon. Clicking this button will navigate the user to the dashboard's home page.

8. The `content` variable is created, which includes the "Home" button (if applicable), the current username, and the user's status.

9. Finally, the component returns the `content` to be rendered as the footer of the dashboard.

This `DashFooter` component provides navigation functionality and displays user information based on the user's authentication status and the current location within the application.

# 5. features/auth/Welcome.jsx

The provided code defines a React component called `Welcome`. This component appears to be a welcome message and menu for users, displaying the current date and time, the user's username, and providing links for various actions depending on the user's role (Manager or Admin). Let's break down this code with comments to understand its functionality:

```javascript
// Import necessary dependencies and the custom 'useAuth' hook
import { Link } from 'react-router-dom'; // Component for creating navigation links
import useAuth from '../../hooks/useAuth'; // Custom hook for authentication data

// Define the 'Welcome' component
const Welcome = () => {
  // Use the custom 'useAuth' hook to get user authentication data
  const { username, isManager, isAdmin } = useAuth();

  // Get the current date and format it as a full date and long time
  const date = new Date();
  const today = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(date);

  // Create the content for the welcome section
  const content = (
    <section className="welcome">
      <p>{today}</p> {/* Display the current date and time */}
      <h1>Welcome {username}!</h1> {/* Display a welcome message with the username */}
      <p>
        <Link to="/dash/notes">View techNotes</Link>
      </p>{' '}
      {/* Link to view techNotes in the dashboard */}
      <p>
        <Link to="/dash/notes/new">Add New techNote</Link>
      </p> {/* Link to add a new techNote in the dashboard */}
      {/* Display additional links for Managers and Admins */}
      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users">View User Settings</Link>
        </p>
      )}
      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users/new">Add New User</Link>
        </p>
      )}
    </section>
  );

  // Return the content to be rendered
  return content;
};

// Export the 'Welcome' component for use in other parts of the application
export default Welcome;
```

Here are detailed comments explaining the functionality of the `Welcome` component:

1. The component imports necessary dependencies, including `Link` for creating navigation links and the custom `useAuth` hook for accessing user authentication data.

2. Inside the component function, it uses the `useAuth` hook to retrieve the `username`, `isManager`, and `isAdmin` properties. These properties are used to determine the user's role and username.

3. It gets the current date and time and formats it as a full date with a long time using `Intl.DateTimeFormat`. This formatted date is stored in the `today` variable.

4. The `content` variable is created, which represents the JSX elements to be rendered as the welcome message and menu.

5. It displays the current date and time using the `today` variable.

6. It displays a welcome message that includes the user's username retrieved from `useAuth`.

7. It provides links for the user to perform actions. These links include "View techNotes" and "Add New techNote," which are always displayed.

8. It conditionally displays additional links based on the user's role. If the user is a Manager or Admin (`isManager` or `isAdmin` is `true`), it displays links for "View User Settings" and "Add New User."

9. Finally, the component returns the `content` variable to be rendered. This component provides a personalized welcome message and menu based on the user's authentication status and role.

# 6. components/DashHeader.jsx

The provided code defines a React component called `DashHeader`, which appears to be the header section of a dashboard application. This component includes navigation links, buttons for various actions, and a logout button. Let's break down this code with comments to understand its functionality:

```javascript
// Import necessary dependencies and components
import { useEffect } from 'react'; // React hook for side effects
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Icon component
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'; // Icons from FontAwesome
import { useNavigate, Link, useLocation } from 'react-router-dom'; // Routing-related hooks
import { useSendLogoutMutation } from '../features/auth/authApiSlice'; // Mutation for user logout
import useAuth from '../hooks/useAuth'; // Custom hook for authentication data

// Regular expressions for checking the current pathname
const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

// Define the 'DashHeader' component
const DashHeader = () => {
  // Use the custom 'useAuth' hook to get user authentication data
  const { isManager, isAdmin } = useAuth();

  // Use the 'useNavigate' hook to get the navigation function
  const navigate = useNavigate();

  // Use the 'useLocation' hook to get the current location (pathname)
  const { pathname } = useLocation();

  // Use the 'useSendLogoutMutation' hook to get the logout mutation function
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  // Effect to navigate to the home page after successful logout
  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);

  // Event handlers for different button clicks
  const onNewNoteClicked = () => navigate('/dash/notes/new');
  const onNewUserClicked = () => navigate('/dash/users/new');
  const onNotesClicked = () => navigate('/dash/notes');
  const onUsersClicked = () => navigate('/dash/users');

  // Determine the 'dashClass' to control the header's container size
  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = 'dash-header__container--small';
  }

  // Define buttons based on the current pathname and user roles
  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button
        className="icon-button"
        title="New Note"
        onClick={onNewNoteClicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className="icon-button"
        title="New User"
        onClick={onNewUserClicked}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    );
  }

  let userButton = null;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
      userButton = (
        <button className="icon-button" title="Users" onClick={onUsersClicked}>
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      );
    }
  }

  let notesButton = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
    notesButton = (
      <button className="icon-button" title="Notes" onClick={onNotesClicked}>
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }

  // Create the logout button
  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  // Determine the CSS class for displaying error messages
  const errClass = isError ? 'errmsg' : 'offscreen';

  // Determine the content to be displayed in the header
  let buttonContent;
  if (isLoading) {
    buttonContent = <p>Logging Out...</p>;
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {newUserButton}
        {notesButton}
        {userButton}
        {logoutButton}
      </>
    );
  }

  // Create the content for the header
  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>{' '}
      {/* Display error messages if any */}
      <header className="dash-header">
        <div className={`dash-header__container ${dashClass}`}>
          <Link to="/dash">
            <h1 className="dash-header__title">techNotes</h1>
          </Link>
          <nav className="dash-header__nav">
            {buttonContent} {/* Display the buttons and links */}
          </nav>
        </div>
      </header>
    </>
  );

  // Return the content to be rendered
  return content;
};

// Export the 'DashHeader' component for use in other parts of the application
export default DashHeader;
```

Here are detailed comments explaining the functionality of the `DashHeader` component:

1. The component imports necessary dependencies, including React hooks, FontAwesome icons, routing-related hooks, mutations for user logout, and the custom `useAuth` hook for accessing user authentication data.

2. Inside the component function, it uses the `useAuth` hook to retrieve `isManager` and `isAdmin` properties that determine the user's role.

3. It uses the `useNavigate` hook to get the navigation function (`navigate`) for programmatic navigation within the application.

4. The `useLocation` hook is used to get the current location (`pathname`) within the application.

5. The `useSendLogoutMutation` hook is used to get the logout mutation function (`sendLogout`) and relevant state variables (`isLoading`, `isSuccess`, `isError`, `error`).

6. An effect is used to navigate to the home page (`'/'`) after a successful logout (`isSuccess` changes).

7. Event handlers (`onNewNoteClicked`, `onNewUserClicked`, `onNotesClicked`, `onUsersClicked`) are defined for different button clicks to navigate to specific routes.

8. The `dashClass` variable is determined based on the current `pathname` to control the header's container size.

9. Buttons (`newNoteButton`, `newUserButton`, `userButton`, `notesButton`) are conditionally displayed based on the current `pathname` and user roles.

10. The logout button (`logoutButton`) is created with an event handler to trigger the `sendLogout` mutation when clicked.

11. The `errClass` variable determines the CSS class for displaying error messages (`errmsg`) or hiding them (`offscreen`) based on whether an error occurred (`isError`).

# 7. features/note/NotesList.jsx

The provided code defines a React component called `NotesList`. This component is responsible for displaying a list of notes with various columns like username, created date, updated date, title, owner, and an edit button. Let's break down this code with comments to understand its functionality:

```javascript
// Import necessary dependencies and components
import { useGetNotesQuery } from './notesApiSlice'; // Query for fetching notes
import Note from './Note'; // Individual note component
import useAuth from '../../hooks/useAuth'; // Custom hook for authentication data

// Define the 'NotesList' component
const NotesList = () => {
  // Use the custom 'useAuth' hook to get user authentication data
  const { username, isManager, isAdmin } = useAuth();

  // Use the 'useGetNotesQuery' hook to fetch notes data
  const {
    data: notes, // Notes data
    isLoading, // Loading status
    isSuccess, // Query success status
    isError, // Query error status
    error, // Query error details
  } = useGetNotesQuery('notesList', {
    pollingInterval: 15000, // Polling interval for data refresh
    refetchOnFocus: true, // Refetch data when the component comes into focus
    refetchOnMountOrArgChange: true, // Refetch data on component mount or when query arguments change
  });

  let content; // Variable to hold the content to be displayed

  if (isLoading) content = <p>Loading...</p>; // Display a loading message while fetching data

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>; // Display an error message if the query encounters an error
  }

  if (isSuccess) {
    // If the query is successful, create the table of notes

    const { ids, entities } = notes; // Extract note IDs and entities from the query result

    let filteredIds;
    if (isManager || isAdmin) {
      // If the user is a Manager or Admin, display all notes
      filteredIds = [...ids];
    } else {
      // If the user is not a Manager or Admin, filter notes based on the username
      filteredIds = ids.filter(
        (noteId) => entities[noteId].username === username
      );
    }

    const tableContent =
      ids?.length &&
      filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />); // Create Note components for each note

    // Create the table structure to display notes with various columns
    content = (
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Username
            </th>
            <th scope="col" className="table__th note__created">
              Created
            </th>
            <th scope="col" className="table__th note__updated">
              Updated
            </th>
            <th scope="col" className="table__th note__title">
              Title
            </th>
            <th scope="col" className="table__th note__username">
              Owner
            </th>
            <th scope="col" className="table__th note__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content; // Return the content to be rendered
};

// Export the 'NotesList' component for use in other parts of the application
export default NotesList;
```

Here are detailed comments explaining the functionality of the `NotesList` component:

1. The component imports necessary dependencies, including the `useGetNotesQuery` for fetching notes, the `Note` component for displaying individual notes, and the custom `useAuth` hook for accessing user authentication data.

2. Inside the component function, it uses the `useAuth` hook to retrieve the `username`, `isManager`, and `isAdmin` properties that determine the user's role.

3. The `useGetNotesQuery` hook is used to fetch notes data. It includes various options like polling, refetching on focus, and refetching on mount or argument change.

4. The `content` variable is initially set to `null` and will be used to hold the content to be displayed based on different conditions.

5. If the data is loading (`isLoading` is `true`), it displays a "Loading..." message.

6. If there is an error (`isError` is `true`), it displays an error message obtained from the `error` object.

7. If the query is successful (`isSuccess` is `true`), it extracts note IDs and entities from the `notes` data.

8. Depending on the user's role (Manager, Admin, or regular user), it filters the note IDs to be displayed.

9. It creates `Note` components for each note using the filtered IDs and entities.

10. It creates a table structure with various columns (e.g., username, created date, updated date) and populates it with the `Note` components.

11. Finally, it returns the `content` to be rendered, which is the table of notes or error message based on the query result.

# 8. features/auth/RequireAuth.jsx

The provided code defines a React component called `RequireAuth`. This component is designed to restrict access to certain routes based on the user's roles. It checks if the user's roles match the allowed roles for a specific route and either renders the child components (if the user is authorized) or navigates to the login page (if the user is not authorized). Let's break down this code with comments to understand its functionality:

```javascript
// Import necessary dependencies and components
import { useLocation, Navigate, Outlet } from 'react-router-dom'; // React Router related hooks and components
import useAuth from '../../hooks/useAuth'; // Custom hook for accessing user authentication data

// Define the 'RequireAuth' component
const RequireAuth = ({ allowedRoles }) => {
  // Use the 'useLocation' hook to get the current location (pathname)
  const location = useLocation();

  // Use the custom 'useAuth' hook to get user authentication data, specifically the 'roles' property
  const { roles } = useAuth();

  // Define the 'content' variable to hold the content to be rendered
  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet /> // If the user's roles match the allowed roles, render the child components
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  ); // If not authorized, navigate to the login page with a 'from' state indicating the original location

  return content; // Return the 'content' to be rendered
};

// Export the 'RequireAuth' component for use in other parts of the application
export default RequireAuth;
```

Here are detailed comments explaining the functionality of the `RequireAuth` component:

1. The component imports necessary dependencies, including React Router related hooks (`useLocation`, `Navigate`, `Outlet`) for routing and the custom `useAuth` hook for accessing user authentication data.

2. Inside the component function, it uses the `useLocation` hook to get the current location (pathname).

3. It uses the custom `useAuth` hook to retrieve the `roles` property, which represents the roles assigned to the user.

4. The `content` variable is defined to hold the content that will be rendered based on the user's roles and the allowed roles for the specific route.

5. It checks if any of the user's roles (`roles`) match any of the allowed roles (`allowedRoles`) using the `some` array method.

6. If there is a match (the user is authorized), it renders the child components inside the `<Outlet />` component. The `<Outlet />` component is a placeholder for rendering nested child routes.

7. If there is no match (the user is not authorized), it uses the `<Navigate />` component to navigate to the login page (`"/login"`) and includes a `state` object with a `from` property that indicates the original location. The `replace` prop ensures that the user cannot navigate back to the restricted route.

8. Finally, it returns the `content`, which is either the child components (if authorized) or a navigation to the login page (if not authorized).
