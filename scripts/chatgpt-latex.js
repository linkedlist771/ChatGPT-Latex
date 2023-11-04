// ==UserScript==
// @name         🚀🚀🚀🚀LatexForChatGPT
// @namespace     latex_for_chatgpt
// @version       0.0.1
// @description  latex for chatgpt
// @author       LLinkedList771
// @run-at       document-start
// @match        https://chat.openai.com/*
// @license      MIT
// ==/UserScript==


(function() {
    'use strict';

    // ----------------- Constants -----------------

    let latexConversionInjectionInterval;
    const conversionInjectionIntervalTime = 1000; // 5 seconds, adjust as needed

    function chatgptOutputStringToLatex(inputString) {
        // Convert \( ... \) to $
        let result = inputString.replace(/\\\(/g, '$').replace(/\\\)/g, '$');
    
        // Convert \[ ... \] to $$
        result = result.replace(/\\\[|\\\]/g, '$$');
    
        return result;
    }

    function findAllCopyButtons() {
        // class : flex ml-auto
        const copyButtons = document.querySelectorAll('button.flex.ml-auto');
        return copyButtons;
    }

    function InjectLatexConversionForCopyButtons() {
        const buttons = findAllCopyButtons();
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // Delay the custom logic to ensure it runs after the default behavior
                setTimeout(() => {
                    // Read the current content of the clipboard
                    navigator.clipboard.readText().then(clipText => {
                        // Transform the LaTeX delimiters
                        const modifiedText = chatgptOutputStringToLatex(clipText);
    
                        // Copy the modified text back to the clipboard
                        navigator.clipboard.writeText(modifiedText);
                    });
                }, 100); // 100ms delay, adjust if needed
            });
        });
    }

    function startLatexConversionInjectionTimer() {
    if (!latexConversionInjectionInterval) {
        latexConversionInjectionInterval = setInterval(InjectLatexConversionForCopyButtons, conversionInjectionIntervalTime);
        console.log("Latex conversion timer started.");
    } else {
        console.log("Latex conversion timer is already running.");
    }
}

function stopLatexConversionInjectionTimer() {
    if (latexConversionInjectionInterval) {
        clearInterval(latexConversionInjectionInterval);
        latexConversionInjectionInterval = null;
        console.log("Latex conversion timer stopped.");
    } else {
        console.log("Latex conversion timer is not running.");
    }
}
// startLatexConversionTimer();



// ----------------- Styles for the new UI -----------------
function addLatexConversionStyles() {
    const styles = `
        .latex-conversion-panel {
            position: fixed;
            top: 10%;
            right: 2%;
            background-color: white;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            width: 250px;
        }
        .latex-conversion-panel.minimized {
            width: auto;
            padding: 5px;
        }
        .latex-head {
            font-weight: bold;
            margin-bottom: 10px;
        }
        .latex-title {
            display: inline-block;
        }
        .latex-toggle {
            cursor: pointer;
            float:right;
            margin-right:5px;
        }
        .latex-toggle.minimized::before {
            content: "[+]";
        }
        .latex-toggle.maximized::before {
            content: "[-]";
        }
        /* Toggle Switch Styles */
        .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
        }
        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
        }
        .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
        }
        input:checked + .slider {
            background-color: #2196F3;
        }
        input:checked + .slider:before {
            transform: translateX(26px);
        }
        .slider.round {
            border-radius: 34px;
        }
        .slider.round:before {
            border-radius: 50%;
        }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

// ----------------- UI Creation for the new functions -----------------
function createLatexConversionUI() {
    const controlDiv = document.createElement('div');
    controlDiv.className = 'latex-conversion-panel';

    controlDiv.innerHTML = `
        <div class="latex-head">
            <span class="latex-title">LaTeX Conversion Control</span>
            <span class="latex-toggle maximized"></span>
        </div>
        <div class="main">
            <label class="switch">
                <input type="checkbox" id="latexToggleSwitch">
                <span class="slider round"></span>
            </label>
            <span style="margin-left: 10px;">Start/Stop Conversion</span>
        </div>
    `;

    document.body.appendChild(controlDiv);

    const toggleIcon = controlDiv.querySelector(".latex-toggle");
    const title = controlDiv.querySelector(".latex-title");
    toggleIcon.onclick = function() {
        if (toggleIcon.classList.contains("maximized")) {
            controlDiv.querySelector(".main").style.display = "none";
            title.style.display = "none";
            toggleIcon.classList.remove("maximized");
            toggleIcon.classList.add("minimized");
            controlDiv.classList.add("minimized");
        } else {
            controlDiv.querySelector(".main").style.display = "block";
            title.style.display = "inline-block";
            toggleIcon.classList.remove("minimized");
            toggleIcon.classList.add("maximized");
            controlDiv.classList.remove("minimized");
        }
    };

    // Add event listener to the toggle switch
    document.getElementById("latexToggleSwitch").addEventListener("change", function() {
        if (this.checked) {
            startLatexConversionInjectionTimer();
        } else {
            stopLatexConversionInjectionTimer();
        }
    });

}

// ----------------- Initialization -----------------
addLatexConversionStyles();

// Ensure the UI is created after the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createLatexConversionUI);
} else {
    createLatexConversionUI();
}


})();