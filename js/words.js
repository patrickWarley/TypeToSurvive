//number = number of words
//length = size of the words

//fuck fuck fuck me sideways
//FUCKKKKKKKKKKKK!
//at least for the time being I cant do anything on this fucking place

var url = "https://random-word-api.herokuapp.com/word?"

export async function getWords(numberOfWords, length) {
  let urlTest = 'https://random-word-api.herokuapp.com/all';

  let requestUrl = url.concat(`number=${numberOfWords}&length=${length}`);

  let request = await fetch(urlTest, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  });

  console.log(request);
}
