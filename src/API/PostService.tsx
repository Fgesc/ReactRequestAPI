import ky from 'ky';

type Post = {
    id: number;
    title: string;
    body: string;
};

export default class PostService {
   static async getAll() {
        const data = await ky.get<Post[]>('https://jsonplaceholder.typicode.com/posts').json();
        return data
    }
}