export const DISABLED_COLUMNS = ["rating", "image", "description"];

export const limitNames = (name) => {
    if (typeof name !== "string") {
      return name;
    }
    return name.length < 20 ? name : name.substring(0, 40) + "...";
  };