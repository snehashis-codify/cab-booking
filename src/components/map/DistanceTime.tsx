function DistanceTime({
  distance,
  duration,
}: {
  distance: number;
  duration: number;
}) {
  return (
    <div className="bg-yellow-500 p-3">
      <h2 className="text-yellow-100 opacity-80 text-[15px]">
        Distance:
        <span className="font-bold mr-3 text-black">
          {distance.toFixed(2)} Kms
        </span>
        Duration:{" "}
        <span className="font-bold mr-3 text-black">
          {duration.toFixed(2)} Min
        </span>
      </h2>
    </div>
  );
}

export default DistanceTime;
