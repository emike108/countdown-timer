const AdditonalTimeInfo = ({ deploymentTime }) => {
  const getTimeZoneInfo = (time, timeZone) => {
    if (time) {
      return new Date(time).toLocaleString("en-US", { timeZone: timeZone });
    }
    return new Date().toLocaleString("en-US", { timeZone: timeZone });
  };

  return (
    <div className="additional-times">
      <div className="cities">
        <span>London:</span>
        <span>New York:</span>
        <span>Salt Lake City:</span>
      </div>
      <div className="city-times">
        <span>{getTimeZoneInfo(deploymentTime, "Europe/London")}</span>
        <span>{getTimeZoneInfo(deploymentTime, "America/New_York")}</span>
        <span>{getTimeZoneInfo(deploymentTime, "America/Denver")}</span>
      </div>
    </div>
  );
};

export default AdditonalTimeInfo;
