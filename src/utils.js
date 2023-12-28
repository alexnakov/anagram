const generateNRandomLetters = n => {
  /**
   * Return an array of n random letters
   * e.g. n = 4 -> ['t','e','w','e']
   */
  const alphabet = 'qwertyuioplkjhgfdsazxcvbnm'
  const returnArray = []
  for (let i = 0; i < n; i++) {
    returnArray.push(alphabet[Math.floor(Math.random() * alphabet.length)])   
  }

  return returnArray
}

const createArrayOfMapsfromChars = charArray => {
  const arrayOfMaps = []
  const duplicatesArray = []

  for (let i = 0; i < charArray.length; i++) {
    let canMoveUp = true

    if (duplicatesArray.includes(charArray[i])) {
      canMoveUp = false
    }

    arrayOfMaps.push({
      id: i, char: charArray[i], positionX: 70*i, positionY: 100, 
      canMoveUp: canMoveUp, canMoveDown: false,
    })

    duplicatesArray.push(charArray[i])
  }

  return arrayOfMaps
}

const sampleData = [
  { id: 0, char: 'v', positionX: 0, positionY: 100, canMoveUp: true, canMoveDown: false },
  { id: 1, char: 'x', positionX: 70, positionY: 100, canMoveUp: true, canMoveDown: false },
  { id: 2, char: 'w', positionX: 140, positionY: 100, canMoveUp: true, canMoveDown: false },
  { id: 3, char: 'k', positionX: 210, positionY: 100, canMoveUp: true, canMoveDown: false },
  { id: 4, char: 'p', positionX: 280, positionY: 100, canMoveUp: true, canMoveDown: false },
  { id: 5, char: 'b', positionX: 350, positionY: 100, canMoveUp: true, canMoveDown: false },
  { id: 6, char: 'z', positionX: 420, positionY: 100, canMoveUp: true, canMoveDown: false },
  { id: 7, char: 'n', positionX: 490, positionY: 100, canMoveUp: true, canMoveDown: false },
  { id: 8, char: 'p', positionX: 560, positionY: 100, canMoveUp: false, canMoveDown: false }
]

console.log(sampleData.find(charObj => charObj.positionY === 100) === undefined)



