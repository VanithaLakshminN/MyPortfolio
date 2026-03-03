const express = require('express');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();

// 1. MIDDLEWARE
app.use(cors());
app.use(express.json());
// Serves your index.html, style.css, and script.js automatically
app.use(express.static(__dirname)); 

// 2. THE RESUME FIX: Explicit route to serve the PDF
app.get('/VANITHA_BE_CSE_2026.pdf', (req, res) => {
    const filePath = path.join(__dirname, 'VANITHA_BE_CSE_2026.pdf');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("File Error:", err);
            res.status(404).send("Resume file not found on server. Please check the filename.");
        }
    });
});

// 3. DATABASE CONNECTION
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Nrao@2004', 
    database: 'portfolio_db'
});

db.connect(err => {
    if (err) {
        console.error("❌ MySQL Connection Failed:", err.message);
    } else {
        console.log("✅ MySQL Connected & PDF Route Active!");
    }
});

// 4. PING ROUTE (Contact Form)
app.post('/send-ping', (req, res) => {
    const { name, email, message } = req.body;
    
    // Save to Database
    db.query('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)', 
    [name, email, message], (err) => {
        if (err) {
            console.error("Query Error:", err);
            return res.status(500).send({ error: "Database save failed" });
        }

        // Email Setup
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vanithalakshmin354@gmail.com',
                pass: 'gvln kzrg vcpe jqyl' // Google App Password
            }
        });

        let mailOptions = {
            from: email,
            to: 'vanithalakshmin354@gmail.com',
            subject: `New Portfolio Message from ${name}`,
            text: `From: ${name} (${email})\n\nMessage: ${message}`
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.error("Email Error:", error);
                return res.status(500).send({ error: "Email failed to send" });
            }
            res.send({ status: "Success" });
        });
    });
});

// 5. START SERVER
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
});