// Simulate a database of feed items
const DATA_SOURCE = Array.from({ length: 100 }).map((_, i) => ({
  id: `item-${i}`,
  title: `Feed Item ${i + 1}`,
  description: `This is the description for item number ${i + 1}. It contains some text to simulate content in a feed.`,
  image: `https://picsum.photos/id/${(i % 50) + 1}/400/300`, // Random generic images
  blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4", // Generic blurhash for example
}));

export const fetchFeed = async (cursor = 0, limit = 10) => {
  // Simulate network delay (random between 1s and 3s to be realistic)
  const delay = Math.floor(Math.random() * 2000) + 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const start = Number(cursor);
  const end = start + limit;
  const data = DATA_SOURCE.slice(start, end);

  const nextCursor = end < DATA_SOURCE.length ? end : null;

  return {
    data,
    nextCursor,
  };
};
