const validateUserData = (email, password) => {
  // Verificar o formato do email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Formato de e-mail inválido");
  }

  // Verificar se a senha tem pelo menos 6 caracteres
  if (password.length < 6) {
    throw new Error("A senha deve ter pelo menos 6 caracteres");
  }

  return true;
};

export default { validateUserData };
