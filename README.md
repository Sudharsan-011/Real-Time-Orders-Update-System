Real-Time Orders Update System
This project demonstrates a real-time system where clients receive updates whenever data in the database changes. The system uses Node.js for the backend, React for the frontend, and MongoDB as the database. Updates are propagated in real-time using WebSockets and MongoDB Change Streams.
________________________________________
Features
•	Real-time updates: Any insert, update, or delete on the orders collection is immediately pushed to all connected clients.
•	Order details: Each order includes quantity along with other fields, making the order information meaningful and complete.
•	Client dashboard: React frontend displays the latest orders and updates in real-time.
•	Database access: The MongoDB database is accessible remotely for testing purposes.
________________________________________
Tech Stack
•	Backend: Node.js, Express, WebSocket
•	Frontend: React, Redux (optional if using state management)
•	Database: MongoDB (with Change Streams for real-time updates)
________________________________________
Getting Started
Prerequisites
•	Node.js (v16+ recommended)
•	npm
•	Internet access to MongoDB
Installation
1.	Clone the repository:
git clone <repo-url>
cd <repo-directory>
2.	Install backend dependencies:
cd server
npm install
3.	Install frontend dependencies:
cd ../client
npm install
Running the Project
1.	Start the backend server:
cd server
npm start
2.	Start the frontend:
cd client
npm run dev
3.	Open your browser and navigate to:
http://localhost:5173
You should see the Orders dashboard. Any change in the database (insert/update/delete) will automatically reflect in the client.
________________________________________
Database
•	Collection: orders
•	Fields:
o	id (int, primary key)
o	customer_name (string)
o	product_name (string)
o	quantity (int) – added to make the order meaningful and complete
o	status (string: 'pending', 'shipped', 'delivered')
o	updated_at (timestamp)
The database is configured to be accessible remotely for testing purposes. No local setup is required.
________________________________________
How It Works
1.	Backend connects to MongoDB and listens for changes using Change Streams.
2.	When a change occurs, the backend broadcasts the updated data to all connected clients using WebSockets.
3.	The React frontend listens to these messages and updates the UI in real-time.
________________________________________
Notes
•	This project focuses on demonstrating real-time data propagation.
•	Including quantity ensures each order has complete and meaningful information.
•	It is optimized for simplicity and clarity, suitable for evaluation purposes.

