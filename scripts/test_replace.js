console.log("test_replace.js loaded");

function replaceLatexBlock(inputString) {
    const inputSize = inputString.length;
    let newString = inputString.split(''); 
    for (let i = 0; i < inputSize - 1; i++) {
         if(inputString[i] == '\\' && inputString[i+1] == '[') {
            console.log(`found \\[ at ${i}`);
            newString[i] = '$';
            newString[i+1] = '$';
            console.log(`inputString: ${newString}`);
         }
         else if(inputString[i] == '\\' && inputString[i+1] == ']') {
            newString[i] = '$';
            newString[i+1] = '$';
         }
    }
    return newString.join(''); 
}

let testString = "\\[x^2\\]";
console.log(`testString: ${testString}`);
let result = replaceLatexBlock(testString);
console.log(`result: ${result}`);