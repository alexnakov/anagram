const fs = require('fs')

console.log('Current directory:', process.cwd());

fs.readFile('/Users/user/repos/anagram/src/data/combined_words.json', 'utf8', (err, data) => {
  if (err) {
    console.log("err reading your json file", err)
    return;
  }
  
  try {
    const jsonData = JSON.parse(data);
    console.log(jsonData[1]);
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
})
