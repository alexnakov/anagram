const organiseByXAscending = matrix => {
  return matrix.sort((v1, v2) => { return v1[1] - v2[1]})
}

const moveDown = (matrix) => {
  let originalMatrix = matrix
  let bottomRowLetters = matrix.filter(letter => letter[2] === 100)
  let topRowLetters = matrix.filter(letter => letter[2] === 0)

  if (topRowLetters.length > 0) {
    let newXForDown = bottomRowLetters.length * 70
    let xCoordOfFarRightTopRowLetter = topRowLetters[topRowLetters.length - 1][1]

    for (let vector = 0; vector < originalMatrix.length; vector++) {
      if (originalMatrix[vector].indexOf(xCoordOfFarRightTopRowLetter) !== -1) {
        originalMatrix[vector][1] = newXForDown
        originalMatrix[vector][2] = 100

        return originalMatrix
      }
    }
  }
}

describe('moves letters down when matrix of positions is passed', () => {
  test('it should move down the last letter for 1st time correctly', () => {
    let matrix1 = [
      ['a', 0, 0],
      ['b', 70, 0],
      ['c', 140, 0],
      ['e', 210, 0],
    ]

    let matrix2 = [
      ['a', 0, 0],
      ['b', 70, 0],
      ['c', 140, 0],
      ['e', 0, 100],
    ]
    
    expect(moveDown(matrix1)).toEqual(matrix2);
  });

  test('should move the 3rd letter to the 2nd pos as its the 2nd moveDown instance', () => {
    let matrix2 = [
      ['a', 0, 0],
      ['b', 70, 0],
      ['c', 140, 0],
      ['e', 0, 100],
    ]

    let matrix3 = [
      ['a', 0, 0],
      ['b', 70, 0],
      ['c', 70, 100],
      ['e', 0, 100],
    ]

    expect(moveDown(matrix2)).toEqual(matrix3)
  });

  test('should move the 2rd letter to the 3nd pos as its the 3rd moveDown instance', () => {
    let matrix3 = [
      ['a', 0, 0],
      ['b', 70, 0],
      ['c', 70, 100],
      ['e', 0, 100],
    ]

    let matrix4 = [
      ['a', 0, 0],
      ['b', 140, 100],
      ['c', 70, 100],
      ['e', 0, 100],
    ]

    expect(moveDown(matrix3)).toEqual(matrix4)
  });
});

