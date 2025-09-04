// 1. 기본 URL과 발급받은 키를 변수로 저장합니다.
const BASE_URL = "https://apis.data.go.kr/B552584/ArpltnInforInqireSvc";

// 👇 여기에 발급받은 인증키(Decoding)를 붙여넣으세요.
const API_KEY =
  "c50fe9762097b04c8d0d7bb35862342292b9de73446ed44f264f9f42d36c5a6e";

export async function fetchMonthlyDustData(stationName: string) {
  const params = new URLSearchParams({
    serviceKey: API_KEY,
    returnType: "json",
    numOfRows: "100", // 데이터를 충분히 가져오기 위해 행 수 늘림
    pageNo: "1",
    stationName: stationName,
    dataTerm: "MONTH", // 'DAILY' 대신 'MONTH'로 변경
    ver: "1.3", // 월간 데이터는 최신 버전(1.3) 필요
  });

  const response = await fetch(
    `${BASE_URL}/getMsrstnAcctoRltmMesureDnsty?${params}`
  );
  if (!response.ok) {
    throw new Error("API 요청에 실패했습니다.");
  }
  return response.json();
}

export async function fetchStations(sidoName: string) {
  const params = new URLSearchParams({
    serviceKey: API_KEY,
    returnType: "json",
    sidoName: sidoName,
  });

  const response = await fetch(
    `${BASE_URL}/getCtprvnRltmMesureDnsty?${params}`
  );
  if (!response.ok) {
    throw new Error("API 요청에 실패했습니다.");
  }
  return response.json();
}

export async function fetchDustData(stationName: string) {
  const params = new URLSearchParams({
    serviceKey: API_KEY,
    returnType: "json",
    numOfRows: "1",
    pageNo: "1",
    stationName: stationName,
    dataTerm: "DAILY",
    ver: "1.0",
  });

  const response = await fetch(
    `${BASE_URL}/getMsrstnAcctoRltmMesureDnsty?${params}`
  );
  if (!response.ok) {
    throw new Error("API 요청에 실패했습니다.");
  }
  return response.json();
}
