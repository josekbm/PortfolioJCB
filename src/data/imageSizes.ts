/**
 * Intrinsic dimensions of the local images. They are used by <img width>
 * and <img height> so the browser reserves the right space before the image
 * loads (CLS protection), even when CSS later crops or scales the image.
 */
export const portraitSize = { width: 640, height: 640 } as const;

export const projectImageSizes: Record<
  string,
  { width: number; height: number }
> = {
  'jm-sanchez': { width: 1200, height: 810 },
  'gamers-nest': { width: 1200, height: 675 },
  'mirandas-dashboard': { width: 1200, height: 675 },
  'oxygenshop': { width: 1200, height: 675 },
  'photo-dash': { width: 1200, height: 675 },
  'hotel-miranda': { width: 1200, height: 675 },
};
