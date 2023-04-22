export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '12h',
  },
});
