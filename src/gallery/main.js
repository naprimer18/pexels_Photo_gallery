import React from 'react';
import DynamicLoading from './dynamicLoading';
import PexelsAPI from 'pexels-api-wrapper'

export default class Main extends React.Component {
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

    pexelsClient.getPopularPhotos(80, 1)
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

