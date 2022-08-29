import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '28740696-1bed74622ca80cdeb72d05fb3',
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const searchPosts = async (q, page = 1) => {
  const { data } = await instance.get('', { params: { q, page } });
  return data;
};
