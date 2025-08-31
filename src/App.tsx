import { useState, useEffect } from 'react'
import { PostList } from './components/PostList'
import { useFetching } from './hooks/useFetching'
import type {Post} from '@/types/Post'
import PostService from './API/PostService'
import './App.css'

function App() {

    const [posts, setPosts] = useState<Post[]>([]);

    const [fetchPosts, postError] = useFetching( async () => {
        const answerPosts = await PostService.getAll();
        setPosts(answerPosts);
    })
    
    
    useEffect (() => {
        fetchPosts();

        let interval = setInterval(() =>  {
        fetchPosts(); 
        console.log('вызвалась с интервалом 5 секунд')
        }, 5000);

        return () => {
        clearInterval(interval);
        }
    }, [])

    return (
        <div>
            {postError 
            ? <h1>Произошла ошибка {postError}</h1> 
            : <PostList posts={posts} title={'Список постов'}/> 
            }
        </div>
    )
}

export default App
