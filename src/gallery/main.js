import React from 'react';
import DynamicLoading from './dynamicLoading';
import { connect } from 'react-redux'

class Main extends React.Component {
  constructor() {
    super();
    this.state = { width: -1 };
  }
  
  componentDidMount() {
    this.props.onGetPhoto();
  }
  
  getValidObjectPhotos = () => {
    let validPhotos = this.props.PhotoCollection.photos.map(item => {
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
    return validPhotos;
  }

  render() {
    if (this.props.PhotoCollection.photos) {
      return (
        <div className="App">
          <DynamicLoading photos={this.getValidObjectPhotos()} />
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

const mapStateToProps = state => ({
  PhotoCollection:state.OriginPhoto
});

const mapDispatchToProps = dispatch => ({
  onGetPhoto: () => {
      dispatch({ type:'GET_PHOTO_COLLECTION'})
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main)
