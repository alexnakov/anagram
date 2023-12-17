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

function moveLetterUp(letter, layoutArr) {
  var upRow = layoutArr[0]
  var downRow = layoutArr[1]
  
  const arrWithDuplicates = downRow.filter(char => char === letter)
  const firstNonLetterIndex = upRow.indexOf('')

  if (arrWithDuplicates.length !== 0) {
    upRow[firstNonLetterIndex] = arrWithDuplicates[0]
    const indexOfFirstLetterInDownRow = downRow.indexOf(letter)

    downRow[indexOfFirstLetterInDownRow] = ''
    
    return [[...upRow], [...downRow]]
  }
}


test('should move a letter up', () => {
  let layoutArr1 = [
    ['','','','','','','','',''],
    ['a','b','c','d','e','f','g','h','i']
  ]

  let layoutArr2 = [
    ['h','','','','','','','',''],
    ['a','b','c','d','e','f','g','','i']
  ]
  expect(moveLetterUp('h', layoutArr1)).toEqual(layoutArr2)
})

test('should move a letter up', () => {
  let layoutArr1 = [
    ['','','','','','','','',''],
    ['a','b','c','d','e','f','g','h','i']
  ]

  let layoutArr2 = [
    ['i','','','','','','','',''],
    ['a','b','c','d','e','f','g','h','']
  ]
  expect(moveLetterUp('i', layoutArr1)).toEqual(layoutArr2)
})

test('should move a letter up, handle duplicates', () => {
  let layoutArr1 = [
    ['','','','','','','','',''],
    ['a','b','c','d','e','d','g','h','i']
  ]

  let layoutArr2 = [
    ['d','','','','','','','',''],
    ['a','b','c','','e','d','g','h','i']
  ]
  expect(moveLetterUp('d', layoutArr1)).toEqual(layoutArr2)
})

