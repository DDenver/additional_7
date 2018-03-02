module.exports = function solveSudoku(matrix){
  // функция проверки
  function checkMatrix(matrix) {
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (matrix[x][y] == 0){
          return false;
        }
      }
    }
    return true;
  }

  //функция поиска возможных чисел

  function searchNumber (matrix, i, j) {
    let arrNumbers = [];
    //обнуляем массив
    for (let x = 1; x < 10; x++) {
      arrNumbers[x] = 0; 
    }

    // просмотр горизонтальной строки
    for (let x = 0; x < 9; x++) {
      if (matrix[x][j] !== 0){
        arrNumbers[matrix[x][j]] = 1;
      }
    }

    // просмотр столбца
    for (let y = 0; y < 9; y++) {
      if (matrix[i][y] !== 0){
        arrNumbers[matrix[i][y]] = 1;
      }
    }

    //просмотр квадрата 3*3
    col = Math.floor(j / 3)*3;
    row = Math.floor(i / 3)*3;

    for (let x = row; x < row + 3; x++) {
      for (let y = col; y < col + 3; y++) {
        if (matrix[x][y] !== 0){
          arrNumbers[matrix[x][y]] = 1;
        } 
      }
    }

    for (let x = 1; x < 10; x++) {
      if (arrNumbers[x] == 0){
        arrNumbers[x] = x;
      } else{
        arrNumbers[x] = 0;
      }
    }

    return arrNumbers;

  }

 function sudocuSolver(matrix) {
  let i = 0;
  let j = 0;
  let suitableNumber = []; //возможные числа

  // вызо функции проверки заполнено ли всё поле
   
  //поиск незаполненной ячейки
      for (let x = 0; x < 9; x++){
        for (let y = 0; y < 9; y++) {
          if (matrix[x][y] == 0){
            i = x;
            j = y;
            break;
          };
        };
        if (matrix[x][j] == 0){
          break;
        }
      };
  
  
  // ищим все возможные варианты для заполнения ячейки
  suitableNumber = searchNumber (matrix, i, j);

  //рекурсивно просматривем все мозможные варианты

  for (let x = 1; x < 10; x++) {
    if (suitableNumber[x] !== 0){
      matrix[i][j] = suitableNumber[x];
      sudocuSolver(matrix);
    };  
  }

  if (checkMatrix(matrix)){
    return matrix;
  } else {matrix[i][j] = 0;}
}

return sudocuSolver(matrix);
};