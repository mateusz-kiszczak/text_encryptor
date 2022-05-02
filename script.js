// 1. Classes
// 2. Functions
// 3. DOM
// 4. Event Listeners


// 1. CLASSES

class ShiftCipher {
  constructor(number) {
    this._number = number;
  }

  get number() {
    return this._number;
  }
  
  /* EXAMPLE OF BELOW FUNCTION THAT HANDLE CAPITAL LETTERS IN DECIMALS
  
  function shiftCharCode() {
    let x = this._number%(90-65);
    let y = decimalCollection[index] + x;
    if (y > 90) {
      let z = y%90;
      element = z + 65 - 1;
    } else if (y < 65) {
      let z = 65 - y;
      element = 90 - z + 1;
    } else {
      element = y;
    }
  
    return element;
  } */

  shiftCharCode(shiftNum, startChar, endChar, charCodeArr, element, index) {
    let x = shiftNum % (endChar-startChar);
    let y = charCodeArr[index] + x;
    if (y > endChar) {
      let z = y % endChar;
      element = z + startChar - 1;
    } else if (y < startChar) {
      let z = startChar - y;
      element = endChar - z + 1;
    } else {
      element = y;
    }
      
    return element;
  }

  unshiftCharCode(shiftNum, startChar, endChar, charCodeArr, element, index) {
    let x = shiftNum % (endChar-startChar);
    let y = charCodeArr[index] - x;
    if (y > endChar) {
      let z = y % endChar;
      element = z + startChar - 1;
    } else if (y < startChar) {
      let z = startChar - y;
      element = endChar - z + 1;
    } else {
      element = y;
    }
      
    return element;
  }

  encrypt(str) {
    let strCollection = Array.from(str);
    let decimalCollection = strCollection.map(element => element.charCodeAt());
    let shiftedDecimalCollection = decimalCollection.map(element => element + this.number);
    let encryptedDecimalCollection = shiftedDecimalCollection.map((element, index) => {
      // CAPITAL LETTER [A-Z]
      if (decimalCollection[index] >= 65 && decimalCollection[index] <= 90) {
        return this.shiftCharCode(this.number, 65, 90, decimalCollection, element, index);
      }
      // SMALL LETTERS [a-z]
      if (decimalCollection[index] >= 97 && decimalCollection[index] <= 122) {
        return this.shiftCharCode(this.number, 97, 122, decimalCollection, element, index);
      }
      // DIGITS [0-9]
      if (decimalCollection[index] >= 48 && decimalCollection[index] <= 57) {
        return this.shiftCharCode(this.number, 48, 57, decimalCollection, element, index);
      }
      // ANY OTHER CHARACTERS RETURN THE SAME
      return element - this.number;
    });
    
    let encryptedStringCollection = encryptedDecimalCollection.map(element => String.fromCharCode(element));
    let encryptedString = encryptedStringCollection.join('');

    // TEST
    // console.log(`String before encryption: \n${str}`);
    // console.log(`Array from string before encryption: \n${strCollection}`);
    // console.log(`Array of decimal characters: \n${decimalCollection}`);
    // console.log(`Array of shifted decimal characters: \n${shiftedDecimalCollection}`);
    // console.log(`Array of encrypted decimals: \n${encryptedDecimalCollection}`);
    // console.log(`Array of encrypted strings: ${encryptedStringCollection}`);
    // console.log(`String after encryption: \n${encryptedString}`);

    return encryptedString;
  }
  
  decrypt(str) {
    let strCollection = Array.from(str);
    let decimalCollection = strCollection.map(element => element.charCodeAt());
    let unshiftedDecimalCollection = decimalCollection.map(element => element - this.number);
    let decryptedDecimalCollection = unshiftedDecimalCollection.map((element, index) => {
    // CAPITAL LETTER [A-Z]
    if (decimalCollection[index] >= 65 && decimalCollection[index] <= 90) {
      return this.unshiftCharCode(this.number, 65, 90, decimalCollection, element, index);
    }
    // SMALL LETTERS [a-z]
    if (decimalCollection[index] >= 97 && decimalCollection[index] <= 122) {
      return this.unshiftCharCode(this.number, 97, 122, decimalCollection, element, index);
    }
    // DIGITS [0-9]
    if (decimalCollection[index] >= 48 && decimalCollection[index] <= 57) {
      return this.unshiftCharCode(this.number, 48, 57, decimalCollection, element, index);
    }
    // ANY OTHER CHARACTERS RETURN THE SAME
      return element + this.number;
    });

    let decryptedStringCollection = decryptedDecimalCollection.map(element => String.fromCharCode(element));
    let decryptedString = decryptedStringCollection.join('');

    // TEST
    // console.log('\n');
    // console.log(`String before decryption: \n${str}`);
    // console.log(`Array from string before decryption: \n${strCollection}`);
    // console.log(`Array of decimal characters: \n${decimalCollection}`);
    // console.log(`Array of unshifted decimal characters: \n${unshiftedDecimalCollection}`);
    // console.log(`Array of decrypted decimals: \n${decryptedDecimalCollection}`);
    // console.log(`Array of decrypted strings: ${decryptedStringCollection}`);
    // console.log(`String after decryption: \n${decryptedString}`);

    return decryptedString;
  }
};

