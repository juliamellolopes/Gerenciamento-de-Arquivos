import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const secretKey = crypto.randomBytes(64).toString('hex');

// Função para gerar um token JWT
function generateToken(userId) {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); // Pode ajustar o tempo de expiração conforme necessário
  return token;
}

// Função para verificar um token JWT
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.userId;
  } catch (error) {
    return null; // Token inválido ou expirado
  }
}

export {generateToken, verifyToken}