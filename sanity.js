import { createClient } from "@sanity/client";
import  ImageUrlBuilder  from "@sanity/image-url";

export const client = createClient({
  projectId: "ylairrwa",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};
// Run this to add exception for localhost 3000 CDRS policy
// sanity cors add http://localhost:3000
