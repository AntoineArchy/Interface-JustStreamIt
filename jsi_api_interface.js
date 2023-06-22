const URL_API = 'http://localhost:8000/api/v1/titles/'
const ORDERBYBEST = '&sort_by=-imdb_score'
const MODALINFO = ['image_url', 'title', 'year', 'duration', 'genres', 'imdb_score', 'directors', 'actors', 'countries', 'rated', 'worldwide_gross_income', 'budget_currency', 'long_description']
const MODALDEFAULT = ['No cover to display', 'Unknown title', 'Unmnow year', 'Duration unknow', 'Genres unknow', 'No IMDB score available', 'Directors unknow', 'Actors unknown', 'Countries unknow', 'Not rated or unkown rating', 'N / A', '(€/ £/$)?', 'No description available.']


function generateCategoryUrl(category, page=1) {
  return URL_API + '?page='+ page + ORDERBYBEST + '&genre=' + category;
}

async function fromUrlToJson(url) {
  return fetch(url).then(html => html.json());
}

async function fromUrlToResults(page_url) {
  json = await fromUrlToJson(page_url);

  // If the URL is not valid and the API return an error, we need to catch it
  try {
    return json['results'];
  } catch(e) {
    return [];
  }
}


async function getTitleDesc(title_id) {
  return fetch(URL_API + title_id).then(html => 
    html.json().then(json => 
      json['long_description']))
}

function FromUrlToModal(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      {
      let modalDict = {};
      let infoIdx = 0;

      // We iterate through the MODALINFO key to get them from the response, we handle error with given MODALDEFAULT
      for(modalKey of MODALINFO){
        if(data[modalKey] == null){
          modalDict[modalKey] = MODALDEFAULT[infoIdx];
        }else{
          modalDict[modalKey] = data[modalKey];
        }
        infoIdx++;
      }
      feedModalData(modalDict);
    }
  })
}