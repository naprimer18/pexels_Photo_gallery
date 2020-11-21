import { round } from '../utils/round';

export const computeColumnLayout = ({ photos, columns, containerWidth, margin }) => {
  let colWidth = (containerWidth - margin * 2 * columns) / columns;
  const photosWithSizes = photos.map(photo => {
    const newHeight = photo.height / photo.width * colWidth;
    return {
      ...photo,
      width: round(colWidth, 1),
      height: round(newHeight, 1),
    };
  });
  const colLeftPositions = [];
  const colCurrTopPositions = [];
  for (var i = 0; i < columns; i++) {
    colLeftPositions[i] = round(i * (colWidth + margin * 2), 1);
    colCurrTopPositions[i] = 0;
  }

  const photosPositioned = photosWithSizes.map(photo => {
    const smallestCol = colCurrTopPositions.reduce((acc, item, i) => {
      acc = item < colCurrTopPositions[acc] ? i : acc;
      return acc;
    }, 0);

    photo.top = colCurrTopPositions[smallestCol];
    photo.left = colLeftPositions[smallestCol];
    colCurrTopPositions[smallestCol] = colCurrTopPositions[smallestCol] + photo.height + margin * 2;

    const tallestCol = colCurrTopPositions.reduce((acc, item, i) => {
      acc = item > colCurrTopPositions[acc] ? i : acc;
      return acc;
    }, 0);
    photo.containerHeight = colCurrTopPositions[tallestCol];
    return photo;
  });
  return photosPositioned;
};
