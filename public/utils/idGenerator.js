function generateRandomId(length) {
    const idChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const idLetterChar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomId = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = i == 0 ? Math.floor(Math.random() * idChars.length): Math.floor(Math.random() * idChars.length);

      const charsToUse = i == 0 ? idLetterChar : idChars
      randomId += charsToUse.charAt(randomIndex);
    }
    return randomId;
  }
  