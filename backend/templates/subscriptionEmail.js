module.exports = (name) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Thank You for Subscribing!</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #6A0DAD; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; background-color: #f8f9fa; }
        .footer { text-align: center; padding: 20px; color: #6c757d; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Our Community!</h1>
        </div>
        
        <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for subscribing to our newsletter! You've joined a community of passionate individuals who receive:</p>
            <ul>
                <li>Exclusive content and insights</li>
                <li>Early access to new features</li>
                <li>Special offers and promotions</li>
                <li>Curated industry news</li>
            </ul>
            <p>We'll be sending our first update soon. In the meantime, feel free to explore our website.</p>
            <p>Best regards,<br>The Team</p>
        </div>
        
        <div class="footer">
            <p>You received this email because you subscribed to our service.</p>
            <p><a href="#">Unsubscribe</a> | <a href="#">Preferences</a></p>
            <p>© ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
