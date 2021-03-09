const e = require('express');
const mailgun = require('mailgun-js');
const domain = process.env.MAILGUN_DOMAIN;
const api_key = process.env.MAILGUN_API_KEY;

module.exports = (email, username, token) => {
    const mg = mailgun({ apiKey: api_key, domain: domain });
    const data = {
        from: 'Excited User <me@samples.mailgun.org>',
        to: email,
        subject: 'Hello',
        html: `<p> Hello ${username} </p>
            <p> We're glad you've to join our movie app</p>
            <p> verifiy account </p>
            <button><a href='http://localhost:${process.env.PORT}/verify?token=${token}'>Click me</a></button>
        `
    }
};