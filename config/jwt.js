import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, 'jdhasdjJSADHAJKkladsKLFSDL', {
    expiresIn: '30d',
  });
};

export default generateToken;
