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
    let canMove = true

    if (duplicatesArray.includes(charArray[i])) {
      canMove = false
    }

    arrayOfMaps.push({
      id: i, char: charArray[i], positionX: 70*i, positionY: 100, canMove: canMove,
    })

    duplicatesArray.push(charArray[i])
  }

  return arrayOfMaps
}



module.exports = {
  generateNRandomLetters,
  createArrayOfMapsfromChars
}




