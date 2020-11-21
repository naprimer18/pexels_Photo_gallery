import React from 'react';
import ReactDOM from 'react-dom';
import jsonp from 'jsonp';
import DynamicLoading from './DynamicLoading';
import PexelsAPI from 'pexels-api-wrapper'

class App extends React.Component {
  constructor() {
    super();
    this.state = { width: -1 };
  }
  componentDidMount() {
    this.loadPhotos();
  }
  loadPhotos = () => {
    
    let API_KEY = "563492ad6f917000010000014640aabb4e9d420cbe1c0df7daf4c2bf"  
    let pexelsClient = new PexelsAPI(API_KEY);

    pexelsClient.getPopularPhotos(100, 1)
    .then((result) => {
        let photos = result.photos.map(item => {
          return {
            src: item.src.original,
            width: parseInt(item.width),
            height: parseInt(item.height),
            title: item.title,
            key: item.id,
            photographer: item.photographer,
            photographer_id: item.photographer_id,
            photographer_url: item.photographer_url,
            url: item.url,
            srcSet: [
              `${item.src.landscape}`,
              `${item.src.large}`,
              `${item.src.large2x}`,
              `${item.src.medium}`,
              `${item.src.original}`,
              `${item.src.portrait}`,
              `${item.src.small}`,
              `${item.src.tiny}`
                          ],
            sizes: '(min-width: 480px) 50vw, (min-width: 1024px) 33.3vw, 100vw',
          };
        })
        
        this.setState({
          photos: this.state.photos ? this.state.photos.concat(photos) : photos,
        });
      
    })

    // const urlParams = {
    //   api_key: '455b5e2fa6b951f9b9ab58a86d5e1f8a',
    //   photoset_id: '72157708141247864',
    //   user_id: '146659101@N08',
    //   format: 'json',
    //   per_page: '120',
    //   extras: 'url_m,url_c,url_l,url_h,url_o',
    // };

    // let url = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos';
    // url = Object.keys(urlParams).reduce((acc, item) => {
    //   return acc + '&' + item + '=' + urlParams[item];
    // }, url);

    // jsonp(url, { name: 'jsonFlickrApi' }, (err, data) => {
    //   console.log("result 2 ", data.photoset.photo[0])
    //   let photos = data.photoset.photo.map(item => {
    //     return {
    //       src: item.url_l,
    //       width: parseInt(item.width_o),
    //       height: parseInt(item.height_o),
    //       title: item.title,
    //       alt: item.title,
    //       key: item.id,
    //       srcSet: [
    //         `${item.url_m} ${item.width_m}w`,
    //         `${item.url_c} ${item.width_c}w`,
    //         `${item.url_l} ${item.width_l}w`,
    //         `${item.url_h} ${item.width_h}w`,
    //       ],
    //       sizes: '(min-width: 480px) 50vw, (min-width: 1024px) 33.3vw, 100vw',
    //     };
    //   });
    //   console.log('photos ',photos[0])
    //   this.setState({
    //     photos: this.state.photos ? this.state.photos.concat(photos) : photos,
    //   });
    // });

  }

  render() {
    if (this.state.photos) {
      console.log("photo ", this.state.photos )
      return (
        <div className="App">
          <DynamicLoading photos={this.state.photos} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <div id="msg-app-loading" className="loading-msg">
            Loading
          </div>
        </div>
      );
    }
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
