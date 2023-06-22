const CATONDISPLAY = ['horror', 'crime','biography'];

class Carousel {
  constructor (category, carousel_parent, title_data=null) {
    this.category = category;   
    buildCarouselHtml (this.category, carousel_parent).then (car_content => {
      this.carouselContent = car_content;
      if (title_data !== null) {
        this.feedCarousel (this.carouselContent, title_data);
        return car_content;
      }
    })
  }

  async feedCarousel(carouselContent, title_data){
    for (const movie of title_data) {
      generateMovieBox (movie).then (box => {
        carouselContent.appendChild (box);
      }) 
    }
  }
}


async function getCarouselConstructorData (category, nbr_of_title, actual_page=1, title_data = []){
  let page_url = generateCategoryUrl (category, actual_page);
  let title_on_this_page = await fromUrlToResults (page_url);

  while (title_data.length < nbr_of_title){
    if (title_on_this_page.length == 0){
      actual_page++;
      title_data = getCarouselConstructorData (category, nbr_of_title, actual_page, title_data);
      break

    }

    const title = title_on_this_page[0];
    title_on_this_page = title_on_this_page.slice (1);
    try{
      const img_src = title['image_url'];
      const title_id = title['id'];
      const title_txt = title['title'];

      title_data.push ([img_src, title_id, title_txt]);
    
    } catch(e){
      console.log ('Trouble while registering carousel');
      console.log (e);
    }
  }
  return title_data;
}

async function ConstructCarousel (category_to_construct_from, nbr_title_to_display=3, carousel_parent='.carousels'){
  getCarouselConstructorData (category_to_construct_from, nbr_title_to_display).then(constructor_data => {
    new Carousel (category_to_construct_from, carousel_parent, constructor_data);
  })  
}

async function ConstructStarMovie (movie, parent_name){
  getTitleDesc (movie[1]).then (title_desc => {
    movie.push (title_desc);
    parent = document.querySelector (parent_name);
    generateStarMovie (movie).then (best_movie_box => {
      parent.insertBefore (best_movie_box, parent.firstChild);
    })
  })
}

async function ConstructAllTimeBest () {
  getCarouselConstructorData ('', 8).then (best_data => {
    best_of_all_time = best_data[0];
    ConstructStarMovie (best_of_all_time, '.all-time-best');
    
    best_car_data = best_data.slice (1);
    best_car = new Carousel ('best', '.all-time-best', best_car_data);
  })
}

async function GenerateJSI () {
  ConstructAllTimeBest ();

  for (categoryTags of CATONDISPLAY){
    ConstructCarousel (categoryTags, 7);
  }
}

window.addEventListener ('load', () => {
  GenerateJSI ();
})