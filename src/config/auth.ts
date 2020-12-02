const auth = {
  jwt: {
    secret: process.env.JWT_SECRET || '',
    expiresIn: '1d',
  },
};

export default auth;
