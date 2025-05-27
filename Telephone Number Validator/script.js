document.addEventListener("DOMContentLoaded", function () {
    const userInput = document.getElementById("user-input");
    const checkBtn = document.getElementById("check-btn");
    const clearBtn = document.getElementById("clear-btn");
    const resultsDiv = document.getElementById("results-div");

    function validatePhoneNumber() {
        const input = userInput.value.trim();

        if (input === "") {
            alert("Please provide a phone number");
            return;
        }

        // ✅ FreeCodeCamp Testlerine Uygun Regex
        const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s\-]?)\d{3}([\s\-]?)\d{4}$/;

        if (phoneRegex.test(input)) {
            resultsDiv.textContent = `Valid US number: ${input.trim()}`; // ✅ Boşluk temizlendi
            resultsDiv.style.color = "green";
        } else {
            resultsDiv.textContent = `Invalid US number: ${input.trim()}`;
            resultsDiv.style.color = "red";
        }
    }

    function clearResults() {
        resultsDiv.textContent = "";
        userInput.value = "";
    }

    checkBtn.addEventListener("click", validatePhoneNumber);
    clearBtn.addEventListener("click", clearResults);
});