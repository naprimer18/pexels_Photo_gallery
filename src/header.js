import PexelsAPI from 'pexels-api-wrapper'

import React,{Component} from 'react';
export default class Header extends Component {
    state={}
    componentDidMount() {
        this.loadPhotos();
      }
    loadPhotos = () => {

    let API_KEY = "563492ad6f917000010000014640aabb4e9d420cbe1c0df7daf4c2bf"  
    let pexelsClient = new PexelsAPI(API_KEY);

    pexelsClient.getCuratedPhotos(10, 1)
        .then((result) => {
            this.setState({randomHeaderPhoto: result.photos[this.randomPhoto()]})
            })
        .catch(function(e){ console.err(e); });
    }
    randomPhoto = () => {
        return Math.floor(Math.random() * 11)
    }
    render() {
        console.log(this.state.randomHeaderPhoto)
        return (
        <header className='header-container'>
           {this.state.randomHeaderPhoto ? <img src={this.state.randomHeaderPhoto.src.original}/>
           : null}
        </header>
        );
    }
}
