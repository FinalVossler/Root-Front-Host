import moment from "moment";

const getRelativeDate = (time: moment.Moment) => {
  const today = moment();

  const diff = today.diff(time);

  const duration = moment.duration(diff);
  if (duration.years() > 0) {
    return duration.years() + "y";
  } else if (duration.days() > 0) {
    return duration.days() + "d";
  } else if (duration.hours() > 0) {
    return duration.hours() + "h";
  } else if (duration.minutes() > 0) {
    return duration.minutes() + "m";
  } else if (duration.minutes() < 1) {
    return "1s";
  }
};

export default getRelativeDate;
