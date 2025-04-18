const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");
const checkNumbers = document.getElementById("includeNumbers");
const checkLetters = document.getElementById("includeLetters");
const checkMixed = document.getElementById("includeMixed");
const checkSymbols = document.getElementById("includeSymbols");
const copyBtn = document.getElementById("copyBtn");
const copyAlert = document.getElementById("copyAlert");
const optionAlert = document.getElementById("optionAlert");

function updateLengthDisplay() {
  lengthValue.innerHTML = `<strong>${lengthSlider.value}</strong>`;
}

lengthSlider.addEventListener("input", () => {
  updateLengthDisplay();
  generatePassword();
});

function generatePassword() {
  const length = +lengthSlider.value;
  const hasNumbers = checkNumbers.checked;
  const hasLetters = checkLetters.checked;
  const hasMixed = checkMixed.checked;
  const hasSymbols = checkSymbols.checked;

  let charset = "";
  if (hasNumbers) charset += "0123456789";
  if (hasLetters) charset += "abcdefghijklmnopqrstuvwxyz";
  if (hasMixed) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (hasSymbols) charset += "!@#$%^&*()_+{}[]:;<>,.?/~`-=";

  if (charset.length === 0) {
    passwordInput.value = "";
    optionAlert.style.display = "block";
    setTimeout(() => {
      optionAlert.style.display = "none";
    }, 3000);
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  passwordInput.value = password;
}

[checkNumbers, checkLetters, checkMixed, checkSymbols].forEach(cb =>
  cb.addEventListener("change", generatePassword)
);

copyBtn.addEventListener("click", () => {
  if (!passwordInput.value) return;
  navigator.clipboard.writeText(passwordInput.value).then(() => {
    copyAlert.style.display = "block";
    setTimeout(() => {
      copyAlert.style.display = "none";
    }, 3000);
  });
});

updateLengthDisplay();
generatePassword();