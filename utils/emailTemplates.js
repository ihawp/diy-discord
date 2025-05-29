/**
 * Generate a magic token email template
 * 
 * @param {string} userEmail - Email Address
 * @param {number} id - User ID (DB)
 * @param {string} magicToken - String of 64 random bytes 
 * @returns {Object} Object containing parameters for sending email to X
 */
const generateMagicTokenEmailTemplate = (userEmail, id, magicToken) => {
    return {
        from: '"ihawp.com" <wecwarren@gmail.com>',
        to: userEmail,
        subject: 'Magic Login Link',
        text: 'Here is your magic link!',
        html: `
            <h1>Magic Login Link:</h1>
            <p>Here is your magic login link: <a href="${process.env.SERVER_URL}auth/magic?id=${id}&key=${magicToken}">Login Now</a></p>
        `,
    }
}

const generateWelcomeEmailTemplate = (userEmail) => {
    return {
        from: '"ihawp.com" <wecwarren@gmail.com>',
        to: userEmail,
        subject: 'Welcome to the fake Discord!',
        text: 'Welcome to the fake Discord!',
        html: `
            <h1>This is some large text</h1>
            <p>This is some small text</p>
        `,
    }
}

const generateVerifyEmailTemplate = (userEmail) => {
    return {
        from: '"ihawp.com <wecwarren@gmail.com>',
        to: userEmail,
        subject: 'Verify Your Email - ihawp.com',
        text: 'Verify your email to access all services.',
        html: `
            <h1>Verify Your Email:</h1>
            <a href="${process.env.SERVER_URL}auth/verify-email">Verify Email</a>
        `,
    }
}

module.exports = {
    generateMagicTokenEmailTemplate,
    generateVerifyEmailTemplate,
}