import routes from "src/routes";

export const getShowUrl = slug => routes.show.replace(":slug", slug);
export const getEditUrl = slug => routes.edit.replace(":slug", slug);
export const getDownloadUrl = slug => routes.download.replace(":slug", slug);
