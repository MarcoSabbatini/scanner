# WebAuthN 

This module provides an implementation of WebAuthN-based authentication. It allows users to register and authenticate their credentials using secure authenticators.


## Features

- **Credential Registration:**
  - Users can register their credentials through a web interface.
  - Credentials are sent to the server and stored in memory.

- **Authentication:**
  - Users can authenticate using their registered credentials.
  - The server verifies the credentials using the WebAuthN protocol.

- **HTTPS Connection:**
  - The server uses a self-signed SSL certificate (`localhost.pem`) to ensure secure communication.

## Installation

   ```bash
   sudo apt update
   sudo apt install mkcert libnss3-tools
   mkcert localhost 
   # creates localhost-key.pem and localhost.pem, key and certificate
   npm install
   node server.js
   ```

**Access the application:**
   Open a browser and visit [https://localhost:3000](https://localhost:3000).

> **Note:** Since the SSL certificate is self-signed, the browser may display a security warning. Just bypass it

## API Endpoints

### `GET /`
Serves the main HTML page for the WebAuthN user interface.

### `POST /register`
Registers a new user with the provided credentials.

### `POST /login`
Authenticates a registered user.

## Key Files

### `server.js`
- Configures the HTTPS server using `localhost-key.pem` and `localhost.pem`.
- Serves the main HTML page and handles WebAuthN APIs through the `webauthn.js` router.

### `routes/webauthn.js`
- Manages routes for user registration and authentication.
- Uses an in-memory object (`registeredUser`) to temporarily store user credentials.

### `public/index.html`
- Provides a simple user interface for registration and authentication.
- Uses JavaScript to interact with the browser's WebAuthN API and send data to the server.
