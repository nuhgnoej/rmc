import { useQuery } from "@tanstack/react-query";
import { fetchStations } from "../api";
import { useState } from "react";
import { Link } from "react-router-dom";

// API 응답 데이터 타입을 더 구체적으로 정의합니다.
interface IStationItem {
  stationName: string;
  pm10Value: string;
  pm25Value: string;
}

// 미세먼지 수치에 따라 등급과 색상을 반환하는 헬퍼 함수
const getDustGrade = (valueStr: string) => {
  const value = parseInt(valueStr, 10); // 문자열을 숫자로 변환
  if (isNaN(value)) return { grade: "정보 없음", color: "bg-gray-400" };
  if (value <= 30) return { grade: "좋음", color: "bg-blue-500" };
  if (value <= 80) return { grade: "보통", color: "bg-green-500" };
  if (value <= 150) return { grade: "나쁨", color: "bg-yellow-500" };
  return { grade: "매우 나쁨", color: "bg-red-500" };
};

function Home() {
  const [selectedSido, setSelectedSido] = useState<string>("서울");

  const sidoList = [
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "경기",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
    "세종",
  ];

  const { isLoading: stationsLoading, data: stationsData } = useQuery({
    queryKey: ["stations", selectedSido],
    queryFn: () => fetchStations(selectedSido),
    enabled: !!selectedSido,
  });

  console.log("측정소 데이터 전체:", stationsData);

  const stationList: IStationItem[] = stationsData?.response?.body?.items || [];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-primary">
        전국 미세먼지 현황
      </h1>

      <div className="flex gap-8">
        {/* 왼쪽: 시/도 선택 목록 */}
        <aside className="w-1/4">
          <h2 className="text-xl font-semibold mb-4">지역 선택</h2>
          <ul className="space-y-2">
            {sidoList.map((sido) => (
              <li key={sido}>
                <button
                  onClick={() => setSelectedSido(sido)}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    selectedSido === sido
                      ? "bg-primary text-background"
                      : "hover:bg-secondary hover:bg-opacity-20"
                  }`}
                >
                  {sido}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* 오른쪽: 측정소별 현황 */}
        <main className="w-3/4">
          <h2 className="text-xl font-semibold mb-4">
            {selectedSido} 측정소 현황
          </h2>
          {stationsLoading ? (
            <div>로딩 중...</div>
          ) : (
            <ul className="space-y-4">
              {stationList.map((station) => {
                const pm10 = getDustGrade(station.pm10Value);
                const pm25 = getDustGrade(station.pm25Value);
                return (
                  <Link
                    key={station.stationName}
                    to={`/${encodeURIComponent(station.stationName)}`}
                  >
                    <li
                      key={station.stationName}
                      className="p-4 rounded-lg bg-secondary bg-opacity-10"
                    >
                      <h3 className="text-lg font-bold mb-3">
                        {station.stationName}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>미세먼지 (PM10)</span>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1 text-sm text-background rounded-full ${pm10.color}`}
                            >
                              {pm10.grade}
                            </span>
                            <span className="font-semibold">
                              {station.pm10Value}µg/m³
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>초미세먼지 (PM2.5)</span>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1 text-sm text-background rounded-full ${pm25.color}`}
                            >
                              {pm25.grade}
                            </span>
                            <span className="font-semibold">
                              {station.pm25Value}µg/m³
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;
