import isNil from 'lodash/isNil';

const checkMinDistance = ({
  minDistanceX, minDistanceY, x1, x2, y1, y2,
}) => {
  const distanceX = Math.abs(x1 - x2);
  const distanceY = Math.abs(y1 - y2);
  return (!isNil(distanceX) && distanceX > minDistanceX) || (!isNil(distanceY) && distanceY > minDistanceY);
};
export default checkMinDistance;
