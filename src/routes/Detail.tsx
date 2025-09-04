import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMonthlyDustData } from "../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface IMonthlyData {
  pm10Value: string;
  pm25Value: string;
  o3Value: string; // 오존
  no2Value: string; // 이산화질소
  coValue: string; // 일산화탄소
  so2Value: string; // 아황산가스
  dataTime: string;
}

function Detail() {
  const { stationName } = useParams<{ stationName: string }>();
  const decodedStationName = stationName ? decodeURIComponent(stationName) : "";

  const { isLoading, data } = useQuery<{
    response: { body: { items: IMonthlyData[] } };
  }>({
    queryKey: ["monthlyDust", decodedStationName],
    queryFn: () => fetchMonthlyDustData(decodedStationName),
    enabled: !!decodedStationName,
  });

  // 차트 데이터를 가공하고 시간 순으로 정렬합니다.
  const chartData = data?.response?.body?.items
    ?.map((item) => ({
      ...item,
      // API가 주는 값 중 '-'를 0으로 처리 (차트 오류 방지)
      pm10: parseInt(item.pm10Value) || 0,
      pm25: parseInt(item.pm25Value) || 0,
      // dataTime을 "MM-DD HH:00" 형식으로 예쁘게 포맷
      time: item.dataTime.substring(5, 13) + ":00",
    }))
    .reverse();

  const latestData = chartData?.[chartData.length - 1];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link to="/" className="text-primary hover:underline mb-4 inline-block">
        &larr; 목록으로 돌아가기
      </Link>
      <h1 className="text-4xl font-bold mb-2">{decodedStationName}</h1>
      <p className="text-secondary mb-8">측정 시간: {latestData?.dataTime}</p>

      {isLoading ? (
        "로딩 중..."
      ) : (
        <>
          {/* 추가 상세 정보 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
            <div className="p-4 bg-secondary bg-opacity-10 rounded-lg">
              <h3 className="text-sm text-secondary">이산화질소(NO₂)</h3>
              <p className="text-2xl font-bold">{latestData?.no2Value} ppm</p>
            </div>
            <div className="p-4 bg-secondary bg-opacity-10 rounded-lg">
              <h3 className="text-sm text-secondary">오존(O₃)</h3>
              <p className="text-2xl font-bold">{latestData?.o3Value} ppm</p>
            </div>
            <div className="p-4 bg-secondary bg-opacity-10 rounded-lg">
              <h3 className="text-sm text-secondary">일산화탄소(CO)</h3>
              <p className="text-2xl font-bold">{latestData?.coValue} ppm</p>
            </div>
            <div className="p-4 bg-secondary bg-opacity-10 rounded-lg">
              <h3 className="text-sm text-secondary">아황산가스(SO₂)</h3>
              <p className="text-2xl font-bold">{latestData?.so2Value} ppm</p>
            </div>
          </div>

          {/* Recharts 그래프 */}
          <h2 className="text-2xl font-semibold mb-4">시간별 미세먼지 추이</h2>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="time" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pm10"
                  name="미세먼지"
                  stroke="#8884d8"
                />
                <Line
                  type="monotone"
                  dataKey="pm25"
                  name="초미세먼지"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default Detail;
