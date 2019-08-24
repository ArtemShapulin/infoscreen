const getCallbackByVector = ({
  x1, x2, y1, y2, callbackNameSpace, callbacks,
}) => {
  const distanceX = x1 - x2;
  const distanceY = y1 - y2;
  const dominantVector = Math.abs(distanceX) > Math.abs(distanceY)
    ? { value: callbackNameSpace.X, isIncr: !!(Math.sign(distanceX) + 1), nameVector: 'x' }
    : { value: callbackNameSpace.Y, isIncr: !!(Math.sign(distanceY) + 1), nameVector: 'y' };
  const nameCallback = dominantVector.isIncr ? dominantVector.value.INCR : dominantVector.value.DECR;

  return { callback: callbacks[nameCallback], vector: dominantVector.nameVector };
};

export default getCallbackByVector;
