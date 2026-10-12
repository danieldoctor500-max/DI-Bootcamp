const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

export async function searchImages(term, continuation, signal) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: `filetype:bitmap ${term}`,
    gsrnamespace: "6",
    gsrwhat: "text",
    gsrlimit: "30",
    prop: "imageinfo",
    iiprop: "url",
    iiurlwidth: "640",
    format: "json",
    formatversion: "2",
    origin: "*",
  });

  if (continuation) {
    Object.entries(continuation).forEach(([key, value]) => {
      params.set(key, value);
    });
  }

  const response = await fetch(`${COMMONS_API}?${params}`, { signal });
  if (!response.ok) {
    throw new Error("The image service is unavailable. Please try again.");
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.info || "The image search could not be completed.");
  }

  const images = (data.query?.pages || [])
    .map((page) => {
      const image = page.imageinfo?.[0];
      if (!image?.thumburl) {
        return null;
      }

      return {
        id: page.pageid,
        title: page.title.replace(/^File:/, "").replace(/\.[^.]+$/, ""),
        thumbnail: image.thumburl,
        pageUrl: image.descriptionurl,
      };
    })
    .filter(Boolean);

  return {
    images,
    continuation: data.continue || null,
  };
}
