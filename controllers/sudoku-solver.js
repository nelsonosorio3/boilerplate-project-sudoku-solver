class SudokuSolver {

  validate(puzzleString) {
    if(puzzleString.length !== 81) return false;
    if (/[^1-9\.]/.test(puzzleString)) return false;
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let selectedRow = "";
    switch (row){
      case "A":
        selectedRow = puzzleString.slice(0, 9);
        break;
      case "B":
        selectedRow = puzzleString.slice(9, 18);
        break;
      case "C":
        selectedRow = puzzleString.slice(18, 27);
        break;
      case "D":
        selectedRow = puzzleString.slice(27, 36);
        break;
      case "E":
        selectedRow = puzzleString.slice(36, 45);
        break;
      case "F":
        selectedRow = puzzleString.slice(45, 54);
        break;
      case "G":
        selectedRow = puzzleString.slice(54, 63);
        break;
      case "H":
        selectedRow = puzzleString.slice(63, 72);
        break;
      case "I":
        selectedRow = puzzleString.slice(72, 81);
        break;
    }
    let selectedValue = selectedRow[column-1];
    if(selectedValue === ".") return !selectedRow.includes(value)
    return selectedValue == value
  }

  checkColPlacement(puzzleString, row, column, value) {
    let selectedColumn = "";
    for (let i = 0; i<9; i++){
      selectedColumn += puzzleString[(column-1)+ (9*i)];
    }
    let selectedValue = selectedColumn[row.charCodeAt()-65];
    if(selectedValue === ".") return !selectedColumn.includes(value);
    return selectedValue == value;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let regionsRow;
    let regionsColumn;
    let region;
    let selectedRegion = "";
    let puzzleStringRows = [];
    for (let i=0; i<9; i++){
      puzzleStringRows.push(puzzleString.slice(i*9, (i+1)*9));
    }
    if(row === "A" || row === "B" || row === "C") regionsRow = [1, 2, 3];
    else if(row === "D" || row === "E" || row === "F") regionsRow = [4, 5, 6];
    else if(row === "G" || row === "H" || row === "I") regionsRow = [7, 8, 9];

    if(column < 4) regionsColumn = [1, 4, 7];
    else if(column < 7) regionsColumn = [2, 5, 8];
    else regionsColumn = [3, 6, 9];

    while(regionsRow.length){
      let regionR = regionsRow.pop();
      if(regionsColumn.includes(regionR)){
        region = regionR;
        break;
      } 
    }

    switch(region){
      case 1:
        selectedRegion = puzzleString.slice(0,3) + puzzleString.slice(9, 12) + puzzleString.slice(18, 21);
        break;
      case 2:
        selectedRegion = puzzleString.slice(3,6) + puzzleString.slice(12, 15) + puzzleString.slice(21, 24);
        break;
      case 3:
        selectedRegion = puzzleString.slice(6, 9) + puzzleString.slice(15, 18) + puzzleString.slice(24, 27);
        break;
      case 4:
        selectedRegion = puzzleString.slice(27, 30) + puzzleString.slice(36, 39) + puzzleString.slice(45, 48);
        break;
      case 5:
        selectedRegion = puzzleString.slice(30, 33) + puzzleString.slice(39, 42) + puzzleString.slice(48, 51);
        break;
      case 6:
        selectedRegion = puzzleString.slice(33, 36) + puzzleString.slice(42, 45); + puzzleString.slice(51, 54);
        break;
      case 7:
        selectedRegion = puzzleString.slice(54, 57) + puzzleString.slice(63, 66) + puzzleString.slice(72, 75);
        break;
      case 8:
        selectedRegion = puzzleString.slice(57, 60) + puzzleString.slice(66, 69) + puzzleString.slice(75, 78);
        break;
      case 9:
        selectedRegion = puzzleString.slice(60, 63) + puzzleString.slice(69, 72) + puzzleString.slice(78, 81);
        break;
    }

    let selectedColumn = "";
    for (let i = 0; i<9; i++){
      selectedColumn += puzzleString[(column-1)+ (9*i)];
    }
    let selectedValue = selectedColumn[row.charCodeAt()-65];

  if(selectedValue === ".") return !selectedRegion.includes(value);
  return selectedValue == value;

  }

  solve(puzzleString) {
    let puzzleArray = puzzleString.split("");
    let count = 0;
    let emergencyCount = 0;
    let row = "";
    let column = 0;
    while(puzzleArray.includes(".") && count < 2 && emergencyCount < 20){
      for(let i = 0; i<puzzleArray.length; i++){
        if(i<9) row = "A";
        else if(i<18) row = "B";
        else if(i<27) row = "C";
        else if (i<36) row = "D";
        else if (i<45) row = "E";
        else if (i<54) row = "F";
        else if (i<63) row = "G";
        else if (i<72) row = "H";
        else if (i<81) row = "I";

        column = (i%9) + 1;
        if(puzzleArray[i] === "."){
          let isValid = true;
          let validNumbers = [];
          for(let j = 1; j<10; j++){
            isValid = this.checkRowPlacement(puzzleArray.join(""), row, column, j);
            isValid = isValid && this.checkColPlacement(puzzleArray.join(""), row, column, j);
            isValid = isValid && this.checkRegionPlacement(puzzleArray.join(""), row, column, j);
            if(isValid) {
              validNumbers.push(j);
              count = 0;
            }
          }
          if(validNumbers.length === 1) puzzleArray[i] = validNumbers[0];
        }
      }
      count += 1;
      emergencyCount += 1;
    }
    if (puzzleArray.includes(".")) return false;
    return puzzleArray.join("");
  }
}

module.exports = SudokuSolver;

