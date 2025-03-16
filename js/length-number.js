const phoneInput = document.getElementById('phone');
const charCount = document.getElementById('char-count');

phoneInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');

    const currentLength = this.value.length; 
    charCount.textContent = `${currentLength}/10`;
});
