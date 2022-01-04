export class DateTime {
  constructor(_dateString) {
    this.date = new Date(_dateString);
  }
  getTime = () => {
    return this.date.getTime();
  };
  getDate = () => {
    return this.date.getDate() < 10
      ? `0${this.date.getDate()}`
      : this.date.getDate();
  };
  getMonth = () => {
    return this.date.getMonth() + 1 < 10
      ? `0${this.date.getMonth() + 1}`
      : this.date.getMonth() + 1;
  };
  getShortYear = () => {
    return this.date.getFullYear();
  };
  getDay = (location) => {
    let days = [
      {
        location: "vn",
        lstDays: [
          "Chủ nhật",
          "Thứ hai",
          "Thứ ba",
          "Thứ tư",
          "Thứ năm",
          "Thứ sáu",
          "Thứ 7",
        ],
      },
    ];
    if (location) {
      let daysWithLocation = days.find((o) => o.location === location);
      if (daysWithLocation) {
        return daysWithLocation.lstDays[this.date.getDay()];
      }
      return undefined;
    }
    return undefined;
  };
  format = (type) => {
    switch (type) {
      case "DD/MM/yyyy": {
        let date =
          this.date.getDate() < 10
            ? `0${this.date.getDate()}`
            : this.date.getDate();
        let month = this.date.getMonth() + 1;
        let year = this.date.getFullYear();
        return [date, month, year].join("/");
      }
      case "HH:mm": {
        let newDate = new Date(this.date);
        let hours = newDate.getUTCHours();
        let minutes = newDate.getMinutes();
        return `${hours < 10 ? `0${hours}` : hours}:${
          minutes < 10 ? `0${minutes}` : minutes
        }`;
      }
      default:
        return this.date;
    }
  };
  newDate = (numDates) => {
    let newDateString = new Date(
      this.date.getTime() + numDates * 24 * 3600 * 1000
    );
    return new DateTime(newDateString);
  };
  isSame = (dateString, formatType) => {
    let currentDate = new Date(this.date);
    let otherDate = new Date(dateString);
    const isSameDate = currentDate.getDate() === otherDate.getDate();
    const isSameMonth = currentDate.getMonth() === otherDate.getMonth();
    const isSameYear = currentDate.getFullYear() === otherDate.getFullYear();
    switch (formatType) {
      case "DD/MM/yyyy": {
        return isSameDate && isSameMonth && isSameYear;
      }
      default:
        return false;
    }
  };
  isAfter = (dateString, formatType) => {
    let currentDate = new Date(this.date);
    let otherDate = new Date(dateString);
    const isAfterHH = currentDate.getHours() > otherDate.getHours();
    const isAfterMM = currentDate.getMinutes() > otherDate.getMinutes();
    switch (formatType) {
      case "HH:mm": {
        return isAfterHH && isAfterMM;
      }
      default:
        return false;
    }
  };
}
