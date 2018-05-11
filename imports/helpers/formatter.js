// define module
const formatter = {
  th: data => {
    // console.log(data, typeof data);
    if (typeof data === "object") {
      return formatter.date(data);
      // const unixDate = Date.parse(data);
      // const date = new Date(unixDate);
      // return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate(0)}`;
    }
    if (typeof data !== "string") {
      return "N/A";
    }
    switch (data) {
      case "_id":
        return "ID";
      case "createdAt":
        return "Created";
      case "updatedAt":
        return "Updated";
      case "name":
        return `${data.substr(0, 1).toUpperCase()}${data
          .substr(1)
          .toLowerCase()}`;
      default:
        return data;
    }
  },
  td: data => {
    if (typeof data[1] === "object") {
      const unixDate = Date.parse(data[1]);
      const date = new Date(unixDate);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate(0)}`;
    }
    if (typeof data[1] !== "string") {
      return "N/A";
    }
    return data[1];
  },
  date: input => {
    const unixDate = Date.parse(input);
    const date = new Date(unixDate);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate(0)}`;
  },
  hoursSince: input => {
    const unixDate = Date.parse(input);
    const date = new Date(unixDate);
    const since = Math.round((Date.now() - date) / 1000 / 60);
    const hours = Math.round(since / 60);
    const mins = Math.round(since % 60);
    if (since < 60) {
      return `${since} minutes ago`;
    } else if (hours < 1) {
      return `${mins} minutes ago`;
    } else {
      return `${hours} hours and ${mins} minutes ago`;
    }
  }
};

// export module
export default formatter;