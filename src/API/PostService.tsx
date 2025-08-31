import ky from 'ky';
import type {Post} from '@/types/Post'


export default class PostService {
   static async getAll() {
        const data = await ky.get<Post[]>('https://jsonplaceholder.typicode.com/posts').json();
        return data
    }
}