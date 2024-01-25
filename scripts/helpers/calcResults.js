export default function calcResult(data) {
  const { workTime, projTime, normas } = data;
  const cleanWorkTime = +workTime - +projTime;
  const allNormaTime = normas.reduce((prev, curr) => curr.scoreTime * curr.quantity + prev, 0);
  const timeUntilEnd = cleanWorkTime - allNormaTime
  const hoursLeft = Math.round(timeUntilEnd / 60);
  const minutesLeft = timeUntilEnd - hoursLeft * 60;
  const normaReady = timeUntilEnd <= 0;

  return {
    workTime,
    projTime,
    cleanWorkTime,
    normas,
    allNormaTime,
    timeUntilEnd,
    hoursLeft,
    minutesLeft,
    normaReady,
  };
}
