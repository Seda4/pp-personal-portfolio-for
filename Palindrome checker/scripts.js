document.getElementById("check-btn").addEventListener("click", function () {
    const textInput = document.getElementById("text-input").value;
    const result = document.getElementById("result");

    if (textInput.trim() === "") {
        alert("Please input a value");
        return;
    }

    const isPalindrome = checkPalindrome(textInput);
    result.textContent = `${textInput} is ${isPalindrome ? "" : "not "}a palindrome.`;
});

function checkPalindrome(str) {
    const cleanedStr = str
        .toLowerCase()
        .replace(/[^a-z0-9]/g, ""); // Remove non-alphanumeric characters

    return cleanedStr === cleanedStr.split("").reverse().join("");
}