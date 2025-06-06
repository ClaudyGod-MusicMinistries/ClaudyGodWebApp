// // api.js
// const API_URL = 'http://localhost:5000/api'; // Update with your backend URL

// export const fetchVideos = async (category = 'All', page = 1, limit = 6) => {
//   const response = await fetch(
//     `${API_URL}/videos?category=${category}&page=${page}&limit=${limit}`
//   );
//   return response.json();
// };

// export const fetchFeaturedVideos = async () => {
//   const response = await fetch(`${API_URL}/videos/featured`);
//   return response.json();
// };