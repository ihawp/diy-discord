const generateMagicTokenEmailTemplate = (userEmail, id, magicToken) => {
    return {
        from: '"ihawp.com" <wecwarren@gmail.com>',
        to: userEmail,
        subject: 'Magic Login Link',
        text: 'Here is your magic link!',
        html: `<p>Here is your <a href="${process.env.SERVER_URL}auth/magic?id=${id}&key=${magicToken}">Login Now</a></p>`,
    }
}

module.exports = {
    generateMagicTokenEmailTemplate,
}