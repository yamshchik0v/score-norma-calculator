export default function calcResult(data) {
  console.log(data);
  let { workTime, projTime, ...normas } = data;
  const normasArr = Object.values(normas);
  let cleanWorkTime = workTime - projTime;
  let allNormaTime = normasArr
    .map((norma) => norma[0] * norma[1])
    .reduce((prev, curr) => prev + curr, 0);
  const timeLeft = cleanWorkTime - allNormaTime;
  let hoursLeft = Math.round(timeLeft / 60);
  let minutesLeft = timeLeft - hoursLeft * 60;
  console.log('normas: ', normas);
  return {
    normaReady: timeLeft <= 0,
    workTime,
    projTime,
    timeLeft,
    hoursLeft,
    minutesLeft,
    normasArr,
  };
}
