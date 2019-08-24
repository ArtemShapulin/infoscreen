const calculateMinDistance = ({
  screenX, screenY, coefficientX, coefficientY,
}) => {
  const screenCoefficientX = screenX / 100;
  const screenCoefficientY = screenY / 100;
  return { minDistanceX: screenCoefficientX * coefficientX, minDistanceY: screenCoefficientY * coefficientY };
};

export default calculateMinDistance;