// const cipher = new ShiftCipher(-37); // new ShiftCipher(-37)
// cipher.encrypt('Hi! Your message has been encrypted! 3042089'); // Expected output: 'Ij! Zpvs nfttbhf ibt cffo fodszqufe! 4153190'
// cipher.decrypt('Vw! Mcif asggous vog pssb sbqfmdhsr! 2931978'); // Expected output: 'Hi! Your message has been encrypted! 3042089'


// 2. FUNCTIONS
const addCiphersValues = (num1, num2, num3, num4) => {
  let valuesCollection = [num1, num2, num3, num4];

  cipherButtonsContainers.forEach(element => {
    let buttonCollection = element.children;
    for (let i = 0; i < buttonCollection.length; i++) {
      if (buttonCollection[i].classList.contains('cipher-button')) {
        buttonCollection[i].setAttribute('value', `${valuesCollection[i]}`);
      }
    }
  })  
};

const handlePressButtonStyles = (element, str = 'encrypt' | 'decrypt') => {
  let pressedCipherButton = document.querySelector(`.${str}-pressed-button`);
  if (pressedCipherButton) {
    pressedCipherButton.classList.remove(`${str}-pressed-button`);
  }
  element.classList.add(`${str}-pressed-button`);
};

const removePressedButtonStyle = (str = 'encrypt' | 'decrypt') => {
  let pressedCipherButton = document.querySelector(`.${str}-pressed-button`);
  if (pressedCipherButton) {
    pressedCipherButton.classList.remove(`${str}-pressed-button`);
  }
};

// Get and store text/string for encryption.
let encryptInputText;

const getEncryptInputValue = (element) => {
  encryptInputText = element.value;
};

// Get and store text/string for decryption.
let decryptInputText;

const getDecryptInputValue = (element) => {
  decryptInputText = element.value;
};

// Get and store encryption cipher/value.
let encryptCipherValue;

const getEncryptCipherValue = (element) => {
  encryptCipherValue = parseInt(element.value);
};

// Get and store decryption cipher/value.
let decryptCipherValue;

const getDecryptCipherValue = (element) => {
  decryptCipherValue = parseInt(element.value);
};

const setEncryptOutput = (str) => {
  let newPharagraph = document.createElement('p');
  newPharagraph.textContent = str;
  encryptOutput.innerHTML = '';
  encryptOutput.appendChild(newPharagraph);
};

const handleEncryptOutput = (str, num) => {
  if (num && str) {
    const cipher = new ShiftCipher(num);
    let encryptedText = cipher.encrypt(str);
    setEncryptOutput(encryptedText);
  }
  (!str) ? showAlert(0) : removeAlert(0);
  (!num) ? showAlert(1) : removeAlert(1);
  delete cipher;
};

const setDecryptOutput = (str) => {
  let newPharagraph = document.createElement('p');
  newPharagraph.textContent = str;
  decryptOutput.innerHTML = '';
  decryptOutput.appendChild(newPharagraph);
};

const handleDecryptOutput = (str, num) => {
  if (num && str) {
    const cipher = new ShiftCipher(num);
    let encryptedText = cipher.decrypt(str);
    setDecryptOutput(encryptedText);
  }
  (!str) ? showAlert(2) : removeAlert(2);
  (!num) ? showAlert(3) : removeAlert(3);
  delete cipher;
};

const handleMaxInputLength = (element) => {
  if (element.value.length > element.maxLength) {
    element.value = element.value.slice(0, element.maxLength);
  }
};

const copyContent = (str = 'encrypt' | 'decrypt') => {
  let contentParent = document.getElementById(`${str}-output`);
  let content = contentParent.firstElementChild;
  navigator.clipboard.writeText(content.textContent);
};

const resetEncryptSection = () => {
  // Clear variables.
  encryptInputText = '';
  encryptCipherValue = '';
  // Unpress buttons.
  removePressedButtonStyle('encrypt');
  // Clear input.
  encryptInput.value = '';
  encryptValue.value = '';
  // Clear output.
  setEncryptOutput('...');
  // Remove alerts.
  removeAlert(0);
  removeAlert(1);
};

const resetDecryptSection = () => {
  // Clear variables.
  decryptInputText = '';
  decryptCipherValue = '';
  // Unpress buttons.
  removePressedButtonStyle('decrypt');
  // Clear input.
  decryptInput.value = '';
  decryptValue.value = '';
  // Clear output.
  setDecryptOutput('...');
  // Remove alerts.
  removeAlert(2);
  removeAlert(3);
};

