import React,{Component} from 'react';
import { connect } from 'react-redux'
import logo from './logo.png';

/// utils 
const collectionSuggestedPhotos =  [
    'paint','house','water','country','autumn','food',
    'underwater','game','kiss','nature',"nature",
    "nature wallpaper","natural","nature background",
    "naturaleza","natur","nature videos","natureza",
    "nature photography","natur wallpaper","nature beauty",
    "nature video","natura","natural beauty","naturaleza 4k",
    "love","love wallpaper","lonely","love story","lovers",
    "love background","loneliness","lovely","love symbol",
    "lavender","love couple","lover","live",
    "love heart touching","livestock"];

const randomTypePhotos = (heap) => {
    const collection = new Set();
    while(collection.size < 7) {
        collection.add(heap[Math.floor(Math.random() * 40)])
    }
    return collection
}

// utils 

class Header extends Component {
    state = { 
        arraySuggestedCategories: randomTypePhotos(collectionSuggestedPhotos),
        valueToSerch:''
    }

    scrollMenu = () => {
        let element = document.getElementById("isHidenBlock");
        let scrollTop = window.scrollY;
        if (scrollTop > 240) {
            element.classList.add("nav-bar-is-show-back-ground");
        } else {
            element.classList.remove("nav-bar-is-show-back-ground");
        }
    }

    componentDidMount() {
        this.props.onGetPhoto();
        document.addEventListener("scroll", this.scrollMenu);
        window.addEventListener('keydown',this.keydownCall);
    }

    keydownCall = (e) => {
        if(this.state.valueToSerch !== '' && e.key === 'Enter') {
            this.props.onGetSuggestedCollection(this.state.valueToSerch);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown',this.keydownCall);
        document.removeEventListener("scroll", this.scrollMenu);
    }
    
    randomPhoto = () => {
        return Math.floor(Math.random() * 10);
    }

    onChangeFilter = (e) => {
        this.setState({valueToSerch:e.target.value});
    }

    onClickFilter = () => {
        if(this.state.valueToSerch !== '') {
            this.props.onGetSuggestedCollection(this.state.valueToSerch);
        }
    }

    render() {
        return (
        <header className='header-container'>
            <nav className='main-nav-bar' id="isHidenBlock">
                <a href="/" className='main-nav-bar__logo' onClick={() => {this.props.onOriginPhoto()}}>
                    <img className="logo-img" src={logo} alt="Logo" />
                    <div className="pexels-logo-text is-hiden-800">Pexels</div>
                </a>
                <div className="main-nav-bar__search">
                    <input 
                        onChange={this.onChangeFilter}
                        value={this.state.valueToSerch}
                        id="searchMain"
                        placeholder="Search for free photos"
                    >
                    </input>
                    <button onClick={this.onClickFilter}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"> 
                            </path>
                        </svg>
                    </button>
                </div>
                <ul className='main-nav-bar__sub-nav is-hiden-800'>
                    <li>
                        <a href="/" className="main-nav-bar__sub-nav__item">Explore</a>
                    </li>
                    <li>
                        <a href="/" className="main-nav-bar__sub-nav__item" >License</a>
                    </li>
                    <li>
                        <a href="/" className="main-nav-bar__sub-nav__item">Upload</a>
                    </li>
                    <li>
                        <a href="/" className="main-nav-bar__sub-nav__item--button">Join</a>
                    </li>     
                </ul>
            </nav>
            <section className="middle-header-section">
                <h1>The best free stock photos & videos shared by talented creators.</h1>
                <div className="middle-header-section__search">
                    <input  
                        id="search"
                        placeholder="Search for free photos"
                        onChange={this.onChangeFilter}
                        value={this.state.valueToSerch}
                    >
                    </input>
                    <button onClick={this.onClickFilter}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"> 
                            </path>
                        </svg>
                    </button>
                </div>
                <div className="middle-header-section__search-tags">
                    <ul>
                        <li className="middle-header-section__search-tags-container__suggested">Suggested:</li>
                        {Array.from(this.state.arraySuggestedCategories).map((item,key) => (
                            <li onClick={() => this.props.onGetSuggestedCollection(item)} key={key} className="middle-header-section__search-tags-container__tag">{item}</li>
                        ))}
                    </ul>
                </div>                
            </section>

            {this.props.PhotoRandomFromCollection ? 
            <>
                    <img className="back-ground-photo" src={this.props.PhotoRandomFromCollection.src.original}/>
                    <section className="heder-footer">
                        <div className="heder-footer--item"></div>
                        <a href="/"target="_blank" rel='noopener noreferrer' href={this.props.PhotoRandomFromCollection.photographer_url} className='heder-footer--item-right'>
                                Photo by {this.props.PhotoRandomFromCollection.photographer}
                        </a>
                    </section>
            </>
            : null}
            
        </header>
        );
    }
}

const mapStateToProps = state => ({
    PhotoRandomFromCollection:state.RandomPhoto
  });
  
  const mapDispatchToProps = dispatch => ({
    onGetPhoto: () => {
        dispatch({ type:'GET_RANDOM_PHOTO_COLLECTION'})
      },
    onGetSuggestedCollection: (nameCollection) => {
        dispatch({ type:'GET__SUGGESTED_PHOTO_COLLECTION', payload: nameCollection})
      },
    onOriginPhoto: () => {
        dispatch({ type:'GET_PHOTO_COLLECTION'})
      }
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header)