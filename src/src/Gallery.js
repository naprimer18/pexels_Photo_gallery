import React, { useState, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import Photo, { photoPropType } from './Photo';
import { computeColumnLayout } from './layouts/columns';

const Gallery = React.memo(function Gallery({
  photos,
  direction,
  margin
}) {
  const [containerWidth, setContainerWidth] = useState(0);
  const galleryEl = useRef(null);

  useLayoutEffect(() => {
    let animationFrameID = null;
    const observer = new ResizeObserver(entries => {
      // only do something if width changes
      const newWidth = entries[0].contentRect.width;
      if (containerWidth !== newWidth) {
        // put in an animation frame to stop "benign errors" from
        // ResizObserver https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
        animationFrameID = window.requestAnimationFrame(() => {
          setContainerWidth(Math.floor(newWidth));
        });
      }
    });
    observer.observe(galleryEl.current);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrameID);
    };
  });

  if (!containerWidth) return <div ref={galleryEl}>&nbsp;</div>;
 
  const width = containerWidth - 1;
  let galleryStyle, thumbs,columns;
  
  if (containerWidth >= 500) columns = 2;
  if (containerWidth >= 900) columns = 3;
  if (containerWidth >= 1500) columns = 4;
    
  galleryStyle = { position: 'relative' };
  thumbs = computeColumnLayout({ containerWidth: width, columns, margin, photos });
  galleryStyle.height = thumbs[thumbs.length - 1].containerHeight;


  return (
    <div className="react-photo-gallery--gallery">
      <div ref={galleryEl} style={galleryStyle}>
        {thumbs.map((thumb, index) => {
          const { left, top, containerHeight, ...photo } = thumb;
          return Photo({
            left,
            top,
            key: thumb.key || thumb.src,
            containerHeight,
            index,
            margin,
            direction,
            photo,
          });
        })}
      </div>
    </div>
  );
});

Gallery.propTypes = {
  photos: PropTypes.arrayOf(photoPropType).isRequired,
  direction: PropTypes.string,
  targetRowHeight: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  limitNodeSearch: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  margin: PropTypes.number
};

Gallery.defaultProps = {
  margin: 10,
  direction: 'column',
  targetRowHeight: 300,
};
export { Photo };
export default Gallery;