// ALERTS
const alertsCollection = document.querySelectorAll('.alert');

const showAlert = (index) => {
  if (alertsCollection[index].classList.contains('hidden')) {
    alertsCollection[index].classList.remove('hidden');
  }
};

const removeAlert = (index) => {
  if (!alertsCollection[index].classList.contains('hidden')) {
    alertsCollection[index].classList.add('hidden');
  }
};


// 3. DOM
const cipherButtonsContainers = document.querySelectorAll('.cipher-buttons-container');
const encryptOutput = document.getElementById('encrypt-output');
const decryptOutput = document.getElementById('decrypt-output');

addCiphersValues(-16, -8, 5, 20);  // Add predefined ciphers.


// 4. EVENT LISTENERS
// Elements for event listeners.
const encryptCipherButtons = document.querySelectorAll('.encrypt-cipher-button');
const decryptCipherButtons = document.querySelectorAll('.decrypt-cipher-button');

const encryptInput = document.getElementById('encrypt-input');
const decryptInput = document.getElementById('decrypt-input');

const encryptValue = document.getElementById('encrypt-value');
const decryptValue = document.getElementById('decrypt-value');

const predefinedEncryptValueButton = document.getElementById('submit-predefined-encrypt-value');
const predefinedDecryptValueButton = document.getElementById('submit-predefined-decrypt-value');

const ownEncryptValueButton = document.getElementById('submit-own-encrypt-value');
const ownDecryptValueButton = document.getElementById('submit-own-decrypt-value');

const copyEncryptedTextButton = document.getElementById('copy-encrypted');
const copyDecryptedTextButton = document.getElementById('copy-decrypted');

const resetEncryptButton = document.getElementById('reset-encrypt');
const resetDecryptButton = document.getElementById('reset-decrypt');

// Handle predefined cipher buttons onclick.
encryptCipherButtons.forEach(element => element.addEventListener('click', function(event) {
  if (event.target.classList.contains('encrypt-pressed-button')) {
    removePressedButtonStyle('encrypt');
    encryptCipherValue = '';
  } else {
    handlePressButtonStyles(event.target, 'encrypt');
    getEncryptCipherValue(event.target);
  }
  encryptValue.value = '';
  removeAlert(1);
}));

decryptCipherButtons.forEach(element => element.addEventListener('click', function(event) {
  if (event.target.classList.contains('decrypt-pressed-button')) {
    removePressedButtonStyle('decrypt');
    decryptCipherValue = '';
  } else {
    handlePressButtonStyles(event.target, 'decrypt');
    getDecryptCipherValue(event.target);
  }
  decryptValue.value = '';
  removeAlert(3);
}));

// Get text when the 'textarea' element is oninput.
encryptInput.addEventListener('input', function(event) {
  getEncryptInputValue(event.target);
  removeAlert(0);
});
decryptInput.addEventListener('input', function(event) {
  getDecryptInputValue(event.target);
  removeAlert(2);
});

// Select all text inside 'textarea' onfocus.
encryptInput.addEventListener('focus', function() { this.select() });
decryptInput.addEventListener('focus', function() { this.select() });

// Handle cipher input oninput.
encryptValue.addEventListener('input', function(event) {
  removePressedButtonStyle('encrypt');
  encryptCipherValue = '';
  handleMaxInputLength(event.target);
  getEncryptCipherValue(event.target);
  removeAlert(1);
});
decryptValue.addEventListener('input', function(event) {
  removePressedButtonStyle('decrypt');
  decryptCipherValue = '';
  handleMaxInputLength(event.target);
  getDecryptCipherValue(event.target);
  removeAlert(3);
});

// Handle cipher input onfocus.
encryptValue.addEventListener('focus', function() {
  removePressedButtonStyle('encrypt');
  encryptCipherValue = '';
});
decryptValue.addEventListener('focus', function() {
  removePressedButtonStyle('decrypt');
  decryptCipherValue = '';
});

// Predefined encryption.
predefinedEncryptValueButton.addEventListener('click', function() {
  handleEncryptOutput(encryptInputText, encryptCipherValue);
});
predefinedDecryptValueButton.addEventListener('click', function() {
  handleDecryptOutput(decryptInputText, decryptCipherValue);
});

// Custom encryption.
ownEncryptValueButton.addEventListener('click', function() {
  handleEncryptOutput(encryptInputText, encryptCipherValue);
});
ownDecryptValueButton.addEventListener('click', function() {
  handleDecryptOutput(decryptInputText, decryptCipherValue);
});

// Copy buttons.
copyEncryptedTextButton.addEventListener('click', function() {
  copyContent('encrypt');
});
copyDecryptedTextButton.addEventListener('click', function() {
  copyContent('decrypt');
});

// Reset buttons.
resetEncryptButton.addEventListener('click', function() {
  resetEncryptSection();
});
resetDecryptButton.addEventListener('click', function() {
  resetDecryptSection();
});