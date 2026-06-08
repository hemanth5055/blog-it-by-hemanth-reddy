import { createRequire } from "module";
import path from "path";

import { absolutePath } from "./constants.js";

const require = createRequire(import.meta.url);

const alias = {
  images: path.resolve(process.cwd(), "app/assets/images"),
  crypto: require.resolve("crypto-browserify"),
  path: require.resolve("path-browserify"),
  buffer: require.resolve("buffer"),
  stream: require.resolve("stream-browserify"),
  apis: absolutePath("src/apis"),
  common: absolutePath("src/common"),
  src: absolutePath("src"),
  components: absolutePath("src/components"),
  commons: absolutePath("src/components/commons"),
  assets: absolutePath("../assets"),
  constants: absolutePath("src/constants"),
  utils: absolutePath("src/utils"),
  hooks: absolutePath("src/hooks"),
  stores: absolutePath("src/stores"),
  neetocist: "@bigbinary/neeto-cist",
  neetoformik: "@bigbinary/neetoui/formik",
  neetoicons: "@bigbinary/neeto-icons",
  neetoui: "@bigbinary/neetoui",
};

export { alias };
