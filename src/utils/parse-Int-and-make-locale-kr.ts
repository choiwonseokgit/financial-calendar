const parseIntAndMakeLocaleKR = (moneyStr: string) => {
  return parseInt(moneyStr).toLocaleString('ko-KR');
};

export default parseIntAndMakeLocaleKR;
