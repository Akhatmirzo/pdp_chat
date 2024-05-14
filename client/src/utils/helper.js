function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

function calcTime(date) {
  const time = date.split("T")[1].split(".");

  return time[0];
}

function checkEmptySpace(string) {
  let newStr = "";
  let letterPosStart = null;
  let letterPosEnd = null;
  
  for (let i = 0; i < string.length; i++) {
    if (string[i] !== " ") {
        letterPosStart = i;
      break;
    }
  }
  
  for (let i = string.length - 1; i >= 0; i--) {
    if (string[i] !== " ") {
        letterPosEnd = i;
      break;
    }
  }
  
  newStr = string.slice(letterPosStart, letterPosEnd);
  return newStr;
}

export { convertToBase64, calcTime, checkEmptySpace };
